import axios from 'axios';
import '../Admin.css';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminRegister() {

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
    const response = await axios.post("http://localhost:8080/users", data);
    if (response.status === 200) {
      navigate("/admin/login");
    } else {
      console.log("error");
    }
  }

  const login = () => {
    navigate("/admin/login")
  }

  return (
    <div className='register'>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={register}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" />
          </div>
          <div className='form-group'>
          <button type="submit" className="register-btn">Register</button>
          </div>
          <div className='form-group'>
            <p onClick={login}>Already have an account? Login here!</p>
          </div>
        </form>
      </div>
    </div>
  )
}