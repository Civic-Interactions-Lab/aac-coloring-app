import { BackendHealthCheck } from "@/components/dyanmic-imports";
import SVGActionPrinter from "@/contexts/audioTranscriptionContext/SVGActionPrinter";
import AudioTranscriptionTranslationProvider from "@/contexts/audioTranscriptionContext/audioTranscriptionContext";
import React from "react";

export default function HealthCheck() {
    return (
        <div className="w-[1400px] mx-auto pt-6 font-inter">
            <h1 className="text-2xl py-4">Health Checks</h1>
            <h2 className="text-xl py-4">Service Checks</h2>
            <BackendHealthCheck />
            <h2 className="text-xl py-4">Vad Checks</h2>
            <AudioTranscriptionTranslationProvider>
                <SVGActionPrinter />
            </AudioTranscriptionTranslationProvider>
        </div>
    );
}
