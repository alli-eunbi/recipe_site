import React, {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import Card from '../ui/Card';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import { checkDuplicateNickname, registerUserInfo } from '../../api/user';
import { useQuery } from 'react-query';
import useRegisterInput from '../../hooks/useRegisterInput';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const RegisterForm: React.FC = () => {
  const nicknameCheck = /^[a-zA-Z0-9]{4,12}$/;
  const emailCheck =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const PWCheck =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

  const [PWValidCheck, setPWValidCheck] = useState('');

  const [nicknameBtnTouched, setNicknameBtnTouched] = useState(false);

  const navigate = useNavigate();

  const {
    value: userNickname,
    handleValueChange: handleNicknameChange,
    handleInputBlur: handleNicknameBlur,
    handleReset: handleResetNickname,
  } = useRegisterInput((value) => nicknameCheck.test(value));

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
  } = useRegisterInput((value) => PWCheck.test(value));

  const { data, refetch: registerUser } = useQuery(
    'user-register',
    () =>
      registerUserInfo({
        email: userEmail,
        nickname: userNickname,
        password1: userPW,
        password2: PWValidCheck,
      }),
    {
      enabled: false,
      cacheTime: 0,
      refetchOnMount: false,
      retryOnMount: false,
      keepPreviousData: false,
    }
  );

  const { data: nicknameData, refetch: validateNickname } = useQuery(
    'check-nickname',
    () => checkDuplicateNickname(userNickname),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      refetchOnMount: false,
      retryOnMount: false,
      keepPreviousData: false,
    }
  );

  const isPWIdentical = userPW !== '' && userPW === PWValidCheck;

  const nicknameInvalid =
    nicknameData?.data.success === false && nicknameBtnTouched;

  const PWCheckInvalid = !isPWIdentical && PWValidCheck !== '';

  let isFormValid = false;

  if (
    nicknameData?.data.success &&
    isEmailValid &&
    isPWValid &&
    isPWIdentical
  ) {
    isFormValid = true;
  }

  const handleCheckNickname: MouseEventHandler = (e) => {
    e.preventDefault();
    setNicknameBtnTouched(true);
    validateNickname();
  };

  const handlePWCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setPWValidCheck(e.target.value);
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    registerUser();

    handleResetNickname();
    handleResetEmail();
    handleResetPW();
    setPWValidCheck('');
  };

  useEffect(() => {
    if (data?.data.success) {
      navigate('/login');
      Swal.fire({
        text: data?.data.message,
        confirmButtonText: '확인',
        confirmButtonColor: 'green',
      });
    }
  }, [data?.data]);

  return (
    <Card type='register'>
      <RegisterFormHeader>
        <h2>회원가입</h2>
        <hr />
      </RegisterFormHeader>
      <RegisterFormBody onSubmit={handleRegister} action='submit'>
        <NickNameInputWrapper>
          <label htmlFor='nickname'>
            <Input
              type='text'
              id='nickname'
              name='nickname'
              className='nickname'
              error={nicknameInvalid}
              value={userNickname}
              onChange={handleNicknameChange}
              onBlur={handleNicknameBlur}
              placeholder='닉네임을 입력해주세요.'
            />
          </label>
          <ConfirmButton onClick={handleCheckNickname}>중복확인</ConfirmButton>
        </NickNameInputWrapper>
        {nicknameData?.data.success ? (
          <ConfirmMessage>{nicknameData.data.message}</ConfirmMessage>
        ) : nicknameInvalid ? (
          <ErrorMessage>{nicknameData.data.message}</ErrorMessage>
        ) : null}
        <label htmlFor='email'>
          <Input
            type='email'
            id='email'
            className='register-input'
            name='email'
            error={emailHasError}
            value={userEmail}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder='이메일을 입력해주세요.'
          />
        </label>
        {emailHasError ? (
          <ErrorMessage>사용 불가능한 이메일입니다.</ErrorMessage>
        ) : isEmailValid ? (
          <ConfirmMessage>올바른 이메일 형식입니다.</ConfirmMessage>
        ) : null}
        <label htmlFor='password'>
          <Input
            type='password'
            id='password'
            className='register-input'
            name='password'
            error={PWHasError}
            value={userPW}
            onChange={handlePWChange}
            onBlur={handlePWBlur}
            placeholder='대문자, 특수문자 포함, 8자 이상'
          />
        </label>
        {PWHasError ? (
          <ErrorMessage>사용 불가능한 비밀번호입니다.</ErrorMessage>
        ) : isPWValid ? (
          <ConfirmMessage>올바른 비밀번호 형식입니다.</ConfirmMessage>
        ) : (
          <p>특수문자, 대문자, 최소 8자리 이상 입력해주세요.</p>
        )}

        <label htmlFor='passwordChk'>
          <Input
            type='password'
            id='passwordChk'
            className='register-input'
            name='passwordChk'
            error={PWCheckInvalid}
            value={PWValidCheck}
            onChange={handlePWCheck}
            placeholder='비밀번호를 다시 입력해주세요.'
          />
          {isPWIdentical ? (
            <ConfirmMessage>비밀번호가 일치합니다.</ConfirmMessage>
          ) : PWCheckInvalid ? (
            <ErrorMessage>비밀번호가 다릅니다.</ErrorMessage>
          ) : null}
        </label>
        <Button className='submit-register' disabled={!isFormValid}>
          회원가입
        </Button>
        {data?.data.success === false && (
          <ErrorMessage>{data.data.message}</ErrorMessage>
        )}
      </RegisterFormBody>
    </Card>
  );
};

export default RegisterForm;

const RegisterFormHeader = styled.header`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  > hr {
    width: 95%;
  }

  > h2 {
    text-align: center;
    margin: 1rem auto;
  }
`;

const RegisterFormBody = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const ErrorMessage = styled.p`
  color: darkred;
  text-align: center;
`;

const ConfirmMessage = styled.p`
  color: green;
  text-align: center;
`;

const ConfirmButton = styled.button`
  color: white;
  font-size: 1rem;
  padding: 0.9rem 0.2rem;
  background-color: #3fbb70;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  transition: 200ms ease-in-out;

  &:hover {
    background-color: darkgreen;
  }
`;

const NickNameInputWrapper = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
