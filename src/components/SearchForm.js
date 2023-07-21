import React, { useState} from "react";
import searchAPI from "./SearchAPI";

const SearchForm = ({ prompt}) => {
  const [userInput, setUserInput] = useState("");
  const [generatedAnswer, setGeneratedAnswer] = useState([]);

  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await searchAPI(`${prompt}${userInput}?`);
      setGeneratedAnswer(response.results);
      setUserInput("");
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="input-container">
        <h2>Welcome to use the search function</h2>
        <form onSubmit={handleUserInputSubmit}>
          <input
            type="text"
            placeholder="ticker and/or company name"
            onChange={handleUserInputChange}
            value={userInput}
            required
          />
          <button type="submit"> Submit </button>
        </form>

        <h2>Here is the answer for you</h2>
          <ul>
            {generatedAnswer && generatedAnswer.map((item, index) =>(
              <li key={index}>
                <p>Ticker:{item.ticker}</p>
                <p>Name:{item.name}</p>
                <p>Market:{item.market}</p>       
              </li>
            )
            )}
          </ul>
      </div>
    </div>
  );
};

export default SearchForm