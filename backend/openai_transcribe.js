const { OpenAI } = require("openai");
const fs = require("fs");

class OpenAiFactory {
    constructor(apiKey) {
        if (OpenAiFactory._instance) {
            return OpenAiFactory._instance;
        }
        OpenAiFactory._instance = this;
        return new OpenAI({
            apiKey,
        });
    }
}

async function transcribe(openai_key, filename) {
    const openai = new OpenAiFactory(openai_key);
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filename),
        model: "whisper-1",
    });

    return transcription;
}

module.exports = {
    transcribe,
};
