import OpenAI from "openai";
const openai = new OpenAI({ apiKey: "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" , dangerouslyAllowBrowser: true});

// const openai = new OpenAI({
//   apiKey: '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', dangerouslyAllowBrowser: 'true' // This is also the default, can be omitted
// });

export async function sendMsgToOpenAI(message) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:`${message}`,
      },
    ],
  });
  console.log(response.choices[0].message.content);
  return response.choices[0].message.content;
}
