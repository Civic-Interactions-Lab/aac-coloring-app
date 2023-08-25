import React from "react";
import { useAudioTranscriptionContext } from "./audioTranscriptionContext";

export default function SVGActionPrinter() {
    const { SVGPaintActions, rawTranscriptions } = useAudioTranscriptionContext();

    return (
        <div>
            <h3 className="text-lg py-4">Relevent Utterances</h3>
            <pre>{JSON.stringify(SVGPaintActions, null, 2)}</pre>
            <h3 className="text-lg py-4">
                All Utterances <small>(with punctuation removed)</small>
            </h3>
            {rawTranscriptions.map((utterance, idx) => (
                <pre key={idx}>{utterance.join(" ")}</pre>
            ))}
        </div>
    );
}
