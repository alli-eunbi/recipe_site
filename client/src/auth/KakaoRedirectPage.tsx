import React, { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useQuery } from 'react-query';
import { sendKakaoAuthCode } from '../api/user';
import { Navigate } from 'react-router-dom';
const KakaoRedirectPage: React.FC = () => {
  const authCode = new URL(window.location.href).searchParams.get('code');
  const {
    data: token,
    refetch,
    isFetched,
  } = useQuery('send-authCode', () => sendKakaoAuthCode(authCode));

  if (isFetched) {
    return <Navigate to='/' />;
  }

  return <LoadingSpinner />;
};

export default KakaoRedirectPage;
