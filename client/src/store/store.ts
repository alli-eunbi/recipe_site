import { atom } from 'recoil';

export const LoggedInUser = atom({
  key: 'userNickname',
  default: '',
});

export const authAtom = atom({
  key: 'auth',
  default: false,
});

export const searchAtom = atom({
  key: 'searchResult',
  default: [],
});
