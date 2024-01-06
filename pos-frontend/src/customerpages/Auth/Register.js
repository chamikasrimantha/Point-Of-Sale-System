import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const register = async (event) => {
        event.preventDefault();
        const data = {
            "username": username,
            "password": password,
            "email": email
        }
        const response = await axios.post("http://localhost:8080/auth/register", data);
        if (response.status === 200) {
            navigate("/login");
        } else {
            console.log("error");
        }
    }

    const login = () => {
        navigate("/login")
    }

    return (
        <div>
            <div className="register-container">
                <div className="register-header">
                    <h2>Register</h2>
                </div>
                <form onSubmit={register}>
                    <div className="form-group">
                        <label htmlFor="username" className="label-text">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="label-text">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="label-text">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="register-btn">
                            Register
                        </button>
                    </div>
                    <div className="already-login">
                        <p onClick={login}>Already have an account? Login here!</p>
                    </div>
                </form>
            </div>
        </div>
    )
}
