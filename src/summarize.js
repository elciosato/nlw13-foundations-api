// import { summaryExample } from "./utils/summary.js";
import { pipeline } from "@xenova/transformers";

export async function summarize(text) {
  try {
    // return summaryExample;
    console.log("Summarizing...");

    const generator = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
    );

    const output = await generator(text);

    console.log("Summary has been finished");
    return output[0].summary_text;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
