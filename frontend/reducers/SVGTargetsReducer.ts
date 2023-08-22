import { SVGPaintAction } from "@/util/ColoringBookSVGObjects/SVGPaintAction";

export type SVGTargetsState = Array<SVGPaintAction>;

type AddAction = { type: "add"; payload: SVGPaintAction };
type ResetAction = { type: "reset" };
type SVGTargetsActions = AddAction | ResetAction;

export default function SVGTargetsReducer(state: SVGTargetsState, action: SVGTargetsActions) {
    switch (action.type) {
        case "add":
            return [...state, action.payload];
        case "reset":
            return [];
        default:
            return [...state];
    }
}
