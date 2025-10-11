/* eslint-disable no-useless-concat */
/* eslint-disable import/no-absolute-path */
import React from 'react';
import SignupForm from '../../features/components/auth/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div
      className="flex-col font-serif login-center-form"
    >
      <div className='flex justify-center items-center'>
        <h1>Signup Page</h1>
      </div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
