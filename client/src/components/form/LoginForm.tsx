import React from 'react';
import Card from '../Card';
import FormInput from '../input/Input';
import Button from '../Button';

type FormType = {
  type: string;
};

const LoginForm: React.FC<FormType> = (props) => {
  return (
    <Card type={props.type}>
      <h2>로그인이 필요합니다.</h2>
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

export default LoginForm;
