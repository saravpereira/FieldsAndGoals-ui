import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { initializeGoogleLoginThunk, logoutThunk } from '../../redux/user/userReducer';
import { selectUser } from '../../redux/user/userSelectors';

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(initializeGoogleLoginThunk());
    }, [dispatch]);

    return (
        <div>
            { user?.name ? (
                <>
                    <button onClick={() => dispatch(logoutThunk())}>Sign Out</button>
                    <div>
                        <img src={user.picture} alt="User's Profile" />
                        <h3>{user.name}</h3>
                    </div>
                </>
            ) : (
                <div id="signInDiv" />
            )}
            <ToastContainer />
        </div>
    );    
}

export default Login;
