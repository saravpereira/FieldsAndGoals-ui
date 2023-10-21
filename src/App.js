import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

function App() {
  function handleCallbackResponse(response) {
    console.log(response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
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
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
}

export default App;
