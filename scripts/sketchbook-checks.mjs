export async function runSketchbookChecks({ cdp, evaluate, navigate, viewport, screenshot, pause, check, passed, report, base }) {
  await cdp("Runtime.enable"); await cdp("Page.enable");
  await viewport(1440, 1000); await navigate("/");
  check(await evaluate("document.title.includes('Insparc Technologies') && document.querySelector('h1').textContent.includes('Grow your business')"), "New brand/hero missing.");
  check(await evaluate("getComputedStyle(document.body).backgroundColor === 'rgb(236, 231, 220)' && getComputedStyle(document.body).fontFamily.includes('Newsreader') && document.fonts.check('20px Newsreader') && document.fonts.check('40px \"Instrument Serif\"')"), "Paper theme or local fonts missing.");
  check(await evaluate("parseFloat(getComputedStyle(document.querySelector('.hero-note')).fontSize) >= 20"), "Hero copy is too small.");
  passed("Insparc Technologies branding, paper palette and self-hosted readable fonts");
  for (let attempt = 0; attempt < 120; attempt++) {
    if (await evaluate("document.querySelector('iframe[data-insparc-ready=true]')?.contentDocument?.body?.dataset.ready === '1'")) break;
    await pause(100);
  }
  check(await evaluate("document.querySelector('iframe[data-insparc-ready=true]')?.contentDocument?.body?.dataset.ready === '1'"), "Exact-source sketchbook failed to initialize.");
  check(await evaluate("Array.from(document.querySelector('iframe').contentDocument.querySelectorAll('#sbBook img')).every(node => node.complete && node.naturalWidth > 0)"), "Sketchbook artwork did not load.");
  for (const slug of ["whatsapp-ai-chatbot", "automated-email-sender", "lead-capture-ai-followup", "knowledge-support", "custom-ai-agents", "document-ai", "crm-enrichment", "cart-recovery", "research-workflow"]) {
    check((await fetch(`${base}/landing-pages/insparc-plates/${slug}.png`)).status === 200, `Missing sketchbook plate ${slug}`);
  }
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate("!document.querySelector('iframe').contentDocument.querySelector('#sbWrap').classList.contains('intro')")) break;
    await pause(100);
  }
  await screenshot("sketchbook-home-desktop");
  await evaluate("document.querySelector('.workflow-sketchbook').scrollIntoView({block:'center',behavior:'instant'})"); await pause(300);
  const beforeCaption = await evaluate("document.querySelector('iframe').contentDocument.querySelector('.sb-caption').textContent");
  await evaluate("document.querySelector('iframe').contentDocument.querySelector('#sbRight').click()");
  for (let attempt = 0; attempt < 70; attempt++) {
    if (await evaluate("!document.querySelector('iframe').contentDocument.querySelector('.curl')")) break;
    await pause(100);
  }
  const nextCaption = await evaluate("document.querySelector('iframe').contentDocument.querySelector('.sb-caption').textContent");
  check(nextCaption !== beforeCaption, "Page-turn control did not change the illustrated plate.");
  await evaluate("document.querySelector('iframe').contentDocument.querySelector('#zIn').click()");
  check(await evaluate("document.querySelector('iframe').contentDocument.querySelector('#zRead').textContent !== '100%'"), "Sketchbook zoom failed.");
  await evaluate("document.querySelector('iframe').contentDocument.querySelector('#loupeBtn').click()");
  check(await evaluate("document.querySelector('iframe').contentDocument.querySelector('#loupeBtn').getAttribute('aria-pressed') === 'false'"), "Magnifier toggle failed.");
  await evaluate("document.querySelector('iframe').contentDocument.querySelector('#loupeBtn').click()"); await pause(300);
  const loupe = await evaluate("(() => { const frame=document.querySelector('iframe'), ring=frame.contentDocument.querySelector('.loupe .ring'), r=ring.getBoundingClientRect(), f=frame.getBoundingClientRect(); return { x:f.left+r.left+r.width/2, y:f.top+r.top+r.height/2, before:frame.contentDocument.querySelector('.loupe').style.transform }; })()");
  await cdp("Input.dispatchMouseEvent", { type: "mousePressed", x: loupe.x, y: loupe.y, button: "left", clickCount: 1 });
  await cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x: loupe.x - 55, y: loupe.y - 30, button: "left", buttons: 1 });
  await cdp("Input.dispatchMouseEvent", { type: "mouseReleased", x: loupe.x - 55, y: loupe.y - 30, button: "left", clickCount: 1 });
  check(await evaluate(`document.querySelector('iframe').contentDocument.querySelector('.loupe').style.transform !== ${JSON.stringify(loupe.before)}`), "Magnifying glass drag failed.");
  await screenshot("sketchbook-page-turn");
  report.sketchbook = { beforeCaption, nextCaption, magnifierDrag: true };
  passed("Exact-source sketchbook initializes; authored page curl, zoom, magnifier toggle and drag work");
  await evaluate("document.querySelector('.playback-toolbar').parentElement.scrollIntoView({block:'center',behavior:'instant'})"); await pause(600);
  await evaluate("document.querySelector('button[aria-label=\"Replay simulation\"]').click()"); await pause(100);
  check(await evaluate("!!document.querySelector('button[aria-label=\"Pause simulation\"]')"), "Workflow replay failed.");
  await evaluate("document.querySelector('button[aria-label=\"Pause simulation\"]').click()");
  await evaluate("document.querySelector('button[aria-label^=\"Toggle playback speed\"]').click()");
  check(await evaluate("document.querySelector('button[aria-label^=\"Toggle playback speed\"]').textContent.includes('2')"), "Workflow speed failed.");
  await pause(700); await screenshot("paper-workflow-theater");
  passed("Screenshot's Workflow Theater retained and rethemed; replay, pause and speed work");
  await navigate("/projects");
  const images = await evaluate("Array.from(document.querySelectorAll('.project-catalog img')).map(node => ({src:node.getAttribute('src'),loaded:node.complete && node.naturalWidth>0,alt:node.alt}))");
  check(images.length === 4 && images.every((item) => item.loaded && item.src.includes('workflow.svg') && item.alt.includes('customer journey')), "A named project is missing its relevant illustration.");
  await screenshot("projects-paper-desktop"); passed("All four named projects have loaded, descriptive workflow illustrations");
  await navigate("/audit");
  await evaluate("document.querySelector('input[value=\"support\"]').click()");
  await evaluate("(() => { const node=document.querySelector('#audit-task'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(node,'We repeatedly answer the same customer support questions.'); node.dispatchEvent(new Event('input',{bubbles:true})); })()");
  await evaluate("document.querySelector('form').requestSubmit()"); await pause(200);
  check(await evaluate("document.querySelector('main').textContent.includes('A possible first workflow') && document.querySelector('main').textContent.includes('information your team can share')"), "Audit brief does not reflect the selected task.");
  check(await evaluate("!!document.querySelector('a[href^=\"https://wa.me/\"]') && document.activeElement.tagName === 'H2'"), "Audit brief sharing/focus missing.");
  await screenshot("audit-brief-desktop"); passed("Dedicated audit form prepares the selected brief, moves focus and offers explicit sharing");
  const pricing = await fetch(`${base}/pricing`, { redirect: "manual" });
  check(pricing.status === 308 && pricing.headers.get("location")?.endsWith("/audit"), "Old pricing URL does not redirect to audit.");
  passed("Pricing route permanently redirects to audit");
  for (const width of [360, 390, 768, 1024, 1440]) {
    await viewport(width, 900); await navigate("/");
    check(await evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), `Homepage overflow at ${width}px.`);
    if (width === 390) await screenshot("sketchbook-home-mobile");
  }
  passed("Paper homepage fits 360, 390, 768, 1024 and 1440px");
  await viewport(390, 844); await navigate("/");
  await evaluate("document.querySelector('button[aria-label=\"Open navigation\"]').click()"); await pause(100);
  check(await evaluate("document.querySelector('main').inert && document.querySelector('#mobile-navigation').textContent.includes('Audit')"), "Mobile menu/background lock/audit link missing.");
  await cdp("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  check(await evaluate("!document.querySelector('#mobile-navigation') && !document.querySelector('main').inert"), "Menu Escape failed.");
  passed("Mobile menu, audit navigation, background lock and Escape work");
  for (const width of [390, 1280]) {
    await viewport(width, 900);
    for (const route of ["/audit", "/digital-marketing", "/projects", "/projects/whatsapp-ai-chatbot", "/services", "/services/conversion-rate-optimization", "/products", "/products/whatsapp-ai-lead-qualifier", "/products/crm-enrichment-followup-system", "/products/rag-support-knowledge-agent", "/products/ecommerce-abandoned-cart-whatsapp", "/contact", "/demo", "/roi-calculator", "/about", "/blog", "/resources", "/privacy-policy"]) {
      await navigate(route);
      check(await evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), `${route} overflows at ${width}px.`);
      check(await evaluate("document.querySelectorAll('main h1').length === 1"), `${route} needs one h1.`);
      check(await evaluate("!/[\\u20b9$\\u00a3\\u20ac]\\s*\\d/.test(document.querySelector('main').innerText)"), `Visible currency amounts remain on ${route}`);
      check(await evaluate("!document.body.innerText.includes('Insparc Technology')"), `Old company name remains on ${route}`);
    }
  }
  passed("Key pages: mobile/desktop layouts, semantic headings, full brand name and no visible currency prices");
  await viewport(1440, 1000); await navigate("/digital-marketing");
  check(await evaluate("!!document.querySelector('nav a[href=\"/digital-marketing\"]') && document.querySelector('nav a[href=\"/digital-marketing\"]').getAttribute('aria-current')==='page'"), "Dedicated marketing navigation missing.");
  check(await evaluate("document.querySelectorAll('.marketing-deliverables > div').length === 8 && document.querySelectorAll('.marketing-workflow li').length === 6 && document.querySelectorAll('.marketing-roadmap article').length === 3"), "Marketing proposal scope, process or roadmap missing.");
  check(await evaluate("document.querySelector('main').innerText.includes('Advertising spend is separate') && document.querySelector('main').innerText.includes('accounts stay yours')"), "Marketing responsibilities or separate costs missing.");
  await screenshot("digital-marketing-desktop");
  await evaluate("document.querySelector('footer').scrollIntoView({block:'start',behavior:'instant'})"); await pause(2200);
  check(await evaluate("document.querySelector('.footer-ink').classList.contains('is-visible') && getComputedStyle(document.querySelector('.ink-trail')).strokeDashoffset === '0px'"), "Footer drawing animation failed.");
  await screenshot("footer-ink-desktop");
  await viewport(390, 844); await navigate("/digital-marketing"); await screenshot("digital-marketing-mobile");
  passed("Digital Marketing navigation, eight monthly deliverables, six work steps, 90-day plan and footer drawing");
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  check(sitemap.includes("/audit") && !sitemap.includes("/pricing") && !sitemap.includes("your-project-5"), "Sitemap audit coverage failed.");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const forbidden = /\bn8n\b|OpenAI|Supabase|Resend|Pinecone|Qdrant|LangChain|Next\.js|webhook|\bAPI\b|\bRAG\b|\bLLM\b|HubSpot|Google Sheets|tech stack/i;
  for (const route of urls) {
    check((await fetch(`${base}${route}`)).status === 200, `Sitemap route failed: ${route}`);
    await navigate(route);
    const publicCopy = await evaluate("document.querySelector('main').innerText + ' ' + document.title + ' ' + (document.querySelector('meta[name=description]')?.content || '')");
    check(!forbidden.test(publicCopy), `Implementation details remain on ${route}: ${publicCopy.match(forbidden)?.[0]}`);
  }
  passed("All indexed pages describe services without implementation tools or technology names");
  passed(`All ${urls.length} sitemap URLs return 200; audit included and retired pricing excluded`);
  await cdp("Emulation.setEmulatedMedia", { features: [{name:"prefers-reduced-motion",value:"reduce"}] }); await navigate("/");
  check(await evaluate("Array.from(document.querySelectorAll('.reveal-ready')).every(node => getComputedStyle(node).opacity === '1')"), "Reduced motion hides content.");
  check(await evaluate("getComputedStyle(document.querySelector('.ink-trail')).animationName === 'none' && getComputedStyle(document.querySelector('.ink-trail')).strokeDashoffset === '0px'"), "Footer does not respect reduced motion.");
  await cdp("Emulation.setScriptExecutionDisabled", { value: true }); await navigate("/");
  check(await evaluate("document.querySelector('main').innerText.includes('Grow your business') && document.querySelectorAll('.project-catalog img').length === 4"), "Server content unavailable without JS.");
  passed("Readable server content survives reduced motion and JavaScript-disabled mode");
  check(report.browserErrors.length === 0, `Browser errors: ${report.browserErrors.join(" | ")}`);
  passed("No captured browser JavaScript errors in tested flows");
}
