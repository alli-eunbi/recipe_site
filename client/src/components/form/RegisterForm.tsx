import React, { ChangeEvent, useReducer, useState } from 'react';
import Card from '../Card';
import Input from '../input/Input';
import Button from '../Button';

type Props = {
  type: string;
};

const RegisterForm: React.FC<Props> = ({ type, children }) => {
  const initialState = {
    regEmail: '',
    regNickname: '',
    regPw: '',
    regPwChk: '',
  };
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'CHANGE_REGISTER_NICKNAME':
        return { ...state, regNickname: action.regNickname };
      case 'CHANGE_REGISTER_EMAIL':
        return { ...state, regEmail: action.regEmail };
      case 'CHANGE_REGISTER_PW':
        return { ...state, regPw: action.regPw };
      case 'CHANGE_REGISTER_PW_CHK':
        return { ...state, regPwChk: action.regPwChk };
      default:
        throw new Error('입력값이 정확하지 않습니다.');
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  const handleRegisterNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const enteredNickname = e.target.value;
    dispatch({
      type: 'CHANGE_REGISTER_NICKNAME',
      regNickname: enteredNickname,
    });
  };

  const handleRegisterEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const enteredEmail = e.target.value;
    dispatch({ type: 'CHANGE_REGISTER_EMAIL', regEmail: enteredEmail });
  };

  const handleRegisterPw = (e: ChangeEvent<HTMLInputElement>) => {
    const enteredPw = e.target.value;
    dispatch({ type: 'CHANGE_REGISTER_PW', regPw: enteredPw });
  };

  const handleRegisterPwChk = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const enteredPwChk = value;
    dispatch({ type: 'CHANGE_REGISTER_PW_CHK', regPwChk: enteredPwChk });
  };

  return (
    <Card type={type}>
      <h2>회원가입</h2>
      <hr />
      <form action=''>
        <label htmlFor='nickname'>
          <Input
            type='text'
            id='nickname'
            name='nickname'
            onChange={handleRegisterNickname}
            placeholder='닉네임을 입력해주세요'
          />
        </label>
        <label htmlFor='email'>
          <Input
            type='email'
            id='email'
            name='email'
            onChange={handleRegisterEmail}
            placeholder='이메일을 입력해주세요'
          />
        </label>
        <label htmlFor='password'>
          <Input
            type='password'
            id='password'
            name='password'
            onChange={handleRegisterPw}
            placeholder='비밀번호는 8자 이상 입력해주세요.'
          />
        </label>
        <label htmlFor='passwordChk'>
          <Input
            type='password'
            id='passwordChk'
            name='passwordChk'
            onChange={handleRegisterPwChk}
            placeholder='비밀번호를 다시 입력해주세요.'
          />
        </label>
        {children}
      </form>
    </Card>
  );
};

export default RegisterForm;
