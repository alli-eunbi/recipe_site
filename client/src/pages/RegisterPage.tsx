import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { PageLayout } from '../components/layout/PageLayout';

const RegisterPage: React.FC = () => {
  return (
    <PageLayout style={{ margin: '0', height: '100vh' }}>
      <RegisterForm />
    </PageLayout>
  );
};

export default RegisterPage;
