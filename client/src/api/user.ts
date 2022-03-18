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

const KAKAO_REDIRECT_URI =
  'http://elice-kdt-ai-3rd-team08.elicecoding.com/user/kakao/callback';
const HOST = 'https://kauth.kakao.com';
const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

export const kakaoRequestUrl = `${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export const sendKakaoAuthCode = (authCode: string | null) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/user/callback/kakao?code=${authCode}`,
    { withCredentials: true }
  );
};

const GOOGLE_REDIRECT_URI =
  'https://elice-kdt-ai-3rd-team08.elicecoding.com/user/google/callback';
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_KEY;
const SCOPE = 'openid%20profile%20email';

export const googleRequestUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=${SCOPE}&response_type=code`;

export const sendGoogleAuthCode = (authCode: string | null) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/user/callback/google?code=${authCode}`
  );
};
