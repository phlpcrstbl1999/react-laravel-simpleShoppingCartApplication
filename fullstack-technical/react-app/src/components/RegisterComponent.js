import React, { useState } from 'react';
import axios from 'axios';

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log(response.data);

      // Clear the form after successful registration
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />

        <button type="button" onClick={handleRegistration} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterComponent;