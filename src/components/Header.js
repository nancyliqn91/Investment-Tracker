import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(){
  return (
    <React.Fragment>

    {/* <h1 className="header">Welcome to Investment Tracker!</h1>
    <h3 className="header">🌰 You are welcome to search and track your stocks and coins! 🌰</h3> */}

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Investment Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Manage Ticker</Nav.Link>
            <Nav.Link href="/stocks">Stocks</Nav.Link>
            <Nav.Link href="/sign-in">Sign In</Nav.Link>
            <Nav.Link href="/sign-up">Sign Up</Nav.Link>
            <Nav.Link href="/sign-out">Sign Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </React.Fragment>
  );
}

export default Header;
