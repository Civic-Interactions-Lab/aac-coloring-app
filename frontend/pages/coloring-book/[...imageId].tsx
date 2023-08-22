import { useRouter } from "next/router";

import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

import React from "react";
import SVGDisplay from "@/components/Coloring-Book/SVGDisplay";
import AudioTranscriptionTranslationProvider from "@/contexts/audioTranscriptionContext/audioTranscriptionContext";

export default function ColoringPane() {
    const { query } = useRouter();

    return (
        <div className="flex justify-between gap-4">
            <div className="prev-img h-full min-h-screen min-w-[128px] flex items-center justify-center bg-sky-400 hover:bg-sky-700 transition duration-300 ease-out hover:ease-in">
                <LiaAngleLeftSolid className="text-7xl text-white" />
            </div>

            <AudioTranscriptionTranslationProvider>
                <SVGDisplay imageId={query.imageId as string | undefined} />
            </AudioTranscriptionTranslationProvider>

            <div className="prev-img h-full min-h-screen min-w-[128px] flex items-center justify-center bg-sky-400 hover:bg-sky-700 transition duration-300 ease-out hover:ease-in">
                <LiaAngleRightSolid className="text-7xl text-white" />
            </div>
        </div>
    );
}
