import type { CSSProperties, ReactElement } from "react";

export interface SketchbookProps {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
  className?: string;
  style?: CSSProperties;
  srcDoc?: string;
  applyScene?: (frame: HTMLIFrameElement) => void;
}
export function MengToSketchbookLandingPage(props: SketchbookProps): ReactElement;
