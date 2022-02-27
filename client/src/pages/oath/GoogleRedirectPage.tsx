import LoadingSpinner from '../../components/LoadingSpinner';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { sendGoogleAuthCode } from '../../api/user';
import { useQuery } from 'react-query';
import { PageLayout } from '../../components/layout/PageLayout';
import { useCookies } from 'react-cookie';
import { authAtom } from '../../store/store';
import { useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';

const GoogleRedirectPage: React.FC = () => {
  const [cookie, setCookie] = useCookies(['access_token']);
  const setAuthenticated = useSetRecoilState(authAtom);

  const authCode = new URL(window.location.href).searchParams.get('code');

  const {
    data: token,
    isError,
    isSuccess,
  } = useQuery('send-authCode', () => sendGoogleAuthCode(authCode), {
    cacheTime: 0,
  });

  if (isError) {
    Swal.fire('로그인에 실패했습니다.');
    return <Navigate to='/login' />;
  }

  if (isSuccess) {
    setCookie('access_token', `Bearer ${token?.data.jwt}`);
    setAuthenticated(true);
    return <Navigate to='/' />;
  }

  return (
    <PageLayout>
      <LoadingSpinner />
    </PageLayout>
  );
};
export default GoogleRedirectPage;
