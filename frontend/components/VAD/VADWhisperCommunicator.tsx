/* eslint-disable react-hooks/exhaustive-deps */
import { useAudioTranscriptionContext } from "@/contexts/audioTranscriptionContext/audioTranscriptionContext";
import { audioReducer } from "@/reducers/AudioStringStateReducer";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import axios from "axios";
import { useEffect, useReducer } from "react";

interface TranscribeResponse {
    text?: Array<string>;
}

export default function VADWhisperCommunicator() {
    const BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transcribe`;
    const [state, dispatch] = useReducer(audioReducer, { audio: null });

    const { processTranscription } = useAudioTranscriptionContext();

    useEffect(() => {
        const { audio } = state;

        if (!audio) return;

        axios
            .post<TranscribeResponse>(BACKEND_URL, {
                audio,
            })
            .then((resp) => {
                const { text } = resp.data;

                if (text) {
                    processTranscription(text);
                }
            })
            .catch((err: any) => {
                console.log(err);
            })
            .finally(() => {
                dispatch({
                    type: "remove",
                });
            });
    }, [state]);

    const vad = useMicVAD({
        startOnLoad: true,
        onSpeechEnd: (audio) => {
            const wavBuffer = utils.encodeWAV(audio);
            const base64 = utils.arrayBufferToBase64(wavBuffer);
            const url = `data:audio/wav;base64,${base64}`;
            dispatch({
                type: "add",
                payload: url,
            });
        },
    });

    return null;
}
