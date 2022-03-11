import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { PageLayout } from '../../components/layout/PageLayout';

const UserLoginPage: React.FC = () => {
  return (
    <PageLayout style={{ margin: '0', height: '100vh' }}>
      <LoginForm />
    </PageLayout>
  );
};

export default UserLoginPage;
