import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useQuery } from 'react-query';
import { sendKakaoAuthCode } from '../../api/user';
import { Navigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { useCookies } from 'react-cookie';

const KakaoRedirectPage: React.FC = () => {
  const [cookie, setCookie] = useCookies(['jwt']);
  const authCode = new URL(window.location.href).searchParams.get('code');

  const { data: token, isFetched } = useQuery('send-authCode', () =>
    sendKakaoAuthCode(authCode)
  );

  if (isFetched) {
    setCookie('jwt', token?.data.jwt);
    return <Navigate to='/' />;
  }

  return (
    <PageLayout>
      <LoadingSpinner />
    </PageLayout>
  );
};

export default KakaoRedirectPage;
