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
import SearchForm from "./SearchForm";

function Header(){
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value); // Function to update user input state
  };

  const handleUserInputSubmit = (e) => {
    e.preventDefault();
    // Call the search function in the SearchForm component with the user input
    // This will trigger the API call and update the generatedAnswer state in SearchForm
    // You can pass down any prompt or other necessary data to the SearchForm here as well
    // For simplicity, I'm just passing the userInput for now.
    // Modify the prompt or other data according to your requirement.
    setGeneratedAnswer([]);
    setSearchInput(userInput);
    
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
        </Container>
      </Navbar>
      {/* <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">Mark Otto</a>
        </Navbar.Text>
      </Navbar.Collapse> */}
    <Row>
      <Col sm={14}>
        <Form className="d-flex" onSubmit={handleUserInputSubmit}>
          <Form.Control
            type="text"
            placeholder="Stocks/Equities/Indices, Forex, and Crypto"
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
    {/* <Nav.Link href="/search">Search</Nav.Link>*/}
    </React.Fragment>
  );
}

export default Header;
