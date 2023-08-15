import dynamic from "next/dynamic";
import React from "react";

const BackendHealthCheck = dynamic(() => import("@/components/health/BackendHealthCheck"), {
    ssr: false,
});

export default function HealthCheck() {
    return (
        <div className="w-[1400px] mx-auto pt-6 font-inter">
            <h1 className="text-2xl py-4">Health Checks</h1>
            <BackendHealthCheck />
        </div>
    );
}
