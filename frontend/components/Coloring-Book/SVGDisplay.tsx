/* eslint-disable @next/next/no-img-element */
import { getS3ObjectByKey } from "@/util/s3Util";
import React from "react";
import { ReactSVG } from "react-svg";
import SmallLoadingSpinner from "../general/SmallLoadingSpinner";
import { useAudioTranscriptionContext } from "@/contexts/audioTranscriptionContext/audioTranscriptionContext";

export interface SVGDisplayProps {
    imageId: string | undefined;
}

export default function SVGDisplay(props: SVGDisplayProps) {
    const { SVGPaintActions } = useAudioTranscriptionContext();

    const css = SVGPaintActions.map((SVGPaintAction) => `#${SVGPaintAction.object}{fill: ${SVGPaintAction.color};}`).join("\n");
    console.log(css);

    if (!props.imageId) return null;

    return (
        <div className="flex flex-col w-full justify-center items-center" id="SVG-top-level-container">
            <style jsx>{css}</style>
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
