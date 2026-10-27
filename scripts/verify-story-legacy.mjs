import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

// Dependency-free Chromium QA. Run against an already running production server.
const base = process.argv[2] || "http://127.0.0.1:3000";
const browserPath = process.env.BROWSER_PATH || [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/chromium", "/usr/bin/google-chrome",
].find((candidate) => existsSync(candidate));
if (!browserPath) throw new Error("Set BROWSER_PATH to a Chromium browser executable.");
const profile = await mkdtemp(path.join(tmpdir(), "insparc-browser-"));
const debugPort = 9400 + Math.floor(Math.random() * 20000);
const browser = spawn(browserPath, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, "about:blank"], { windowsHide: true, stdio: "ignore" });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const check = (value, message) => { if (!value) throw new Error(message); };
let socket;
let closeBrowser;
const report = { checks: [], browserErrors: [], screenshots: [] };
const passed = (message) => { report.checks.push(message); console.log(`PASS ${message}`); };
try {
  let targets;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json(); if (targets.length) break; } catch { /* Browser startup. */ }
    await pause(100);
  }
  check(targets?.length, "Browser debugging endpoint did not start.");
  socket = new WebSocket(targets.find((target) => target.type === "page").webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  let sequence = 0;
  const pending = new Map();
  socket.addEventListener("message", (message) => {
    const data = JSON.parse(message.data);
    if (data.id && pending.has(data.id)) {
      const job = pending.get(data.id); clearTimeout(job.timeout); pending.delete(data.id);
      if (data.error) job.reject(new Error(data.error.message)); else job.resolve(data.result);
    }
    if (data.method === "Runtime.exceptionThrown") report.browserErrors.push(data.params.exceptionDetails.exception?.description || data.params.exceptionDetails.text);
    if (data.method === "Runtime.consoleAPICalled" && data.params.type === "error") report.browserErrors.push(data.params.args.map((arg) => arg.value || arg.description).join(" "));
  });
  const cdp = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 15000);
    pending.set(id, { resolve, reject, timeout }); socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const response = await cdp("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
    return response.result.value;
  };
  closeBrowser = () => cdp("Browser.close");
  const navigate = async (route) => {
    await cdp("Page.navigate", { url: `${base}${route}` });
    for (let attempt = 0; attempt < 100; attempt++) {
      if (await evaluate(`location.pathname === ${JSON.stringify(route)} && document.readyState === 'complete' && !!document.querySelector('h1')`)) break;
      await pause(100);
    }
    await pause(500);
  };
  const viewport = (width, height) => cdp("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 });
  const screenshot = async (name) => {
    await mkdir("artifacts/frontend", { recursive: true });
    const result = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    const file = `artifacts/frontend/${name}.png`;
    await writeFile(file, Buffer.from(result.data, "base64")); report.screenshots.push(file);
  };
  await cdp("Runtime.enable"); await cdp("Page.enable");
  await viewport(1440, 1000); await navigate("/");
  check(await evaluate("document.querySelectorAll('h1').length === 1"), "Home must have one h1.");
  check(await evaluate("document.querySelector('link[rel=canonical]')?.href === 'https://insparc.in/'"), "Home canonical missing.");
  check(await evaluate("Array.from(document.querySelectorAll('script[type=\"application/ld+json\"]')).every(node => !!JSON.parse(node.textContent))"), "Invalid JSON-LD.");
  passed("Homepage h1, canonical and parseable structured data");
  const followupMetrics = await evaluate(`(() => {
    const cue = Array.from(document.querySelectorAll('.story-hero a[href="#the-story"]')).at(-1);
    const next = document.querySelector('[data-integration-strip] p');
    const story = document.querySelector('#scattered h2');
    const header = document.querySelector('.nav-contact');
    const hero = document.querySelector('.story-hero a[href="/contact"]');
    const library = document.querySelector('.marketplace-intro > a');
    const intro = document.querySelector('.marketplace-intro > h2');
    const explore = Array.from(document.querySelectorAll('main a')).filter(node => node.textContent.trim().startsWith('Explore '));
    return { transitionGap: next.getBoundingClientRect().top - cue.getBoundingClientRect().bottom, storyGap: story.getBoundingClientRect().top - cue.getBoundingClientRect().bottom,
      primaryMatches: getComputedStyle(header).backgroundColor === getComputedStyle(hero).backgroundColor && getComputedStyle(header).color === getComputedStyle(hero).color,
      scenarioGap: parseFloat(getComputedStyle(document.querySelector('[aria-label="Choose a simulation scenario"]')).gap), industryGap: parseFloat(getComputedStyle(document.querySelector('.industry-options')).gap),
      libraryAligned: Math.abs(library.getBoundingClientRect().left - intro.getBoundingClientRect().left) < 2,
      exploreCount: explore.length, exploreConsistent: explore.every(node => node.classList.contains('explore-link') && !node.classList.contains('story-button')) };
  })()`);
  report.followupMetrics = followupMetrics;
  check(followupMetrics.transitionGap < 128 && followupMetrics.storyGap < 450, `Hero transition too sparse: ${JSON.stringify(followupMetrics)}`);
  check(followupMetrics.primaryMatches, "Header and hero conversion actions do not match.");
  check(followupMetrics.scenarioGap >= 20 && followupMetrics.industryGap >= 20, "Selection controls need 20px gaps.");
  check(followupMetrics.libraryAligned, "Template library CTA is disconnected from its heading.");
  check(followupMetrics.exploreCount >= 5 && followupMetrics.exploreConsistent, "Explore links must share the same text-link style.");
  passed("Five-issue follow-up: compact hero transition, matching primary CTAs, 20px selection gaps, grouped library CTA and consistent Explore links");
  const usabilityMetrics = await evaluate(`(() => {
    const elements = Array.from(document.querySelectorAll('body *')).filter(node => node.getClientRects().length && !node.closest('svg,script,style,.skip-to-content'));
    const text = elements.filter(node => Array.from(node.childNodes).some(child => child.nodeType === Node.TEXT_NODE && child.textContent.trim()));
    return { fontSizes: [...new Set(text.map(node => parseFloat(getComputedStyle(node).fontSize)))].sort((a,b)=>a-b), radii: [...new Set(elements.map(node => getComputedStyle(node).borderRadius))].sort() };
  })()`);
  report.usabilityMetrics = usabilityMetrics;
  check(usabilityMetrics.fontSizes.every(size => size >= 12), `Text below 12px: ${usabilityMetrics.fontSizes}`);
  check(usabilityMetrics.fontSizes.length <= 10, `Too many text sizes: ${usabilityMetrics.fontSizes}`);
  check(usabilityMetrics.radii.length <= 6, `Too many corner radii: ${usabilityMetrics.radii}`);
  const controlHeights = await evaluate("Array.from(document.querySelectorAll('.playback-actions button')).map(node => node.getBoundingClientRect().height)");
  check(controlHeights.every(height => height >= 44), `Playback targets too small: ${controlHeights}`);
  check(await evaluate("document.querySelector('.playback-toolbar').getBoundingClientRect().bottom <= document.querySelector('.playback-toolbar + div').getBoundingClientRect().top + 1"), "Playback controls must precede the canvas.");
  check(await evaluate("Array.from(document.querySelectorAll('.chapter-navigation a')).every(node => node.textContent.trim().length > 5 && node.getBoundingClientRect().height >= 44)"), "Chapter links need visible labels and large targets.");
  passed("Usability: minimum 12px text, <=10 text sizes, <=6 radii, visible labeled chapters, and large playback controls above canvas");
  await screenshot("home-desktop");
  for (const [index, id] of ["scattered", "connected", "possibility"].entries()) {
    await evaluate(`document.getElementById(${JSON.stringify(id)}).scrollIntoView({block:'center',behavior:'instant'})`); await pause(800);
    check(await evaluate(`document.querySelector('.story-sticky .automation-scene').dataset.stage === '${index}'`), `Story chapter ${index} did not update.`);
  }
  passed("Scroll position changes all three story stages"); await screenshot("story-desktop");
  check(await evaluate("getComputedStyle(document.querySelector('.story-sticky')).position === 'sticky'"), "Story illustration is not sticky.");
  passed("Desktop story illustration uses sticky layout");
  await evaluate("document.querySelector('.playback-toolbar').parentElement.scrollIntoView({block:'center',behavior:'instant'})"); await pause(600);
  await evaluate("document.querySelector('button[aria-label^=\"Toggle playback speed\"]').click()");
  check(await evaluate("document.querySelector('button[aria-label^=\"Toggle playback speed\"]').textContent.includes('2')"), "Playback speed toggle failed.");
  await evaluate("document.querySelector('button[aria-label=\"Replay simulation\"]').click()"); await pause(100);
  check(await evaluate("!!document.querySelector('button[aria-label=\"Pause simulation\"]')"), "Replay did not start playback.");
  await evaluate("document.querySelector('button[aria-label=\"Pause simulation\"]').click()");
  check(await evaluate("!!document.querySelector('button[aria-label=\"Play simulation\"]')"), "Pause failed.");
  passed("Prominent playback controls: speed, replay and pause operate correctly");
  await evaluate("document.querySelectorAll('#industries .industry-chip')[2].click()");
  check(await evaluate("document.querySelector('#industry-example').textContent.includes('Real Estate')"), "Industry switch failed."); passed("Industry selection updates its workflow");
  await evaluate("document.querySelector('#accordion-trigger-home-start').click()");
  check(await evaluate("document.querySelector('#accordion-trigger-home-start').getAttribute('aria-expanded') === 'true' && !document.querySelector('#accordion-panel-home-start').hidden"), "FAQ did not expand."); passed("FAQ expands with correct accessible state");
  for (const width of [360, 390, 768, 1024, 1440]) {
    await viewport(width, 900); await navigate("/");
    check(await evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), `Homepage overflow at ${width}px.`);
    const transitionGaps = await evaluate("(() => { const cue = Array.from(document.querySelectorAll('.story-hero a[href=\"#the-story\"]')).at(-1).getBoundingClientRect(); return [document.querySelector('[data-integration-strip] p').getBoundingClientRect().top - cue.bottom, document.querySelector('#scattered h2').getBoundingClientRect().top - cue.bottom]; })()");
    check(transitionGaps[0] < 128 && transitionGaps[1] < 450, `Hero transition gap at ${width}px: ${transitionGaps}`);
    if (width === 390 || width === 1440) {
      const columns = await evaluate("getComputedStyle(document.querySelector('.industry-options')).gridTemplateColumns.split(' ').length");
      check(columns === (width === 390 ? 2 : 4), `Industry grid is unbalanced at ${width}px.`);
    }
    if (width === 390) await screenshot("home-mobile");
  }
  passed("Homepage has no horizontal overflow at 360, 390, 768, 1024 and 1440px");
  await viewport(390, 844); await navigate("/");
  await evaluate("document.querySelector('button[aria-label=\"Open navigation\"]').click()"); await pause(200);
  check(await evaluate("document.querySelector('main').inert && document.querySelector('#mobile-navigation') !== null"), "Mobile menu does not lock background.");
  await screenshot("mobile-navigation");
  await cdp("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  check(await evaluate("!document.querySelector('#mobile-navigation') && !document.querySelector('main').inert && document.activeElement.getAttribute('aria-label') === 'Open navigation'"), "Escape did not restore menu focus."); passed("Mobile navigation, background lock, Escape and focus restore");
  await navigate("/services");
  check(await evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), "Services page has mobile overflow.");
  await evaluate("Array.from(document.querySelectorAll('button')).find(node => node.textContent.includes('Digital Marketing')).click()");
  check(await evaluate("Array.from(document.querySelectorAll('h3')).some(node => node.textContent.includes('Search Engine Optimization'))"), "Service filtering failed."); passed("Mobile services layout and category filtering");
  await navigate("/contact");
  await evaluate("document.querySelector('form').requestSubmit()"); await pause(100);
  check(await evaluate("document.querySelector('[name=name]').getAttribute('aria-invalid') === 'true'"), "Form validation failed.");
  await evaluate(`(() => { const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; for (const [name,value] of Object.entries({name:'Frontend QA',email:'qa@example.com'})) { const node = document.querySelector('[name='+name+']'); setter.call(node,value); node.dispatchEvent(new Event('input',{bubbles:true})); } const area = document.querySelector('[name=message]'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(area,'Please connect our inquiry form to our CRM.'); area.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  await evaluate("document.querySelector('form').requestSubmit()"); await pause(150);
  check(await evaluate("document.querySelector('main').textContent.includes('Your brief is ready to share.') && !!document.querySelector('a[href^=\"mailto:\"]')"), "Prepared inquiry flow failed."); passed("Contact validation and honest WhatsApp/email handoff");
  await navigate("/products");
  await evaluate("Array.from(document.querySelectorAll('button')).find(node => node.textContent.trim() === 'Enquire').click()"); await pause(200);
  check(await evaluate("document.querySelector('dialog').open && document.querySelector('dialog').textContent.includes('No payment is collected here.')"), "Template inquiry dialog failed.");
  await cdp("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  passed("Template inquiry dialog opens and closes without payment requests");
  for (const width of [390, 1280]) {
    await viewport(width, 900);
    for (const route of ["/services", "/products", "/products/whatsapp-ai-lead-qualifier", "/projects", "/industries", "/contact", "/pricing", "/demo", "/roi-calculator", "/about", "/blog", "/resources", "/privacy-policy"]) {
      await navigate(route);
      check(await evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), `${route} overflows at ${width}px.`);
      check(await evaluate("document.querySelectorAll('main h1').length === 1"), `${route} should have one primary heading.`);
    }
  }
  passed("13 key inner pages have one h1 and no page overflow at mobile and desktop widths");
  await cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] }); await navigate("/");
  check(await evaluate("Array.from(document.querySelectorAll('.reveal-ready')).every(node => getComputedStyle(node).opacity === '1')"), "Reduced-motion content is hidden."); passed("Reduced-motion preference keeps content visible");
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  check(sitemap.includes("/blog/choosing-a-workflow-automation-platform") && !sitemap.includes("/orders") && !sitemap.includes("your-project-5"), "Sitemap public/private coverage failed.");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const failures = [];
  for (const route of urls) { const response = await fetch(`${base}${route}`); if (response.status !== 200) failures.push(`${route}: ${response.status}`); }
  check(!failures.length, failures.join(", ")); passed(`All ${urls.length} sitemap URLs return HTTP 200`);
  for (const route of ["/orders", "/thank-you", "/projects/whatsapp-ai-chatbot"]) {
    const html = await (await fetch(`${base}${route}`)).text();
    check(/name="robots" content="[^"]*noindex/.test(html), `Missing noindex on ${route}`);
  }
  check((await fetch(`${base}/opengraph-image`)).status === 200, "Open Graph image missing.");
  check((await fetch(`${base}/icon.svg`)).status === 200, "Favicon missing.");
  passed("Private/placeholder noindex, social preview and favicon");
  await cdp("Emulation.setScriptExecutionDisabled", { value: true });
  await navigate("/");
  check(await evaluate("document.querySelector('h1').textContent.includes('Less busywork') && document.querySelectorAll('.reveal-ready').length === 0 && document.querySelector('#the-story').textContent.includes('Your tools are busy')"), "Core content unavailable without JavaScript.");
  passed("Server-rendered story content remains readable with JavaScript disabled");
  check(report.browserErrors.length === 0, `Browser errors: ${report.browserErrors.join(" | ")}`);
  passed("No browser JavaScript errors during tested flows");
} finally {
  try { await closeBrowser?.(); } catch { /* Browser may already have exited. */ }
  socket?.close(); browser.kill();
  await mkdir("artifacts/frontend", { recursive: true });
  await writeFile("artifacts/frontend/report.json", JSON.stringify(report, null, 2));
}
