import fs from "node:fs";
import wav from "node-wav";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";

const filePath = "./tmp/audio.mp3";
const outputPath = filePath.replace(".mp3", ".wav");

export function convert() {
  return new Promise((resolve, reject) => {
    console.log("Converting the video");

    ffmpeg.setFfmpegPath(ffmpegStatic);
    ffmpeg()
      .input(filePath)
      .audioFrequency(16000)
      .audioChannels(1)
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outputPath);
        const fileDecoded = wav.decode(file);

        const audioData = fileDecoded.channelData[0];
        const floatArray = new Float32Array(audioData);

        console.log("Video has been converted successfully");
        resolve(floatArray);
        fs.unlinkSync(outputPath);
      })
      .on("error", (err) => {
        console.error("Converting Error:", err);
        reject(err);
      })
      .save(outputPath);
  });
}
