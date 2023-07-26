import axios from "axios";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const baseURL = "https://api.openai.com/v1";
const engine = "text-davinci-003";
const maxTokens = 7;
const numCompletions = 1;
const temperature = 0;

axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

const generateAnswer = async (prompt) => {
  try {
    const response = await axios.post(
      `${baseURL}/engines/${engine}/completions`,
      {
        prompt: prompt,
        max_tokens: maxTokens,
        n: numCompletions,
        temperature: temperature,
      }
    );

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    throw new Error("Error generating text");
  }
}

export default generateAnswer