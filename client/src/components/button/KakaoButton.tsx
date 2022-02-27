import React from 'react';
import styled from 'styled-components';
import { kakaoRequestUrl } from '../../api/user';

const KakaoButton: React.FC = () => {
  return (
    <a href={kakaoRequestUrl}>
      <img src='images/kakao_login.png' alt='kakao-login' />
    </a>
  );
};

export default KakaoButton;
