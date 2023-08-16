const express = require("express");
const cors = require("cors");
const AWS = require("aws-sdk");

require("dotenv").config();

const app = express();
const port = +process.env.PORT;
const allowedOrigins = ["https://api.openai.com"];

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
    methods: ["POST"],
    credentials: true,
};

app.use(cors(corsOptions));

// can we connect to this backend??
app.get("/health-check", async (req, res) => {
    console.log(`Example app listening on port ${port}`);
    res.status(200).json({
        status: "OK",
    });
});

app.get("/health-check-2", async (req, res) => {
    console.log(`Example app listening on port ${port}`);
    res.status(200).json({
        status: "OK",
    });
});

app.get("/get-param", async (req, res) => {
    console.log(OpenAPIKeyPromise);

    try {
        const key = await OpenAPIKeyPromise;
        res.status(200).json({
            key,
        });
    } catch (err) {
        res.status(403).json({
            message: "unauthorized",
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
