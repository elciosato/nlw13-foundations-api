import express from "express";
import cors from "cors";
import { download } from "./download.js";
import { transcribe } from "./transcribe.js";
import { summarize } from "./summarize.js";
import { convert } from "./convert.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/transcription/:videoId", async (request, response) => {
  try {
    await download(request.params.videoId);

    const audioConverted = await convert();

    const transcription = await transcribe(audioConverted);

    return response.json({ transcription });
  } catch (error) {
    console.error(error);
    return response.json({
      error,
    });
  }
});

app.post("/summary", async (request, response) => {
  try {
    const summary = await summarize(request.body.text);

    return response.json({ summary });
  } catch (error) {
    console.error(error);
    return response.json({
      error,
    });
  }
});
