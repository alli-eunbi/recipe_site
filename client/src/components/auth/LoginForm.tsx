import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoggedInUser, authState } from '../../store/store';
import { Link, Navigate } from 'react-router-dom';
import LottieLoader from 'react-lottie-loader';
import LoadingSpinner from '../../assets/lotties/walking-broccoli.json';
import { useQuery } from 'react-query';
import { logUserIn } from '../../api/user';
import { HighLight } from '../text/Highlight';
import GoogleButton from '../ui/button/GoogleButton';
import KakaoButton from '../ui/button/KakaoButton';
import Cookies from 'universal-cookie';

const LoginForm: React.FC = () => {
  const [userPW, setUserPW] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [authenticated, setAuthenticated] = useRecoilState(authState);
  const cookie = new Cookies();

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
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  const handleLoginSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (userEmail && userPW) {
      authenticate();
    }
  };

  if (isLoading) return <LottieLoader animationData={LoadingSpinner} />;

  if (isFetched && data?.data.success) {
    cookie.set('access_token', data.data.jwt);
    setAuthenticated(true);
  }

  if (authenticated) return <Navigate to='/' />;

  return (
    <Card type='login'>
      <LoginFormHeader>
        <h2>로그인</h2>
        <hr />
      </LoginFormHeader>
      <FormContainer onSubmit={handleLoginSubmit}>
        <label htmlFor='id'>
          <Input
            type='text'
            id='email'
            className='login-input'
            name='email'
            onChange={handleLoginEmailChange}
            placeholder='이메일을 입력해주세요.'
          />
        </label>
        <label htmlFor='password'>
          <Input
            type='password'
            id='password'
            className='login-input'
            name='password'
            onChange={handleLoginPasswordChange}
            placeholder='비밀번호를 입력해주세요.'
          />
        </label>
        <Button className='submit-login'>로그인</Button>
        {data?.data.success === false && (
          <HighLight>{data?.data.message}</HighLight>
        )}
      </FormContainer>
      <LinkContainer>
        <Warning>
          <HighLight>잠깐!</HighLight> 아직 회원이 아니신가요?
        </Warning>
        <StyledLink to='/register'>회원가입 하기</StyledLink>
      </LinkContainer>
      <SocialLoginSection>
        <p>소셜 계정으로 로그인</p>
        <SocialLoginBtnWrapper>
          <GoogleButton />
          <KakaoButton />
        </SocialLoginBtnWrapper>
      </SocialLoginSection>
    </Card>
  );
};

export default React.memo(LoginForm);

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 12rem;
`;

const LoginFormHeader = styled.header`
  width: 100%;

  & > h2 {
    text-align: center;
    margin: 1rem auto;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Warning = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const SocialLoginSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: grey;
    margin-bottom: 0.5rem;
  }

  > div {
    display: flex;
  }
`;

const SocialLoginBtnWrapper = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  > a {
    margin: 0 0.5rem;
    transition: 200ms ease-in-out;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-align: center;
  background-color: #3fbb70;
  border-radius: 4px;
  text-decoration: none;
  word-break: keep-all;
  padding: 1rem 0.5rem;
  width: 13rem;
  transition: 200ms ease-in-out;

  &:hover {
    background-color: green;
  }
`;
