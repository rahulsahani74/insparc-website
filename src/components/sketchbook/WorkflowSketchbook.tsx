"use client";

import { useCallback } from "react";
import { MengToSketchbookLandingPage } from "@designcodeio/threeui";

export function WorkflowSketchbook() {
  const adapt = useCallback((frame: HTMLIFrameElement) => {
    frame.title = "Insparc Technologies — interactive workflow sketchbook";
    const document = frame.contentDocument;
    if (!document) return;
    // The exact registered renderer loads its preserved canonical first. Its authored
    // applyScene hook then selects our content derivative, without rewriting the source.
    if (!frame.contentWindow?.location.pathname.endsWith("insparc-sketchbook.html")) {
      frame.style.opacity = "0";
      frame.src = "/landing-pages/insparc-sketchbook.html";
      return;
    }
    frame.style.opacity = "1";
    frame.dataset.insparcReady = "true";
    const readability = document.getElementById("insparc-readable-controls") ?? document.createElement("style");
    readability.id = "insparc-readable-controls";
    readability.textContent = ".sb-caption{font-size:18px;text-transform:none;letter-spacing:.02em}.sb-hint,.zoom-read{font-size:16px;color:#655d50;text-transform:none;letter-spacing:0}.tool{width:44px;height:44px}.tool svg{width:20px;height:20px}";
    document.head.appendChild(readability);
  }, []);
  return <div className="workflow-sketchbook shader-frame" data-lenis-prevent>
    <MengToSketchbookLandingPage headingFont="instrument-serif" bodyFont="newsreader" headingWeight="400" bodyWeight="400" primaryColor="#2b2721" headingSize={30} bodySize={20} headingLetterSpacing={0.010} applyScene={adapt} />
  </div>;
}
