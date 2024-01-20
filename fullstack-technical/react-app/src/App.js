import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderPage from './pages/OrderPage';
import CreateOrderPage from './pages/CreateOrderPage';
import UpdateOrderPage from './pages/UpdateOrderPage';
import ViewOrderPage from './pages/ViewOrderPage';
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
              <Route path="/create-order" element={<CreateOrderPage />} />
              <Route path="/update-order/:id" element={<UpdateOrderPage />} />
              <Route path="/view-order/:id" element={<ViewOrderPage />} />

            </Routes>
          </Router>
    </div>
  );
};

export default App;