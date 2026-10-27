import { ImageResponse } from "next/og";

export const alt = "Insparc Technologies — Grow your business. Simplify your work.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#ece7dc", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", color: "#2b2721", backgroundImage: "radial-gradient(ellipse at top right, #c9beac, #ece7dc 65%)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 36 }}>Insparc Technologies</span><span style={{ fontSize: 16, color: "#795337", letterSpacing: "3px" }}>BUSINESS SERVICES / DIGITAL MARKETING</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 74, lineHeight: 1.1, letterSpacing: "-4px" }}><span>Grow your business.</span><span style={{ color: "#795337" }}>Simplify your work.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #c9beac", paddingTop: 24, color: "#5d564c", fontSize: 20 }}><span>Customer journeys. Everyday operations. Digital marketing.</span><span>insparc.in</span></div>
    </div>, { ...size },
  );
}
