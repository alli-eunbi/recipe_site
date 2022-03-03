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
  /* 닉네임 형식 4~12 자리 숫자, 알파벳 대소문자 구분없이 허용 */
  const nicknameCheck = /^[a-zA-Z0-9]{4,12}$/;
  /* 이메일 확인용 정규식 */
  const emailCheck =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  /* 패스워드 확인용 정규식 영어 대소문자, 숫자, 특수문자($@$!%*?&) 8자 이상 체크 */
  const PWCheck =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

  /* 비밀번호 확인 저장 */
  const [PWValidCheck, setPWValidCheck] = useState('');

  /* 닉네임 확인 버튼 누름 여부 확인 */
  const [nicknameBtnTouched, setNicknameBtnTouched] = useState(false);

  const navigate = useNavigate();

  /* 닉네임 훅 */
  const {
    value: userNickname,
    handleValueChange: handleNicknameChange,
    handleInputBlur: handleNicknameBlur,
    handleReset: handleResetNickname,
  } = useRegisterInput((value) => nicknameCheck.test(value));

  /* 이메일 훅 */
  const {
    value: userEmail,
    isInputValid: isEmailValid,
    hasError: emailHasError,
    handleValueChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    handleReset: handleResetEmail,
  } = useRegisterInput((value) => emailCheck.test(value));

  /* 비밀번호 훅 */
  const {
    value: userPW,
    isInputValid: isPWValid,
    hasError: PWHasError,
    handleValueChange: handlePWChange,
    handleInputBlur: handlePWBlur,
    handleReset: handleResetPW,
  } = useRegisterInput((value) => PWCheck.test(value));

  /* 회원가입 요청 */
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

  /* 닉네임 중복 확인 요청 */
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
      Swal.fire(data?.data.message);
      navigate('/login');
    }
  }, [data?.data]);

  console.log(data?.data);

  return (
    <Card type='register'>
      <RegisterFormHeader>
        <h2>회원가입</h2>
        <hr />
      </RegisterFormHeader>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
        }}
        onSubmit={handleRegister}
        action='submit'
      >
        <div>
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
        </div>
        {nicknameData?.data.success ? (
          <ConfirmMessage>{nicknameData.data.message}</ConfirmMessage>
        ) : nicknameInvalid ? (
          <ErrorMessage>{nicknameData.data.message}</ErrorMessage>
        ) : data?.data.success === false ? (
          <ErrorMessage>{data.data.message}</ErrorMessage>
        ) : null}
        <label htmlFor='email'>
          <Input
            type='email'
            id='email'
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
            name='password'
            error={PWHasError}
            value={userPW}
            onChange={handlePWChange}
            onBlur={handlePWBlur}
            placeholder='대문자, 특수문자 포함, 8자 이상 입력해주세요.'
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
        <Button style={{ height: '3rem' }} disabled={!isFormValid}>
          회원가입
        </Button>
      </form>
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

const ErrorMessage = styled.p`
  color: darkred;
`;

const ConfirmMessage = styled.p`
  color: green;
`;

const ConfirmButton = styled.button`
  color: white;
  font-size: 1rem;
  padding: 0.9rem 0.2rem;
  background-color: green;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  transition: 200ms ease-in-out;

  &:hover {
    background-color: darkgreen;
  }
`;
