import React, { useState, useEffect } from "react";
import  generateAnswer from "./ChatGPT";

const CustomQuestion = ({ prompt}) => {
  const [userInput, setUserInput] = useState("");
  const [generatedAnswer, setGeneratedAnswer] = useState("");

  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    
    const response = await generateAnswer(
      `${prompt}${userInput}?`
    );

    setGeneratedAnswer(response);
    setUserInput("");
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="input-container">
        <form onSubmit={handleUserInputSubmit}>
          <input
            type="text"
            placeholder="Message"
            onChange={handleUserInputChange}
            value={userInput}
            required
          />

          <button onClick={handleUserInputSubmit}
          > Submit </button>
        </form>
      </div>

    </div>
  );
};

export default CustomQuestion;