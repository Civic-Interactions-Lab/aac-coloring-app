export interface SVGPaintAction {
    object?: string;
    color?: string;
}

export type SVGPaintActionArray = Array<SVGPaintAction>;

export function isFullyDefinedSVGAction(SVGPA: SVGPaintAction) {
    if (!SVGPA.color || !SVGPA.object) return false;
    return true;
}
