import VoiceRecordTrial from "@/components/voice-recording/VoiceRecordTrial";
import dynamic from "next/dynamic";
import React from "react";

const BackendHealthCheck = dynamic(() => import("@/components/health/BackendHealthCheck"), {
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
        </div>
    );
}
