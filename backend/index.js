const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const fs = require("fs");
const openai = require("openai");
const AWS = require("aws-sdk");

var jsonParser = bodyParser.json({ limit: "25mb" });
var urlencodedParser = bodyParser.urlencoded({ extended: false });

require("dotenv").config();

const app = express();
const port = +process.env.PORT;
const allowedOrigins = ["https://api.openai.com", "http://localhost:3000", "https://aac-coloring-app.vercel.app/"];

//! REMOVE ALL CREDS
AWS.config.update({
    // accessKeyId: undefined,
    // secretAccessKey: undefined,
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
    methods: ["POST"],
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

    if (req.method !== "POST")
        return res.status(400).json({
            message: "Method is not POST",
        });

    const { audio } = req.body;

    if (!audio || !audio.startsWith("data:audio/wav;base64,"))
        return res.status(400).json({
            message: "Audio file is not in correct format, needs to be in base64",
        });

    // create file
    // send for transcribe
    // delete file

    res.status(200).json({
        message: "ok",
        text: "ok",
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
