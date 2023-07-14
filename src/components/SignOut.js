import React, { useState } from "react";
import { auth } from "./../firebase.js";
import { signOut } from "firebase/auth";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function SignOut(){  
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  function doSignOut() {
    signOut(auth)
      .then(function() {
        setSignOutSuccess("You have successfully signed out!");
      }).catch(function(error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }

  return (
    <React.Fragment>

    <Card style={{ width: '30rem' }}> 
      {signOutSuccess}
      <h3>Are you sure want to sign out?</h3>
      <button onClick={doSignOut}>Sign out</button>
    </Card> 

    </React.Fragment>
  );
}

export default SignOut