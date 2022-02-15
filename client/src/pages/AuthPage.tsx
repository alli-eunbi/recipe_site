import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import FormInput from '../components/Input/FormInput';

const AuthPage = () => {
  return (
    <Card type='auth'>
      <label htmlFor='id'>
        <FormInput type='text' id='id' placeholder='ID를 입력해주세요' />
      </label>
      <label htmlFor='password'>
        <FormInput
          type='text'
          id='password'
          placeholder='비밀번호를 입력해주세요'
        />
      </label>
      <Button>로그인</Button>
    </Card>
  );
};

export default AuthPage;
