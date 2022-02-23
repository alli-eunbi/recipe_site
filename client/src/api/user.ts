import axios from 'axios';

export const checkDuplicateNickname = (nickname: string) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/user/check?nickname=${nickname}`
  );
};

export const registerUserInfo = (userRegInfo: {
  email: string;
  nickname: string;
  password1: string;
  password2: string;
}) => {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/register`,
    userRegInfo
  );
};

export const logUserIn = (userInfo: { email: string; password: string }) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, userInfo);
};

const REDIRECT_URI = 'http://localhost:3000/user/kakao/callback';
const HOST = 'https://kauth.kakao.com';

export const kakaoRequestUrl = `${HOST}/oauth/authorize?client_id=3bd9b6338c79bdbd5667f28d91127577&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const sendKakaoAuthCode = (authCode: string | null) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/user/callback/kakao?code=${authCode}`
  );
};

export const googleLogin = () => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/user/login/google`);
};
