import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
const App = () => {
  return (
    <div className="App">
        <div className="Container">
        <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Other routes if needed */}
      </Routes>
    </Router>
        </div>
    </div>
  );
};

export default App;