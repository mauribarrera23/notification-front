import React, { useContext, useState } from 'react';

import { UserContext } from '../context/UserContext';
import ErrorMessage from './ErrorsMessage';
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const [, setToken] = useContext(UserContext);

    const submit = async() => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
        };

        const response = await fetch(`/user/signup`, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            navigate("/login")
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (password === confirmPassword && password.length > 5){
            submit();
        } else {
            setErrorMessage("The password and password confirmation doesn't match.");
        }
    };

    return (
        <div className='column'>
            <form className='box' onSubmit={handleSubmit}>
                <h1 className='title has-text-centered'>Sign Up</h1>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input 
                            type="text"
                            placeholder='Enter a username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='input'
                            required
                        />
                    </div>
                    <br />
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                            type="email"
                            placeholder='Enter a email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='input'
                            required
                        />
                    </div>
                    <br />
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                            type="password"
                            placeholder='Enter a password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='input'
                            required
                        />
                    </div>
                    <br />
                    <label className="label">Confirm password</label>
                    <div className="control">
                        <input 
                            type="password"
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='input'
                            required
                        />
                    </div>
                    <br />
                    <ErrorMessage message={errorMessage} />
                    <button className="button is-primary" type='submit'>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;
