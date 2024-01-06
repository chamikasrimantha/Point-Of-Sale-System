import axios from 'axios';
import React, { useState } from 'react'
import '../Admin.css';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    const data = {
      "username": username,
      "password": password
    }
    const response = await axios.post("http://localhost:8080/auth/login", data);
    if (response.status === 200) {
      localStorage.setItem("token", response.data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
      navigate("/admin/");
    } else {
      console.log("login error!");
    }
  }

  const register = () => {
    navigate("/admin/register");
  }

  return (
    <div>
      <div className='login'>
        <div className="register-container">
          <h2>Login</h2>
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="input-field" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
            </div>
            <div className='form-group'>
              <button type="submit" className="register-btn">Login</button>
            </div>
            <div className='form-group'>
              <p onClick={register}>Don't have an account? Register here!</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
