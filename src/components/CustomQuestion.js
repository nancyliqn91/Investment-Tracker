import React, { useState} from "react";
import  generateAnswer from "./ChatGPT";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
    <>
      {[
        'Success'
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Body>
            <Card.Title>Type Here</Card.Title>
              <form onSubmit={handleUserInputSubmit}>
              <textarea
                type="text"
                placeholder="Message"
                onChange={handleUserInputChange}
                value={userInput}
                required
              />
              <Button variant="primary" type="submit">Submit </Button>
            </form>
            <Card.Text>
            Answer:{generatedAnswer}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default CustomQuestion