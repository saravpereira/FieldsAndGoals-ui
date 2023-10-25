import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Other 3rd party libraries
import jwt_decode from 'jwt-decode';
import Parse from 'parse';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Add this import for styling

// Local imports
import { setUser, resetUser } from '../redux/user/userActions';
import { selectUser } from '../redux/user/userSelectors';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [showSignIn, setShowSignIn] = useState(true);

  const initializeGoogleLogin = () => {
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }

  useEffect(() => {
    Parse.initialize(process.env.REACT_APP_PARSE_APP_ID);   // Use environment variable for Parse App ID
    Parse.serverURL = process.env.REACT_APP_SERVER_URL;    // Use environment variable for server URL

    google.accounts.id.initialize({
        client_id: process.env.REACT_APP_CLIENT_ID,        // Use environment variable for client ID
        callback: handleCallbackResponse,
    });

    initializeGoogleLogin();
  }, []);

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    dispatch(setUser(userObject));
    setShowSignIn(false);
    Parse.User.logInWith('google', { authData: { id: userObject.sub, access_token: response.credential } })
      .catch(error => {
        toast.error('Error logging in through Google.');  // Notify user of error
      });
  }

  const handleSignOut = () => {
    Parse.User.logOut()
      .then(() => {
        dispatch(resetUser());
        setShowSignIn(true);
      })
      .catch(error => {
        toast.error('Error logging out.');  // Notify user of error
      });
  }

  return (
    <div>
      { showSignIn ? (
        <div id="signInDiv" />
      ) : (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <div>
            <img src={user.picture} alt="User's Profile" />
            <h3>{user.name}</h3>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default Login;
