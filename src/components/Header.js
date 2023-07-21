import React, { useEffect, useState } from "react";
import { auth } from "./../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SignOutButton from "./SignOutButton";
import Logo from './../img/logo.jpg'

function Header(){
  const [isSignedIn, setIsSignedIn] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

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
            <Nav.Link href="/search">Search</Nav.Link>           
          </Nav>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;
