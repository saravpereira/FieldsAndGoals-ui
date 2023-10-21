import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function App() {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded User Token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
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
