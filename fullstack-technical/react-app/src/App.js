import React from 'react';
import LoginForm from './components/LoginComponent';
import RegistrationForm from './components/RegisterComponent';

const App = () => {
  return (
    <div>
      <LoginForm />
      <hr></hr>
      <RegistrationForm />
    </div>
  );
};

export default App;