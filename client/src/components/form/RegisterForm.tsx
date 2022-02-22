import React, { ChangeEvent, FormEvent, useReducer, useState } from 'react';
import Card from '../Card';
import Input from '../input/Input';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { checkDuplicateNickname, sendUserRegInfo } from '../../api/userRegInfo';
import { useQuery } from 'react-query';

import useRegisterInput from '../../hooks/useRegisterInput';
import e from 'express';
import { useRef } from 'react';

type Props = {
  type: string;
};

const RegisterForm: React.FC<Props> = ({ type, children }) => {
  const nicknamePWCheck = /^[a-zA-Z0-9]{4,12}$/;
  const emailCheck =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const [PWCheck, setPWCheck] = useState('');

  const {
    value: userNickname,
    isInputValid: isNicknameValid,
    hasError: nickNameHasError,
    handleValueChange: handleNicknameChange,
    handleInputBlur: handleNicknameBlur,
    handleReset: handleResetNickname,
  } = useRegisterInput((value) => nicknamePWCheck.test(value));

  const {
    value: userEmail,
    isInputValid: isEmailValid,
    hasError: emailHasError,
    handleValueChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    handleReset: handleResetEmail,
  } = useRegisterInput((value) => emailCheck.test(value));

  const {
    value: userPW,
    isInputValid: isPWValid,
    hasError: PWHasError,
    handleValueChange: handlePWChange,
    handleInputBlur: handlePWBlur,
    handleReset: handleResetPW,
  } = useRegisterInput((value) => nicknamePWCheck.test(value));

  const { data, refetch } = useQuery(
    'user-register',
    () =>
      sendUserRegInfo({
        email: userEmail,
        nickname: userNickname,
        password1: userPW,
        password2: PWCheck,
      }),
    {
      enabled: false,
    }
  );

  const { data: nicknameData, refetch: fetchMessage } = useQuery(
    'check-nickname',
    () => checkDuplicateNickname(userNickname),
    {
      enabled: false,
    }
  );

  let isFormValid = false;
  const isPWIdentical = userPW !== '' && userPW === PWCheck;

  if (isNicknameValid && isEmailValid && isPWValid && isPWIdentical) {
    isFormValid = true;
  }

  const handleCheckNickname = () => {
    fetchMessage();
    console.log(nicknameData?.data.message);
  };

  const handlePWCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setPWCheck(e.target.value);
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();

    refetch();

    console.log(data?.data);

    handleResetNickname();
    handleResetEmail();
    handleResetPW();
    setPWCheck('');
  };

  return (
    <Card type={type}>
      <h2>회원가입</h2>
      <hr style={{ width: '95%', margin: '1rem auto' }} />
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleRegister}
        action='submit'
      >
        <label htmlFor='nickname'>
          <Input
            type='text'
            id='nickname'
            name='nickname'
            value={userNickname}
            onChange={handleNicknameChange}
            onBlur={handleNicknameBlur}
            placeholder='닉네임을 입력해주세요'
          />
        </label>
        <button onClick={handleCheckNickname}>중복확인</button>
        {nicknameData?.data && <p>{nicknameData.data.message}</p>}
        <label htmlFor='email'>
          <Input
            type='email'
            id='email'
            name='email'
            value={userEmail}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder='이메일을 입력해주세요'
          />
        </label>
        {emailHasError ? (
          <p style={{ color: 'darkred' }}>사용 불가능한 이메일입니다.</p>
        ) : isEmailValid ? (
          <p style={{ color: 'green' }}>올바른 이메일 형식입니다.</p>
        ) : (
          <br />
        )}
        <label htmlFor='password'>
          <Input
            type='password'
            id='password'
            name='password'
            value={userPW}
            onChange={handlePWChange}
            onBlur={handlePWBlur}
            placeholder='비밀번호는 8자 이상 입력해주세요.'
          />
        </label>
        {PWHasError ? (
          <p style={{ color: 'darkred' }}>사용 불가능한 비밀번호입니다.</p>
        ) : isPWValid ? (
          <p style={{ color: 'green' }}>올바른 비밀번호 형식입니다.</p>
        ) : (
          <br />
        )}

        <label htmlFor='passwordChk'>
          <Input
            type='password'
            id='passwordChk'
            name='passwordChk'
            value={PWCheck}
            onChange={handlePWCheck}
            placeholder='비밀번호를 다시 입력해주세요.'
          />
          {isPWIdentical && (
            <p style={{ color: 'green' }}>비밀번호가 일치합니다.</p>
          )}
        </label>
        <Button disabled={!isFormValid}>회원가입</Button>
      </form>
    </Card>
  );
};

export default RegisterForm;
