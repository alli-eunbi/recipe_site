import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import Card from '../Card';
import Input from '../input/Input';
import Button from '../button/Button';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoggedInUser } from '../../store/store';
import { authAtom } from '../../store/store';
import { useNavigate, Link } from 'react-router-dom';
import LottieLoader from 'react-lottie-loader';
import LoadingSpinner from '../../assets/lotties/walking-broccoli.json';
import { useQuery } from 'react-query';
import { logUserIn, googleLogin } from '../../api/user';
import GoogleLogin from 'react-google-login';
import { HighLight } from '../text/Highlight';
import GoogleButton from '../button/GoogleButton';
import KakaoButton from '../button/KakaoButton';

const LoginForm: React.FC = () => {
  const [userPW, setUserPW] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const setUserInfo = useSetRecoilState(LoggedInUser);
  const [authenticated, setAuthenticated] = useRecoilState(authAtom);

  const navigate = useNavigate();

  const handleLoginEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPW(e.target.value);
  };

  const {
    data,
    isLoading,
    isFetched,
    refetch: authenticate,
  } = useQuery(
    'login-user',
    () => logUserIn({ email: userEmail, password: userPW }),
    {
      enabled: false,
    }
  );

  const { data: googleAuthToken, refetch: googleUserLogin } = useQuery(
    'kakao-login',
    googleLogin,
    {
      enabled: false,
    }
  );

  const handleGoogleLogin = () => {
    googleUserLogin();
  };

  console.log(`${process.env.GOOGLE_CLIENT_ID}`);

  const handleLoginSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    authenticate();
    localStorage.setItem('accessToken', data?.data.jwt);
    setAuthenticated(true);
  };

  if (isLoading) return <LottieLoader animationData={LoadingSpinner} />;

  if (isFetched) {
    setUserInfo(userEmail);
    navigate('/');
  }
  return (
    <Card type='login'>
      <h2>로그인</h2>
      <hr style={{ width: '95%', margin: '0 auto' }} />
      <FormContainer onSubmit={handleLoginSubmit}>
        <label htmlFor='id'>
          <Input
            type='text'
            id='email'
            name='email'
            onChange={handleLoginEmailChange}
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
        <Button style={{ width: '100%' }}>로그인</Button>
      </FormContainer>
      <p style={{ color: 'grey' }}>소셜 계정으로 로그인</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <GoogleButton />
        <KakaoButton />
      </div>
      <LinkContainer style={{ display: 'flex' }}>
        <p>
          <HighLight>잠깐!</HighLight> 아직 회원이 아니신가요?
        </p>
        <StyledLink to='/register'>회원가입 하기</StyledLink>
      </LinkContainer>
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

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  color: black;
  text-align: center;
  background-color: #89c53f;
  border-radius: 4px;
  text-decoration: none;
  word-break: keep-all;
  padding: 0.5rem 0.5rem;
`;
