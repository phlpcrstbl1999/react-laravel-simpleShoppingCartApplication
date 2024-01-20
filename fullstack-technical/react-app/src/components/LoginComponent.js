import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/loginComponent.css';
const LoginComponent = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', loginData);
      const token = response.data.access_token;
      const data = response.data;
      localStorage.setItem('authToken', token);
      console.log(data);
      if (response.status === 201) {
        navigate('/order');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="wrapper">
    <form>
      <div className="login-container">
        <h1>Login</h1>
        <div className="input-box">
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        </div>
        <div className="input-box">
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
        </div>
        

          <button type="button" className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <div className="register-link">
            <p>Don't have an account? <a href="/">Register</a></p>
          </div>
      </div>
    </form>
    </div>

  );
};

export default LoginComponent;