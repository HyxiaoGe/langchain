import { embeddingModel } from "../../utils/utils.mjs";
try {
  const output = await embeddingModel.embedQuery("hello");
  console.log("Embedding output:", output);
} catch (error) {
  console.error("Error embedding query:", error);
}
