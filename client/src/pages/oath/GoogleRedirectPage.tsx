import LoadingSpinner from '../../components/LoadingSpinner';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { sendGoogleAuthCode } from '../../api/user';
import { useQuery } from 'react-query';
import { PageLayout } from '../../components/layout/PageLayout';
import { useCookies } from 'react-cookie';
import { authAtom } from '../../store/store';
import { useSetRecoilState } from 'recoil';

const GoogleRedirectPage: React.FC = () => {
  const [cookie, setCookie] = useCookies(['jwt']);
  const setAuthenticated = useSetRecoilState(authAtom);

  const authCode = new URL(window.location.href).searchParams.get('code');

  const { data: token, isFetched } = useQuery(
    'send-authCode',
    () => sendGoogleAuthCode(authCode),
    {
      cacheTime: 0,
    }
  );

  if (isFetched) {
    setCookie('jwt', token?.data.jwt);
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
