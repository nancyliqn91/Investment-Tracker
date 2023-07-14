import axios from "axios";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const baseURL = "https://api.polygon.io/v2/aggs/ticker";

const generateTicker = async (props) => {
  try {
    const { ticker } = props;

    const response = await axios.post(
      `${baseURL}/engines/${engine}/completions` );

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    throw new Error("Error generating text");
  }
}

export default generateTicker