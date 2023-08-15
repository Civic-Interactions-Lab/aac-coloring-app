import { useState } from "react";

//@ts-ignore
import { AudioRecorder } from "react-audio-voice-recorder";

export default function VoiceRecordTrial() {
    const [audioUrl, setAudioUrl] = useState<string>();

    const addAudioElement = (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
    };

    return (
        <div className="flex gap-4">
            <AudioRecorder
                onRecordingComplete={addAudioElement}
                showVisualizer={true}
                audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                }}
                onNotAllowedOrFound={(err: any) => console.table(err)}
                downloadOnSavePress={true}
                downloadFileExtension="mp3"
                mediaRecorderOptions={{
                    audioBitsPerSecond: 128000,
                }}
            />
            <br />
            {audioUrl && <audio src={audioUrl} controls={true} />}
        </div>
    );
}
