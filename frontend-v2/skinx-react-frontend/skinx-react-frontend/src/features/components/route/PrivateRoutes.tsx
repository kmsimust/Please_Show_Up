import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../../pages/auth/LoginPage';
import SignupPage from '../../../pages/auth/SignupPage';
import PostListPage from '../../../pages/post/PostListPage';
import { Layout } from 'antd';

interface PrivateRoutesProps {
  isAuthenticated: boolean;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ isAuthenticated }) => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Private Routes */}
      {isAuthenticated ? (
        <>
        <Layout>
          <Route path="/" element={<PostListPage />} />
          <Route path="/home" element={<PostListPage />} />
        </Layout>
          
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </Routes>
  );
};

export default PrivateRoutes;
