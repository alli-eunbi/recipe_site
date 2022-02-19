import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import Card from '../Card';
import Input from '../input/Input';
import Button from '../Button';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userLoginInfo } from '../../store/store';

type Props = {
  type: string;
  name: string;
};

const LoginForm: React.FC<Props> = (props, { children }) => {
  const [loginPassword, setLoginPassword] = useState('');
  const [loginId, setLoginId] = useState('');
  const [userInfo, setUserInfo] = useRecoilState(userLoginInfo);

  const handleLoginPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value);
  };
  const handleLoginIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
  };

  const handleLoginSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      ['userId']: loginId,
      ['userPw']: loginPassword,
    });
  };

  return (
    <Card type={props.type}>
      <h2>로그인이 필요합니다.</h2>
      <FormContainer onSubmit={handleLoginSubmit}>
        <label htmlFor='id'>
          <Input
            type='text'
            id='email'
            name='email'
            onChange={handleLoginIdChange}
            placeholder='ID를 입력해주세요.'
          />
        </label>
        <label htmlFor='password'>
          <Input
            type='password'
            id='password'
            name='password'
            onChange={handleLoginPasswordChange}
            placeholder='비밀번호를 입력해주세요.'
          />
        </label>
        <button>로그인</button>
        {children}
      </FormContainer>
    </Card>
  );
};

export default LoginForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
