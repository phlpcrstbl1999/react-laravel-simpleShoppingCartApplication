import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderPage from './pages/OrderPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
const App = () => {
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/order" element={<OrderPage />} />
            </Routes>
          </Router>
    </div>
  );
};

export default App;