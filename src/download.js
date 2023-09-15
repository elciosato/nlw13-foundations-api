import ytdl from "ytdl-core";
import fs from "node:fs";

export function download(videoId) {
  return new Promise((resolve, reject) => {
    // https://www.youtube.com/shorts/01E_yl1Y2C8
    const videoURL = `https://www.youtube.com/shorts/${videoId}`;
    console.log("Realizando o download do video:", videoId);

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000;

        if (seconds > 120) {
          throw new Error(
            "The duration of this video is greater than 60 seconds"
          );
        }
      })
      .on("end", () => {
        console.log("Download completed successfully");
        resolve();
      })
      .on("error", (error) => {
        console.error("I was not able to download the video:", error);
        reject(error);
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp3"));
  });
}
