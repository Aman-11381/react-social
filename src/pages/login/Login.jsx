import React, { useRef, useContext } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';

export default function Login() {

    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
    };

    console.log(user)

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div className="loginLogo">Lamasocial</div>
                    <div className="loginDesc">Connect with friends and the world around you on Lamasocial.</div>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder='Email' type='email' required className="loginInput" ref={email} />
                        <input placeholder='Password' type='password' minLength="6" required className="loginInput" ref={password} />
                        <button type='submit' className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color='inherit' size='30px'/>: "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">{isFetching ? <CircularProgress color='inherit' size='30px'/>: "Create a New Account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
