import VoiceRecordTrial from "@/components/voice-recording/VoiceRecordTrial";
import SVGActionPrinter from "@/contexts/audioTranscriptionContext/SVGActionPrinter";
import AudioTranscriptionTranslationProvider from "@/contexts/audioTranscriptionContext/audioTranscriptionContext";
import dynamic from "next/dynamic";
import React from "react";

const BackendHealthCheck = dynamic(() => import("@/components/health/BackendHealthCheck"), {
    ssr: false,
});

const VADWhisperCommunicator = dynamic(() => import("@/components/VAD/VADWhisperCommunicator"), {
    ssr: false,
});

export default function HealthCheck() {
    return (
        <div className="w-[1400px] mx-auto pt-6 font-inter">
            <h1 className="text-2xl py-4">Health Checks</h1>
            <h2 className="text-xl py-4">Service Checks</h2>
            <BackendHealthCheck />
            <h2 className="text-xl py-4">Functional Checks</h2>
            <VoiceRecordTrial />
            <h2 className="text-xl py-4">Vad Checks</h2>
            <AudioTranscriptionTranslationProvider>
                <h3 className="text-lg py-4">Relevent Utterances</h3>
                <SVGActionPrinter />
            </AudioTranscriptionTranslationProvider>
        </div>
    );
}
