import React, { useState } from "react";
import { auth } from "./../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function SignUp(){  
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const navigate = useNavigate();

  function doSignUp(event) {
    event.preventDefault();
    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {      
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`);
        navigate('/');
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}!`)
      });
  }
  
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center my-4">
    <h1 className="mb-4">Sign Up</h1>
    {signUpSuccess}

    <Form onSubmit={doSignUp} className="w-50">
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="firstName" placeholder="First Name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="lastName" placeholder="Last Name" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail" className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  </Container>

  );
}

export default SignUp