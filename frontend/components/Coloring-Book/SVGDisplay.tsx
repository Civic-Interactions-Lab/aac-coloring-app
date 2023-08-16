import React from "react";

export interface SVGDisplayProps {
    imageId: string | string[] | undefined;
}

export default function SVGDisplay(props: SVGDisplayProps) {
    return <div>{props.imageId}</div>;
}
