import SVGTargetsReducer from "@/reducers/SVGTargetsReducer";
import { isColorInList, isTargetInList } from "@/util/ColoringBookSVGObjects/ColoringBookSVGObjects.util";
import { SVGPaintAction, SVGPaintActionArray, isFullyDefinedSVGAction } from "@/util/ColoringBookSVGObjects/SVGPaintAction";
import dynamic from "next/dynamic";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

const VADWhisperCommunicator = dynamic(() => import("@/components/VAD/VADWhisperCommunicator"), {
    ssr: false,
});

type TranscriptionType = Array<string>;
type TranscriptionArray = Array<TranscriptionType>;

export interface AudioTranscriptionContext {
    rawTranscriptions: TranscriptionArray;
    processTranscription: (item: TranscriptionType) => void;
    SVGPaintActions: SVGPaintActionArray;
    resetState: () => void;
}

const transcriptionContext = createContext<AudioTranscriptionContext>({
    rawTranscriptions: [],
    processTranscription(item) {},
    SVGPaintActions: [],
    resetState() {},
});

export const useAudioTranscriptionContext = () => {
    return useContext(transcriptionContext);
};

export interface AudioTranscriptionProps {
    children?: React.ReactNode;
}

export default function AudioTranscriptionTranslationProvider(props: AudioTranscriptionProps) {
    const [rawTranscriptions, setRawTranscriptions] = useState<TranscriptionArray>([]);

    const [currentSVGPaintActions, setcurrentSVGPaintAction] = useState<SVGPaintAction>({});
    const [SVGPaintActions, dispatch] = useReducer(SVGTargetsReducer, []);

    const processTranscription = (item: TranscriptionType) => {
        let newSVGPaintAction: SVGPaintAction = { ...currentSVGPaintActions };

        item.forEach((token) => {
            if (isTargetInList(token)) newSVGPaintAction.object = token;
            else if (isColorInList(token)) newSVGPaintAction.color = token;

            // trigger partial update to ask (politely) state handlers to update SVGActions state (ASYNC)
            if (isFullyDefinedSVGAction(newSVGPaintAction)) {
                dispatch({
                    type: "add",
                    payload: newSVGPaintAction,
                });
                newSVGPaintAction = {};
            }
        });

        setRawTranscriptions([...rawTranscriptions, [...item]]);
        setcurrentSVGPaintAction(newSVGPaintAction);
    };

    const resetState = () => {
        setRawTranscriptions([]);
        setcurrentSVGPaintAction({});
        dispatch({
            type: "reset",
        });
    };

    const value = {
        rawTranscriptions,
        processTranscription,
        SVGPaintActions,
        resetState,
    };

    //logging
    useEffect(() => {
        console.log("Transcription History:", rawTranscriptions);
    }, [rawTranscriptions]);

    return (
        <transcriptionContext.Provider value={value}>
            <VADWhisperCommunicator />
            {props?.children}
        </transcriptionContext.Provider>
    );
}
