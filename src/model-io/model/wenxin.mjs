import "dotenv/config";
import { HumanMessage } from "langchain/schema";
import { ChatBaiduWenxin } from "langchain/chat_models/baiduwenxin";

const { BAIDU_API_KEY, BAIDU_SECRET_KEY } = process.env;

const ernieTurbo = new ChatBaiduWenxin({
  baiduApiKey: BAIDU_API_KEY,
  baiduSecretKey: BAIDU_SECRET_KEY,
  model: "ernie-turbo",
  temperature: 0.5,
  maxTokens: 1024,
});

const message = [new HumanMessage("你好")];

const init = async () => {
  try {
    const res = await ernieTurbo.call(message);
    console.log(res.content || res);
  } catch (error) {
    console.error("Error calling API:", error);
  }
};

init();
