import "dotenv/config";
import pkg from "openai";

const { Configuration, OpenAIApi } = pkg;

const { OPENAI_API_KEY, OPENAI_API_BASE_PATH } = process.env;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  basePath: OPENAI_API_BASE_PATH,
});

const openai = new OpenAIApi(configuration);

const init = async () => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "hello",
        },
      ],
      temperature: 0,
    });
    console.log(
      "OPENAI's response:",
      completion.data.choices[0].message.content
    );
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

init();
