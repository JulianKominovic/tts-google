const fs = require("fs");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

axios
  .post(
    "https://texttospeech.googleapis.com/v1beta1/text:synthesize",
    {
      audioConfig: {
        audioEncoding: "LINEAR16",
        effectsProfileId: ["headphone-class-device"],
        pitch: 0,
        speakingRate: 1.1,
      },
      input: {
        text: fs.readFileSync("./input.txt", { encoding: "utf-8" }),
      },
      voice: {
        languageCode: "es-US",
        name: "es-US-News-E",
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
    const wavUrl = "data:audio/wav;base64," + res.data.audioContent;
    const buffer = Buffer.from(
      wavUrl.split("base64,")[1], // only use encoded data after "base64,"
      "base64"
    );
    fs.mkdirSync(path.join(__dirname, "output"), { recursive: true });
    fs.writeFileSync(
      path.join(
        __dirname,
        "output",
        `${new Date()
          .toISOString()
          .replaceAll(":", "_")
          .replaceAll(".", "_")}.wav`
      ),
      buffer
    );
    console.log(`wrote ${buffer.byteLength.toLocaleString()} bytes to file.`);
  });
