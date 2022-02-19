import React, { ChangeEvent, useReducer, useState } from 'react';
import useValidate from '../../hooks/useValidate';
import Card from '../Card';
import Input from '../input/Input';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

type Props = {
  type: string;
};

const initialState = {
  userEmail: { regEmail: '', isEmailValid: false },
  userNickname: { regNickname: '', isNicknameValid: false },
  userPw: { regPw: '', isPwValid: false },
  userPwChk: { regPwChk: '', isPwValid: false },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_REGISTER_NICKNAME':
      return {
        ...state,
        userNickname: {
          ...state.userNickname,
          regNickname: action.regNickname,
        },
      };

    case 'VALID_NICKNAME':
      return {
        ...state,
        userNickname: {
          ...state.userNickname,
          isNicknameValid: true,
        },
      };

    case 'CHANGE_REGISTER_EMAIL':
      return {
        ...state,
        userEmail: { ...state.userEmail, regEmail: action.regEmail },
      };

    case 'VALID_EMAIL':
      return {
        ...state,
        userEmail: {
          ...state.userEmail,
          isEmailValid: true,
        },
      };

    case 'CHANGE_REGISTER_PW':
      return { ...state, userPw: { ...state.userPw, regPw: action.regPw } };

    case 'VALID_PW':
      return { ...state, userPw: { ...state.userPw, isPwValid: true } };

    case 'CHANGE_REGISTER_PW_CHK':
      return {
        ...state,
        userPwChk: { ...state.userPwChk, regPwChk: action.regPwChk },
      };
    default:
      throw new Error('입력값이 정확하지 않습니다.');
  }
};

const RegisterForm: React.FC<Props> = ({ type, children }) => {
  const nicknamePWCheck = /^[a-zA-Z0-9]{4,12}$/;
  const emailCheck =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRegisterNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const validNickname = nicknamePWCheck.test(e.target.value);
    if (validNickname) {
      dispatch({ type: 'VALID_NICKNAME', isNicknameValid: true });
      const enteredNickname = e.target.value;
      dispatch({
        type: 'CHANGE_REGISTER_NICKNAME',
        regNickname: enteredNickname,
      });
    } else {
      dispatch({ type: 'VALID_NICKNAME', isNicknameValid: false });
    }
  };

  const handleRegisterEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const validEmail = emailCheck.test(e.target.value);
    if (validEmail) {
      dispatch({ type: 'VALID_EMAIL', isEmailValid: true });
      const enteredEmail = e.target.value;
      dispatch({
        type: 'CHANGE_REGISTER_EMAIL',
        regEmail: enteredEmail,
      });
    }
  };

  const handleRegisterPw = (e: ChangeEvent<HTMLInputElement>) => {
    const validPw = nicknamePWCheck.test(e.target.value);
    if (validPw) {
      dispatch({ type: 'VALID_PW', isPwValid: true });
      const enteredPw = e.target.value;
      dispatch({ type: 'CHANGE_REGISTER_PW', regPw: enteredPw });
    } else {
      dispatch({ type: 'VALID_PW', isPwValid: false });
    }
  };

  const handleRegisterPwChk = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const enteredPwChk = value;
    dispatch({ type: 'CHANGE_REGISTER_PW_CHK', regPwChk: enteredPwChk });
  };
  const handleRegister = () => {
    navigate('/');
  };

  return (
    <Card type={type}>
      <h2>회원가입</h2>
      <hr />
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleRegister}
        action=''
      >
        <label htmlFor='nickname'>
          <Input
            type='text'
            id='nickname'
            name='nickname'
            onChange={handleRegisterNickname}
            placeholder='닉네임을 입력해주세요'
          />
        </label>
        {state.userNickname['isNicknameValid'] ? (
          <p style={{ color: 'green' }}>사용 가능한 닉네임입니다.</p>
        ) : (
          <p>올바르지 않은 닉네임입니다.</p>
        )}
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
        <Button>회원가입</Button>
      </form>
    </Card>
  );
};

export default RegisterForm;
