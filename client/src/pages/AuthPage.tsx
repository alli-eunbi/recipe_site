import React from 'react';
import LoginForm from '../components/form/LoginForm';
import RegisterForm from '../components/form/RegisterForm';
import Button from '../components/Button';

const AuthPage: React.FC = () => {
  return (
    <>
      <RegisterForm type='auth'></RegisterForm>
      {/* <LoginForm type='auth'>
        <button>로그인 하기</button>
      </LoginForm>
      ; */}
    </>
  );
};

export default AuthPage;
