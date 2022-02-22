import axios from 'axios';

export const checkDuplicateNickname = (nickname: string) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/user/check?nickname=${nickname}`
  );
};

export const sendUserRegInfo = (userRegInfo: {
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
