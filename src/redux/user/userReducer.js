import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import Parse from 'parse';

Parse.initialize(process.env.REACT_APP_PARSE_APP_ID);
Parse.serverURL = process.env.REACT_APP_SERVER_URL;

export const initializeGoogleLoginThunk = createAsyncThunk('user/initializeGoogleLogin', async (_, { dispatch }) => {
    google.accounts.id.initialize({
        client_id: process.env.REACT_APP_CLIENT_ID,
        callback: (response) => {
            const userObject = jwt_decode(response.credential);
            dispatch(setUser(userObject));
            Parse.User.logInWith('google', { authData: { id: userObject.sub, access_token: response.credential } })
                .catch(error => {
                    toast.error('Error logging in through Google.');
                });
        }
    });

    google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
});

export const logoutThunk = createAsyncThunk('user/logout', async (_, { dispatch }) => {
    await Parse.User.logOut();
    dispatch(resetUser());
});

const userSlice = createSlice({
    name: 'userReducer',
    initialState: {auth: {}},
    reducers: {
      setUser: (state, action) => {
        return action.payload;
      },
      resetUser: () => {
        return {};
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(logoutThunk.rejected, (state, action) => {
          toast.error('Error logging out.');
        });
    }
  });
  

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
