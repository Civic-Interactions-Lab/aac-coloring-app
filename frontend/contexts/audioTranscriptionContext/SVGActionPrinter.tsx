import React from "react";
import { useAudioTranscriptionContext } from "./audioTranscriptionContext";

export default function SVGActionPrinter() {
    const { SVGPaintActions } = useAudioTranscriptionContext();

    return (
        <div>
            <pre>{JSON.stringify(SVGPaintActions, null, 2)}</pre>
        </div>
    );
}
