const fs = require("fs");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const text = "Hola, este es un texto de prueba.";

axios
  .post(
    "https://texttospeech.googleapis.com/v1beta1/text:synthesize",
    {
      audioConfig: {
        audioEncoding: "LINEAR16",
        effectsProfileId: ["headphone-class-device"],
        pitch: 0,
        speakingRate: 1,
      },
      input: {
        text,
      },
      voice: {
        languageCode: "es-US",
        name: "es-US-Polyglot-1",
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.API_KEY,
      },
    }
  )
  .then((res) => {
    console.log(res.data.audioContent);
    const wavUrl = "data:audio/wav;base64," + res.data.audioContent;
    const buffer = Buffer.from(
      wavUrl.split("base64,")[1], // only use encoded data after "base64,"
      "base64"
    );
    fs.writeFileSync("./audio.wav", buffer);
    console.log(`wrote ${buffer.byteLength.toLocaleString()} bytes to file.`);
  });
