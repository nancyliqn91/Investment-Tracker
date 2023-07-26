import React, { useEffect, useState } from "react";
import { auth } from "./../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SignOutButton from "./SignOutButton";
import Logo from './../img/logo.jpg'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import searchAPI from "./SearchAPI";

function Header(prompt){
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [generatedAnswer, setGeneratedAnswer] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value); 
  };

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

  return (
    <React.Fragment>   
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
        <img style={{width: 50, height: 50}} src={Logo} alt="a dinasour logo"/>
          <Navbar.Brand href="/">Investment Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Manage Tickers</Nav.Link>
            <Nav.Link href="/news">Stocks News</Nav.Link>

            {!isSignedIn ? (
            <>
              <Nav.Link href="/sign-in">Sign In</Nav.Link>
            </>
            ) : (
              <SignOutButton />
            )}            
            <Nav.Link href="/sign-up">Sign Up</Nav.Link> 
          </Nav>

          <Row>
          <Col sm={14}>
            <Form className="d-flex" onSubmit={handleUserInputSubmit}>
              <Form.Control
                type="text"
                placeholder="Stocks/Equities/Indices/Forex/Crypto"
                onChange={handleUserInputChange}
                value={userInput}
                required
                className="me-2"
                aria-label="Search"
              />
              <Button type="submit">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
        </Container>
      </Navbar>

      <div className="container">
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
    </React.Fragment>
  );
}

export default Header;
