const apiKey = process.env.REACT_APP_API_KEY;
const baseURL = "https://api.polygon.io/v3/reference/tickers?";

const searchAPI = async (prompt) => {
  try {
    const response = await fetch(
      `${baseURL}/search=${prompt}/&active=true&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Error getting search results");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting search results");
  }
};

export default searchAPI;