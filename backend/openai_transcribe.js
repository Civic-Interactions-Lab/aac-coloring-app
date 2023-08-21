const { OpenAI } = require("openai");
const fs = require("fs");

async function transcribe(openai_key, filename) {
    const openai = new OpenAI({
        apiKey: openai_key,
    });
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filename),
        model: "whisper-1",
    });

    console.log(transcription);
    return transcription;
}

module.exports = {
    transcribe,
};
