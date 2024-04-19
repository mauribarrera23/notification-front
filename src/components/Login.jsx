import {React, useState, useContext} from "react";
import ErrorMessage from "./ErrorsMessage";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const [, setToken] = useContext(UserContext);

    const submit = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                password: password
            }),
        };

        const response = await fetch(`/user/login`, requestOptions);
        const data = await response.json();

        if(!response.ok) {
            setErrorMessage(data.detail);
        } else {
            setToken(data.access_token);
            navigate("/notifications");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    }

    const handleSignUp = (e) => {
        navigate("/signup")
    }


    return (
        <div className='column'>
            <form className='box' onSubmit={handleSubmit}>
                <h1 className='title has-text-centered'>Login</h1>
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
                    <ErrorMessage message={errorMessage} />
                    <br />
                    <button className="button is-primary" type='submit'>
                        Login
                    </button>
                    <button className="button is-primary ml-3" onClick={() => handleSignUp()}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    )

};

export default Login;
