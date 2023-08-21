const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");
const { computeMD5Hash } = require("./hash");
const { transcribe } = require("./openai_transcribe");
const { processString } = require("./text_processor");
const AWS = require("aws-sdk");

var jsonParser = bodyParser.json({ limit: 52428800 });
var urlencodedParser = bodyParser.urlencoded({ extended: false });

require("dotenv").config();

const app = express();
const port = +process.env.PORT;
const allowedOrigins = ["http://localhost:3000", "https://aac-coloring-app.vercel.app/"];

//! REMOVE ALL CREDS
AWS.config.update({
    region: "us-east-1",
});

const OpenAPIKeyPromise = new Promise((resolve, reject) => {
    // Create an instance of the SSM service
    const ssm = new AWS.SSM();

    // Parameters for the getParameter API call
    const parameterName = "/AAC/openai_key";
    const withDecryption = true; // Request decryption of the parameter value

    // Call the getParameter API
    ssm.getParameter({ Name: parameterName, WithDecryption: withDecryption }, (err, data) => {
        if (err) {
            reject(err);
        } else {
            const parameterValue = data.Parameter.Value;
            resolve(parameterValue);
        }
    });
});

OpenAPIKeyPromise.catch((err) => console.error(err));

// allow external requests
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(jsonParser);

// can we connect to this backend??
app.get("/health-check", async (req, res) => {
    console.log(`Example app listening on port ${port}`);
    res.status(200).json({
        status: "OK",
    });
});

app.post("/transcribe", async (req, res) => {
    let openai_key;

    try {
        openai_key = await OpenAPIKeyPromise;
    } catch (error) {
        return res.status(500).json({
            message: "API key not able to be retrived from AWS",
        });
    }

    const { audio } = req.body;

    if (!audio || !audio.startsWith("data:audio/wav;base64,"))
        return res.status(400).json({
            message: "Audio file is not in correct format, needs to be in base64",
        });

    const audioHash = computeMD5Hash(audio);
    const filePath = path.join(__dirname, `${audioHash}.wav`);

    try {
        const buffer = Buffer.from(
            audio.split("base64,")[1], // only use encoded data after "base64,"
            "base64"
        );
        fs.writeFileSync(filePath, buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "fs error" });
    }

    try {
        const transcription = await transcribe(openai_key, filePath);

        if (!transcription.text) res.status(500).json({ message: "openapi error: missing transcription->text" });
        else
            res.status(200).json({
                text: processString(transcription.text),
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "openapi error" });
    }

    fs.unlinkSync(filePath);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
