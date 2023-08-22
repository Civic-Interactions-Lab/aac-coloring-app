import { useRouter } from "next/router";
import React from "react";
import SVGDisplay from "@/components/Coloring-Book/SVGDisplay";
import AudioTranscriptionTranslationProvider from "@/contexts/audioTranscriptionContext/audioTranscriptionContext";
import APICallerContextProvider from "@/contexts/APICallerContextProvider";
import { SlideShowButtonFactory } from "@/components/Coloring-Book/SlideShowButtons";

export default function ColoringPane() {
    const { query } = useRouter();

    return (
        <div className="flex justify-between gap-4">
            <APICallerContextProvider url="/api/s3/get-all-images">
                <AudioTranscriptionTranslationProvider>
                    <SlideShowButtonFactory direction="left" />
                    <SVGDisplay imageId={query.imageId as string | undefined} />
                    <SlideShowButtonFactory direction="right" />
                </AudioTranscriptionTranslationProvider>
            </APICallerContextProvider>
        </div>
    );
}
