import React from 'react';
import { kakaoRequestUrl } from '../../api/user';

const KakaoButton: React.FC = () => {
  return <a href={kakaoRequestUrl}>카카오 로그인</a>;
};

export default KakaoButton;
