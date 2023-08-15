const express = require("express");
require("dotenv").config();

const app = express();
const port = +process.env.PORT;

app.get("/healthcheck", (req, res) => {
    console.log(`Example app listening on port ${port}`);
    res.status(200).json({
        status: "OK",
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
