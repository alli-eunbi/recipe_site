import LoadingSpinner from '../../components/LoadingSpinner';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { sendGoogleAuthCode } from '../../api/user';
import { useQuery } from 'react-query';
import { PageLayout } from '../../components/layout/PageLayout';
import { useCookies } from 'react-cookie';

const GoogleRedirectPage: React.FC = () => {
  const [cookie, setCookie] = useCookies(['jwt']);
  const authCode = new URL(window.location.href).searchParams.get('code');

  const { data: token, isFetched } = useQuery('send-authCode', () =>
    sendGoogleAuthCode(authCode)
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
export default GoogleRedirectPage;
