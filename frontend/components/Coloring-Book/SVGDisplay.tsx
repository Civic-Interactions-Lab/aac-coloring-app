/* eslint-disable @next/next/no-img-element */
import { getS3ObjectByKey } from "@/util/s3Util";
import React from "react";
import { ReactSVG } from "react-svg";
import SmallLoadingSpinner from "../general/SmallLoadingSpinner";

export interface SVGDisplayProps {
    imageId: string | undefined;
}

export default function SVGDisplay(props: SVGDisplayProps) {
    if (!props.imageId) return null;

    return (
        <div className="flex flex-col w-full justify-center items-center" id="SVG-top-level-container">
            <ReactSVG
                src={getS3ObjectByKey(props.imageId)}
                httpRequestWithCredentials={false}
                loading={SmallLoadingSpinner}
                className="max-h-screen w-full"
                beforeInjection={(svg) => {
                    svg.setAttribute("width", "");
                    svg.setAttribute("height", "");
                }}
            />
        </div>
    );
}
