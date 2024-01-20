import React, { useState } from 'react';
import axios from 'axios';
import '../styles/registerComponent.css';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    severity: ''
  });
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log(response.data);

      setOpen(true);
      setAlert({message: "Successfully Registered", severity: "success"});
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      setOpen(true);
      setAlert({message: "Error Register", severity: "info"});
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="wrapper">
      <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert severity={alert.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      </Collapse>
    </Box>
    <form onSubmit={(e) => e.preventDefault()}>
    <div className="register-container">
      <h1>Register</h1>
      
      <div className="input-box">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
      </div>
      <div className="input-box">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
      </div>
      <div className="input-box">
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
      </div>
        <button type="button" className="register-btn" onClick={handleRegistration} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="login-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    </div>
    </form>
    </div>
  );
};

export default RegisterComponent;