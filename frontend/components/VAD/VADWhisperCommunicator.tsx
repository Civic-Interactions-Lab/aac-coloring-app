/* eslint-disable react-hooks/exhaustive-deps */
import { useMicVAD, utils } from "@ricky0123/vad-react";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface TranscribeResponse {
    text?: string;
}

export default function VADWhisperCommunicator() {
    const BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transcribe`;
    const [audioStrings, setAudioStrings] = useState<Array<string>>([]);

    useEffect(() => {
        if (audioStrings.length == 0) return;

        const transcribePromise = axios.post<TranscribeResponse>(BACKEND_URL, {
            audio: audioStrings[0],
        });

        transcribePromise.then((resp) => {
            const data = resp.data;
            console.log(data);
        });

        transcribePromise.catch((err: any) => {
            console.log(err);
        });
    }, [audioStrings]);

    const vad = useMicVAD({
        startOnLoad: true,
        onSpeechEnd: (audio) => {
            const wavBuffer = utils.encodeWAV(audio);
            const base64 = utils.arrayBufferToBase64(wavBuffer);
            const url = `data:audio/wav;base64,${base64}`;
            setAudioStrings([url, ...audioStrings]);
        },
    });

    //console.log(audioStrings);

    return <p>{audioStrings.length}</p>;
}
