import { colors, targets } from "./ColoringBookSVGObjects";

export const isTargetInList = (target: string) => {
    return targets.includes(target);
};

export const isColorInList = (color: string) => {
    return colors.includes(color);
};
