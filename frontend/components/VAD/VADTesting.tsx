import React from "react";
import { useMicVAD } from "@ricky0123/vad-react";

export default function VADTesting() {
    const vad = useMicVAD({
        startOnLoad: true,
        onSpeechEnd: (audio) => {
            console.log("User stopped talking");
        },
    });
    return <div>{vad.userSpeaking ? "User is speaking" : "User is not speaking"}</div>;
}
