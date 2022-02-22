import React from 'react';
import LoginForm from '../components/form/LoginForm';
import RegisterForm from '../components/form/RegisterForm';
import Button from '../components/Button';
import { PageLayout } from '../components/layout/PageLayout';

const RegisterPage: React.FC = () => {
  return (
    <PageLayout style={{ margin: '0', height: '100vh' }}>
      <RegisterForm type='auth'></RegisterForm>
      {/* <LoginForm type='auth'>
        <Button>로그인 하기</Button>
      </LoginForm> */}
    </PageLayout>
  );
};

export default RegisterPage;
