import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextField, Button, Typography, Box } from "@material-ui/core";
import styles from './Home.module.css';

import { loginGoogle } from "../redux/actions/auth";

const Home = ({ loginGoogle, oauth }) => {
  useEffect(() => {
    if (oauth) {
      window.location.href = oauth;
    }
  }, [oauth]);

  const handleGoogleSignIn = () => {
    loginGoogle();
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <Box width="50%">
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Login Page
          </Typography>
          <form className={styles.form}>
            <TextField
              fullWidth
              type="email"
              name="email"
              placeholder="Email"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              type="password"
              name="password"
              placeholder="Password"
              margin="normal"
              variant="outlined"
            />
            <Button className={styles.formButton} variant="contained" color="primary">
              Login
            </Button>
          </form>
          <Button
            className={styles.googleSignInButton}
            variant="contained"
            color="secondary"
            onClick={handleGoogleSignIn}
          >
            Sign In with Google
          </Button>
        </Box>
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  loginGoogle: PropTypes.func.isRequired,
  oauth: PropTypes.string,
};

const mapStateToProps = (state) => ({
  oauth: state.auth.oauth,
});

export default connect(mapStateToProps, { loginGoogle })(Home);
