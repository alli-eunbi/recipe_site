import React from 'react';
import LoginForm from '../components/form/LoginForm';
import RegisterForm from '../components/form/RegisterForm';

const AuthPage: React.FC = () => {
  return (
    <>
      <RegisterForm type='auth'>
        <button>회원가입하기</button>
      </RegisterForm>
      {/* <LoginForm type='auth'>
        <button>로그인 하기</button>
      </LoginForm>
      ; */}
    </>
  );
};

export default AuthPage;
