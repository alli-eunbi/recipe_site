import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import Card from '../Card';
import Input from '../input/Input';
import Button from '../Button';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { LoggedInUser } from '../../store/store';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { logUserIn } from '../../api/user';

type Props = {
  type: string;
};

const LoginForm: React.FC<Props> = (props) => {
  const [userPW, setUserPW] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userInfo, setUserInfo] = useRecoilState(LoggedInUser);

  const navigate = useNavigate();

  const handleLoginIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPW(e.target.value);
  };

  const { data, refetch: authenticate } = useQuery(
    'login-user',
    () => logUserIn({ email: userEmail, password: userPW }),
    {
      enabled: false,
    }
  );

  const handleLoginSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    authenticate();
    if (data?.data.success) {
      localStorage.setItem('accessToken', data?.data.jwt);
      setUserInfo(userEmail);
      navigate('/');
    }
  };

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
        <Button style={{ width: '100%' }}>로그인</Button>
      </FormContainer>
      <p>회원이 아니신가요?</p>
      <Link to='/register'>회원가입 하기</Link>
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
