import dynamic from "next/dynamic";

export const BackendHealthCheck = dynamic(() => import("@/components/health/BackendHealthCheck"), {
    ssr: false,
});

export const VADWhisperCommunicator = dynamic(() => import("@/components/VAD/VADWhisperCommunicator"), {
    ssr: false,
});
