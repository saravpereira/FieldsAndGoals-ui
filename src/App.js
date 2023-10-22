import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Parse from 'parse';

function App() {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded User Token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;

    // Log in to Parse Server using Google token
    Parse.User.logInWith('google', { authData: { id: userObject.sub, access_token: response.credential } })
      .then(user => {
        console.log('User logged in through Google:', user);
      })
      .catch(error => {
        console.error('Error logging in through Google:', error);
      });
  }

  function handleSignOut(event) {
    // Log out from Parse Server
    Parse.User.logOut()
      .then(() => {
        console.log('User logged out from Parse');
        setUser({});
        document.getElementById("signInDiv").hidden = false;
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  }

  useEffect(() => {
    Parse.initialize("parse"); // APP_ID
    Parse.serverURL = 'https://api.fieldsandgoals.com/parse'; // SERVER_URL

    google.accounts.id.initialize({
        client_id: "141115154444-ffidu0bon5vvv7e1r0r0p0tqsj0oisq2.apps.googleusercontent.com",
        callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      { Object.keys(user).length != 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      
      { user &&
        <div>
            <img src={user.picture}></img>
            <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
