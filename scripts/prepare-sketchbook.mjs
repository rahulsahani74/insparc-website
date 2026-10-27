import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import ts from "typescript";
import sharp from "sharp";

const root = process.cwd();
const bundle = JSON.parse(fs.readFileSync(fs.existsSync("artifacts/threeui/source.json") ? "artifacts/threeui/source.json" : "vendor/threeui/source-bundle.json", "utf8"));
const hash = (value) => crypto.createHash("sha256").update(value).digest("hex");
const write = (file, contents) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, contents); };
const source = (name) => bundle.files.find((file) => file.path.endsWith(name));
for (const file of bundle.files.filter((file) => file.code)) {
  if (hash(file.code) !== file.sha256) throw new Error(`Source hash mismatch: ${file.path}`);
}
const original = fs.readFileSync(fs.existsSync("artifacts/threeui/recovered.html") ? "artifacts/threeui/recovered.html" : "public/landing-pages/meng-to-sketchbook.html", "utf8");
if (hash(original) !== source("meng-to-sketchbook.html").sha256) throw new Error("Canonical HTML hash mismatch");
write("vendor/threeui/source-bundle.json", JSON.stringify(bundle, null, 2));
write("public/landing-pages/meng-to-sketchbook.html", original);
for (const asset of bundle.assets) {
  const packageFile = path.join(root, "node_modules/@designcodeio/threeui/lib-dist/assets/landing-pages/meng-to-sketchbook", path.basename(asset.path));
  const bytes = fs.readFileSync(fs.existsSync(packageFile) ? packageFile : asset.path);
  if (hash(bytes) !== asset.sha256 || bytes.length !== asset.bytes) throw new Error(`Asset mismatch: ${asset.path}`);
  write(asset.path, bytes);
}
for (const name of ["LICENSE", "FONT-LICENSES.md", "ASSET-LICENSES.md"]) {
  const packageFile = `node_modules/@designcodeio/threeui/${name}`;
  write(`vendor/threeui/${name}`, fs.readFileSync(fs.existsSync(packageFile) ? packageFile : `vendor/threeui/${name}`));
}

// The registered revision is newer than npm 1.2.0. Transpile its exact implementation,
// retaining an auditable source bundle, rather than silently using the older renderer.
for (const name of ["LandingPageFrame", "pageTypography", "pageRecipes"]) {
  const file = source(name === "LandingPageFrame" ? `${name}.tsx` : `${name}.ts`);
  const output = ts.transpileModule(file.code, { fileName: file.path, compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext } }).outputText;
  write(`src/vendor/threeui/${name}.js`, output);
}
const component = source("LandingPages.tsx").code.match(/export function MengToSketchbookLandingPage[\s\S]*?\n\}/)[0];
const entry = `"use client";\nimport { splitTypographyProps, usePageTypography } from './pageTypography';\nimport { LandingPageFrame } from './LandingPageFrame';\nimport { MENG_TO_SKETCHBOOK_TYPOGRAPHY } from './pageRecipes';\n${component}`;
write("src/vendor/threeui/index.js", ts.transpileModule(entry, { fileName: "index.tsx", compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText);
write("src/vendor/threeui/style.css", source("threeui.css").code.replace('./fonts/fragment-mono.woff2', './fonts/fragment-mono.ttf').replace('url("./fonts/fragment-mono.ttf") format("woff2")', 'url("./fonts/fragment-mono.ttf") format("truetype")'));

const concepts = [
  ["whatsapp-ai-chatbot", "Customer Enquiries", "A conversation with a clear next step.", ["Message received", "Understand intent", "Reply or hand off", "Record the next step"], "01"],
  ["automated-email-sender", "Email Follow-up", "Thoughtful follow-ups, without the copying.", ["Inquiry arrives", "Prepare a reply", "Review and send", "Schedule follow-up"], "02"],
  ["lead-capture-ai-followup", "Lead Follow-up", "Keep the context. Keep the conversation going.", ["Collect inquiries", "Check duplicates", "Qualify the lead", "Assign a next step"], "03"],
  ["knowledge-support", "Knowledge Support", "Useful answers, grounded in your documents.", ["Ask a question", "Find source notes", "Draft an answer", "Show the sources"], "04"],
  ["custom-ai-agents", "Business Task Support", "A specific job. A sensible human checkpoint.", ["Receive the task", "Gather context", "Prepare the work", "Human approval"], "05"],
  ["document-ai", "Document Processing", "Keep important document details organised.", ["Document received", "Extract the details", "Review exceptions", "Update the record"], "06"],
  ["crm-enrichment", "Connected Customer Records", "One useful picture of every conversation.", ["New contact", "Check the details", "Complete the record", "Notify the team"], "07"],
  ["cart-recovery", "Cart Recovery", "A timely nudge, with the right context.", ["Cart left behind", "Check order status", "Prepare a reminder", "Record the response"], "08"],
  ["research-workflow", "Research Workflows", "A little less tab switching. A clearer brief.", ["Set the question", "Gather sources", "Compare findings", "Review the brief"], "09"],
];
const escape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
function diagram(item, book = false) {
  const [slug, title, subtitle, steps, number] = item;
  const nodes = steps.map((label, index) => {
    const x = 95 + (index % 2) * 490, y = 295 + Math.floor(index / 2) * 185;
    return `<g transform="translate(${x} ${y})"><path d="M2 3 Q175 -3 365 1 L368 113 Q180 119 0 114 Z" fill="${index === 1 ? "#e3e9df" : "#faf7ef"}" stroke="#887e6b" stroke-width="1.7"/><circle cx="37" cy="36" r="17" fill="none" stroke="#806344"/><text x="37" y="43" text-anchor="middle" font-family="Georgia" font-size="22" fill="#715538">${index + 1}</text><text x="25" y="86" font-family="Georgia" font-size="32" fill="#2b2721">${escape(label)}</text></g>`;
  }).join("");
  const content = `<rect width="1200" height="760" fill="#eee8dc"/><path d="M30 80 Q600 60 1170 80 M30 692 Q620 707 1170 690" fill="none" stroke="#a39379" opacity=".4"/><text x="70" y="135" font-size="22" letter-spacing="3" font-family="Georgia" fill="#74644e">INSPARC / WORKFLOW STUDIES</text><text x="70" y="207" font-size="48" font-family="Georgia" fill="#2b2721">${escape(title)}</text><text x="70" y="252" font-size="27" font-style="italic" font-family="Georgia" fill="#655744">${escape(subtitle)}</text><path d="M465 350 H575 M830 412 V462 M575 535 H465" fill="none" stroke="#92704c" stroke-width="2" stroke-dasharray="6 7"/><path d="m563 343 12 7-12 7 M823 450 l7 12 7-12 M477 528 l-12 7 12 7" fill="none" stroke="#92704c" stroke-width="2"/>${nodes}<text x="70" y="650" font-family="Georgia" font-size="23" fill="#756956">Illustrative service journey · Agreed around your business.</text><text x="1125" y="650" text-anchor="end" font-family="Georgia" font-size="24" fill="#756956">${number}</text>`;
  if (!book) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" role="img" aria-label="${escape(title)} workflow illustration">${content}</svg>`;
  const titleWords=title.split(' '), titleLines=[];let line='';
  for(const word of titleWords){if((line+' '+word).trim().length>19&&line){titleLines.push(line);line=word}else line=(line+' '+word).trim()}if(line)titleLines.push(line);
  const heading=titleLines.map((line,i)=>'<text x="165" y="'+(465+i*70)+'" font-size="58">'+escape(line)+'</text>').join('');
  const journey=steps.map((label,i)=>'<g transform="translate(965 '+(445+i*110)+')"><rect width="620" height="88" rx="8" fill="'+(i===1?'#e3e9df':'#faf7ef')+'" stroke="#a39379"/><text x="24" y="55" font-size="30" fill="#795337">0'+(i+1)+'</text><text x="88" y="55" font-size="38">'+escape(label)+'</text></g>').join('');
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1760 1240"><defs><linearGradient id="fold"><stop stop-color="#cfc2aa" stop-opacity="0"/><stop offset=".5" stop-color="#8f7c5d" stop-opacity=".22"/><stop offset="1" stop-color="#cfc2aa" stop-opacity="0"/></linearGradient></defs><path d="M90 280 Q485 248 880 278 L880 975 Q485 945 90 970 Z" fill="#faf6ec" stroke="#b4a48a"/><path d="M880 278 Q1270 248 1670 280 L1670 970 Q1270 943 880 975 Z" fill="#f7f2e7" stroke="#b4a48a"/><rect x="850" y="280" width="60" height="690" fill="url(#fold)"/><g font-family="Georgia" fill="#3c352a"><text x="165" y="370" font-size="30" letter-spacing="2">CHAPTER '+number+'</text>'+heading+'<path d="M165 650 Q440 645 735 652" stroke="#8d795c" fill="none"/><text x="165" y="720" font-size="40">Understand the work.</text><text x="165" y="780" font-size="40">Agree the next step.</text><text x="165" y="840" font-size="40">Keep people involved.</text><text x="165" y="915" font-size="28" fill="#746751">Insparc Technologies</text><text x="965" y="380" font-size="40" font-style="italic">How the work moves forward</text>'+journey+'<text x="965" y="925" font-size="28" fill="#746751">An example, shaped around your business.</text></g></svg>';

}
for (const item of concepts) {
  write(`public/projects/${item[0]}/workflow.svg`, diagram(item));
  write(`public/landing-pages/insparc-plates/${item[0]}.svg`, diagram(item, true));
}
await Promise.all(concepts.map(([slug]) => sharp(`public/landing-pages/insparc-plates/${slug}.svg`).png().toFile(`public/landing-pages/insparc-plates/${slug}.png`)));

let derived = original.replace('<title>Meng To</title>', '<title>Insparc Technologies — Workflow field notes</title>').replace('content="designer, creator, AI educator — Singapore"', 'content="Illustrated automation field notes from Insparc Technologies"');
derived = derived.replace("const DIR='meng-to-sketchbook/';", "const DIR='/landing-pages/insparc-plates/';");
derived = derived.replace(/const PAGES=\[[\s\S]*?\];/, `const PAGES=${JSON.stringify(concepts.map(([slug, title]) => ({ file: `${slug}.png`, title, place: "Service study" })))};`);
derived = derived.replace('M=PAGES.length, LAND=6', 'M=PAGES.length, LAND=0');
derived = derived.replace(/<p class="bio">[\s\S]*?<\/p>/, '<p class="bio">Insparc Technologies helps your team organise everyday business work. These illustrated field notes show possible workflows, not client results.</p>');
derived = derived.replace(/Meng To/g, 'Insparc Technologies').replace(/hello@mengto.com/g, 'hello@insparc.in').replace(/Designer \/ Creator \/ AI Educator \/ Founder @ Singapore/g, 'Business services / Customer journeys / Insparc Technologies');
// Content-only adaptation: preserve the authored curl, magnifier, zoom and pointer engine.
derived = derived.replaceAll('b.h*0.855', 'b.h*0.70');
derived = derived.replace('</head>', `<meta name="robots" content="noindex,follow"><style>
.top,.hero-kicker,.botany,.about,.plates,.foot,.rule,.hero-down{display:none!important}html,body{background:#ece7dc;overflow:hidden}.wash{display:none}.hero{min-height:0;padding:0 0 20px}.sb-wrap{gap:12px}.sb-3d{max-width:1060px}.sb-caption{font-size:20px;text-transform:none;letter-spacing:.02em}.sb-hint{font-size:16px;text-transform:none;letter-spacing:0;color:#655d50}.tool{width:44px;height:44px}.tool svg{width:20px;height:20px}.zoom-read{font-size:16px;color:#655d50}.sb-arrow{min-width:44px;min-height:44px}.sb-tools{gap:10px}.sb-stage{margin-top:-150px;margin-bottom:-145px}button:focus-visible{outline:2px solid #715538;outline-offset:4px}@media(max-width:640px){.sb-stage{margin-top:-24px;margin-bottom:-26px}.sb-wrap{width:100%;margin:0}.sb-hint{font-size:16px}.sb-caption{font-size:18px}.sb-arrow{padding:12px 6px}}
</style></head>`);
write("public/landing-pages/insparc-sketchbook.html", derived);
write("vendor/threeui/verification.json", JSON.stringify({ revision: source("meng-to-sketchbook.html").sha256, files: bundle.files.map(({path,sha256})=>({path,sha256})), assets: bundle.assets, adaptation: "Separate insparc-sketchbook.html changes only content, presentation cropping and accessible control sizes; original canonical and binary assets retained byte-for-byte." }, null, 2));
console.log(`Verified ${bundle.files.length} source records and ${bundle.assets.length} binary assets; generated ${concepts.length} workflow plates.`);
