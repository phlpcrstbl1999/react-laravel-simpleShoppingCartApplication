import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', loginData);
      const data = response.data;
      console.log(data);

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <form>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleInputChange} />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleInputChange} />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;