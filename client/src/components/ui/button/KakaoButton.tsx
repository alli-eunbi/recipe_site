import React from 'react';
import { kakaoRequestUrl } from '../../../api/user';

const KakaoButton: React.FC = () => {
  return (
    <a href={kakaoRequestUrl}>
      <img src='/images/oath/kakao_login.png' alt='kakao-login' />
    </a>
  );
};

export default KakaoButton;
