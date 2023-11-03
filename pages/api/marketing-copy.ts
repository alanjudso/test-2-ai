// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { openai } from "../../utils/constants";
type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { input } = req.body;
  const response = await openai.completions.create({
    model: "text-davinci-003",
    prompt: `You are a marketing expert and a customer approaches you to write a short and very interesting marketing copy for him or her. This is the topic they would like a marketing copy for: ${input}. This is the short marketing copy you came up with:`,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const suggestion = response.choices?.[0].text;
  if (suggestion == undefined) {
    throw new Error("No suggestion found");
  }
  res.status(200).json({ result: suggestion });
}
