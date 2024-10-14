import { PromptTemplate } from "langchain/prompts";

// const prompt = PromptTemplate.fromTemplate(`the {attribute} of {target}`);

const prompt = new PromptTemplate({
  template: `the {attribute} of {target}`,
  inputVariables: ["attribute", "target"],
});

const init = async () => {
  const part = await prompt.partial({
    attribute: "name",
  });
  const res = await part.format({
    target: "Hyxiao",
  });
  console.log(res);
};

init();
