import React, { useEffect } from 'react';

function App() {
  const googleClientId = "141115154444-ffidu0bon5vvv7e1r0r0p0tqsj0oisq2.apps.googleusercontent.com"; // Replace with your Google Client ID

  useEffect(() => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: googleClientId
      });
    });
  }, []);

  const handleLogin = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    });
  };

  return (
    <div className="App">
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default App;
