import { runSketchbookChecks } from "./sketchbook-checks.mjs";
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
  await runSketchbookChecks({ cdp, evaluate, navigate, viewport, screenshot, pause, check, passed, report, base });
} finally {
  try { await closeBrowser?.(); } catch { /* Browser may already have exited. */ }
  socket?.close(); browser.kill();
  await mkdir("artifacts/frontend", { recursive: true });
  await writeFile("artifacts/frontend/report.json", JSON.stringify(report, null, 2));
}
