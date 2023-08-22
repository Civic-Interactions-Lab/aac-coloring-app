/* eslint-disable @next/next/no-img-element */
import { getS3ObjectByKey } from "@/util/s3Util";
import React from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { ReactSVG } from "react-svg";
import SmallLoadingSpinner from "../general/SmallLoadingSpinner";
import { useAudioTranscriptionContext } from "@/contexts/audioTranscriptionContext/audioTranscriptionContext";

export interface SVGDisplayProps {
    imageId: string | undefined;
}

export default function SVGDisplay(props: SVGDisplayProps) {
    const { SVGPaintActions } = useAudioTranscriptionContext();

    if (!props.imageId) return null;

    return (
        <div className="flex flex-col w-full justify-center items-center" id="SVG-top-level-container">
            <SvgLoader path={getS3ObjectByKey(props.imageId)} width="100%" height="100%">
                {SVGPaintActions.map((SVGPaintAction, idx) => (
                    <SvgProxy key={idx} selector={`#${SVGPaintAction.object}`} fill={SVGPaintAction.color} />
                ))}
            </SvgLoader>
        </div>
    );
}
