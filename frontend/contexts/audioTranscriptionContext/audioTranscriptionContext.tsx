import { isColorInList, isTargetInList } from "@/util/ColoringBookSVGObjects/ColoringBookSVGObjects.util";
import { SVGPaintAction, SVGPaintActionArray, isFullyDefinedSVGAction } from "@/util/ColoringBookSVGObjects/SVGPaintAction";
import { createContext, useContext, useEffect, useState } from "react";

type TranscriptionType = Array<string>;
type TranscriptionArray = Array<TranscriptionType>;

export interface AudioTranscriptionContext {
    rawTranscriptions: TranscriptionArray;
    addTranscription: (item: TranscriptionType) => void;
    SVGPaintActions: SVGPaintActionArray;
}

const transcriptionContext = createContext<AudioTranscriptionContext>({
    rawTranscriptions: [],
    addTranscription(item) {},
    SVGPaintActions: [],
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
    const [SVGPaintActions, setSVGPaintAction] = useState<SVGPaintActionArray>([]);

    const addTranscription = (item: TranscriptionType) => {
        const newSVGPaintAction: SVGPaintAction = {};

        item.forEach((token) => {
            if (isTargetInList(token)) newSVGPaintAction.object = token;
            else if (isColorInList(token)) newSVGPaintAction.color = token;
        });

        setRawTranscriptions([...rawTranscriptions, [...item]]);
        setcurrentSVGPaintAction({ ...newSVGPaintAction });
    };

    useEffect(() => {
        if (isFullyDefinedSVGAction(currentSVGPaintActions)) {
            setSVGPaintAction([...SVGPaintActions, { ...currentSVGPaintActions }]);
            setcurrentSVGPaintAction({});
        }
    }, [SVGPaintActions, currentSVGPaintActions, setSVGPaintAction, setcurrentSVGPaintAction]);

    const value = {
        rawTranscriptions,
        addTranscription,
        SVGPaintActions,
    };

    //logging
    useEffect(() => {
        console.log(rawTranscriptions);
    }, [rawTranscriptions]);

    return <transcriptionContext.Provider value={value}>{props?.children}</transcriptionContext.Provider>;
}
