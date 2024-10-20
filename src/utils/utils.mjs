import "dotenv/config";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Configuration } from "openai";

import { createClient } from "@supabase/supabase-js";
import { SerpAPI } from "langchain/tools";

const {
  OPENAI_API_KEY,
  OPENAI_API_BASE_PATH,
  SUPABASE_URL,
  SUPABASE_KEY,
  SERP_API_KEY,
} = process.env;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  basePath: OPENAI_API_BASE_PATH,
});

const customFetch = async (url, options) => {
  const endpoint = "/embeddings";
  const newUrl = `${OPENAI_API_BASE_PATH}${endpoint}`;

  options.method = "POST";

  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };

  console.log("Sending request to", newUrl);
  console.log("Request options", JSON.stringify(options, null, 2));

  try {
    const response = await fetch(newUrl, options);
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorBody}`
      );
    }
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const embeddingModel = new OpenAIEmbeddings(
  {
    openAIApiKey: OPENAI_API_KEY,
    configuration: configuration,
    modelName: "text-embedding-ada-002",
  },
  {
    basePath: OPENAI_API_BASE_PATH,
    baseOptions: {
      fetch: customFetch,
      timeout: 60000,
    },
  }
);

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const serpAPI = new SerpAPI(SERP_API_KEY);

export { embeddingModel, supabaseClient };
