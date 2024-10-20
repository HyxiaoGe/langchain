import { RetrievalQAChain } from "langchain/chains";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { embeddingModel, supabaseClient } from "../utils/utils.mjs";

const store = new SupabaseVectorStore(embeddingModel, {
  client: supabaseClient,
  tableName: "documents",
  queryName: "match_documents",
});
