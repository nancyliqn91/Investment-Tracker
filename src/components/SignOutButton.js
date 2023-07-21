import React, { useState } from 'react';
import { auth } from "./../firebase.js";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
    const [signOutSuccess, setSignOutSuccess] = useState(null);
    const navigate = useNavigate();

    const doSignOut = () => {
        signOut(auth)
        .then(function() {
          setSignOutSuccess("You have successfully signed out!");
          navigate('/news');
        }).catch(function(error) {
          setSignOutSuccess(`There was an error signing out: ${error.message}!`);
        });
    };

    return (
        // <React.Fragment>
        // <Card style={{ width: '30rem' }}> 
        //   {signOutSuccess}
        //   <h3>Are you sure want to sign out?</h3>
        //   <button onClick={doSignOut}>Sign out</button>
        // </Card> 
        // </React.Fragment>
        <button onClick={doSignOut}>Sign Out</button>
    );
}

export default SignOutButton;