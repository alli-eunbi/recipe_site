import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import Card from '../Card';
import Input from '../input/Input';
import Button from '../button/Button';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoggedInUser, authAtom } from '../../store/store';
import { Link, Navigate } from 'react-router-dom';
import LottieLoader from 'react-lottie-loader';
import LoadingSpinner from '../../assets/lotties/walking-broccoli.json';
import { useQuery } from 'react-query';
import { logUserIn } from '../../api/user';
import { HighLight } from '../text/Highlight';
import GoogleButton from '../button/GoogleButton';
import KakaoButton from '../button/KakaoButton';
import { useCookies } from 'react-cookie';

const LoginForm: React.FC = () => {
  const [userPW, setUserPW] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const setUserInfo = useSetRecoilState(LoggedInUser);
  const [authenticated, setAuthenticated] = useRecoilState(authAtom);
  const [cookie, setCookie] = useCookies(['jwt']);

  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);

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
    }
  );

  const handleLoginSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    /* email 과 password 입력했을 떄에만 서버에 인증요청 보냄 */
    if (userEmail && userPW) {
      authenticate();
    }
  };

  if (isLoading) return <LottieLoader animationData={LoadingSpinner} />;

  /* 데이터를 가져오고 로그인 성공 시, userEmail 저장  authenticated 처리 */
  if (isFetched && data?.data.success) {
    setCookie('jwt', data.data.jwt);
    setUserInfo(userEmail);
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
            name='email'
            onChange={handleLoginEmailChange}
            placeholder='이메일을 입력해주세요.'
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
        {data?.data.success === false && (
          <HighLight>{data?.data.message}</HighLight>
        )}
        <Button style={{ width: '100%', height: '3rem' }}>로그인</Button>
      </FormContainer>
      <LinkContainer style={{ display: 'flex' }}>
        <Warning>
          <HighLight>잠깐!</HighLight> 아직 회원이 아니신가요?
        </Warning>
        <StyledLink to='/register'>회원가입 하기</StyledLink>
      </LinkContainer>
      <SocialLoginSection>
        <p>소셜 계정으로 로그인</p>
        <div>
          <GoogleButton />
          <KakaoButton />
        </div>
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

const StyledLink = styled(Link)`
  color: black;
  text-align: center;
  background-color: #89c53f;
  border-radius: 4px;
  text-decoration: none;
  word-break: keep-all;
  padding: 0.5rem 0.5rem;
`;
