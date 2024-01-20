import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin ? <LoginPage /> : <RegisterPage />}
    </div>
  );
};

export default AuthPage;