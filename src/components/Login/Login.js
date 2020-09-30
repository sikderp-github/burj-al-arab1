import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';



const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // The signed-in user info.
            console.log(result);
            const { displayName, email } = result.user;
            const signedUser = { name: displayName, email }
            setLoggedInUser(signedUser);
            storeAuthToken(); // call backend server

            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            console.log(errorCode);
        });
    }

    //to load/ store individual data from backend server through booings
    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken); // store data in sessionStorage
                history.replace(from);
            }).catch(function (error) {
                // Handle error
            });
    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;