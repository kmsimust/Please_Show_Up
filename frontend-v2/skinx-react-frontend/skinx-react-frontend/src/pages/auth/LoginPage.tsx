/* eslint-disable no-useless-concat */
/* eslint-disable import/no-absolute-path */
import React from 'react';
import LoginForm from '../../features/components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div
      className="flex-col font-serif login-center-form"
    >
      <div className='flex justify-center items-center'>
        <h1>Login Page</h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
