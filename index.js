const fs = require("fs");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

axios
  .get("https://texttospeech.googleapis.com/v1/voices", {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.API_KEY,
    },
  })
  .then((res) => {
    fs.writeFileSync(
      path.join(__dirname, "voices.json"),
      JSON.stringify(res.data.voices, null, 2)
    );
  });
