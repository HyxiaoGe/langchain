import { embeddingModel, supabaseClient } from "../../utils/utils.mjs";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const loader = new PDFLoader("src/assets/es6.pdf");
const docs = await loader.load();

// const textSplitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 500,
//   chunkOverlap: 50,
// });
// const splitDocs = await textSplitter.splitDocuments(docs);

// const batchSize = 10;
// for (const doc of splitDocs) {
//   await SupabaseVectorStore.fromDocuments([doc], embeddingModel, {
//     client: supabaseClient,
//     tableName: "documents",
//     queryName: "match_documents",
//   });
//   console.log(`Processed document`);
// }

const store = new SupabaseVectorStore(embeddingModel, {
  client: supabaseClient,
  tableName: "documents",
  queryName: "match_documents",
});

const result = await store.similaritySearch("promise 的用法", 1);
console.log(result);

