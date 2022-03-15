import React from 'react';
import LoadingSpinner from '../../components/ui/animation/LoadingSpinner';
import { useQuery } from 'react-query';
import { sendKakaoAuthCode } from '../../api/user';
import { Navigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import Cookies from 'universal-cookie';
import { authState } from '../../store/store';
import { useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';

const KakaoRedirectPage: React.FC = () => {
  const cookie = new Cookies();
  const setAuthenticated = useSetRecoilState(authState);

  const authCode = new URL(window.location.href).searchParams.get('code');

  const {
    data: token,
    isError,
    isSuccess,
  } = useQuery('send-authCode', () => sendKakaoAuthCode(authCode), {
    cacheTime: 0,
  });

  if (isError) {
    Swal.fire({
      text: '로그인에 실패했습니다.',
      confirmButtonText: '확인',
      confirmButtonColor: 'green',
    });
    return <Navigate to='/login' />;
  }

  if (isSuccess) {
    cookie.set('access_token', token?.data.jwt, {
      sameSite: 'none',
      secure: true,
    });

    setAuthenticated(true);
    return <Navigate to='/' />;
  }

  return (
    <PageLayout>
      <LoadingSpinner />
    </PageLayout>
  );
};

export default KakaoRedirectPage;
