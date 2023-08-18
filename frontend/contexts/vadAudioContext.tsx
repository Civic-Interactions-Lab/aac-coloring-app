import { createContext, useContext, useState } from "react";

type audioSampleType = number;
type audioQueue = Array<audioSampleType>;

interface VadAudioContextType {
    audios: audioQueue;
    addToAudioQueue: (item: audioSampleType) => void;
    removeFromAudioQueue: () => audioSampleType | undefined;
}

const VadAudioContext = createContext<Partial<VadAudioContextType>>({});

export const useVadAudioContext = () => {
    return useContext(VadAudioContext);
};

interface VadAudioQueueProviderProps {
    children?: React.ReactNode;
}

export default function VadAudioQueueProvider(props: VadAudioQueueProviderProps) {
    const [audios, setAudios] = useState(new Array<audioSampleType>());

    const addToAudioQueue = (item: audioSampleType) => {
        setAudios([item, ...audios]);
    };

    const removeFromAudioQueue = () => {
        const copyArr = [...audios];
        const removed = copyArr.pop();

        setAudios(copyArr);

        return removed;
    };

    const value = {
        audios,
        addToAudioQueue,
        removeFromAudioQueue,
    };

    return <VadAudioContext.Provider value={value}>{props.children}</VadAudioContext.Provider>;
}
