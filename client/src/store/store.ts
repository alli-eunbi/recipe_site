import { atom } from 'recoil';

export const LoggedInUser = atom({
  key: 'userNickname',
  default: '',
});

export const authAtom = atom({
  key: 'auth',
  default: false,
});

export const fileAtom = atom({
  key: 'file',
  default: new Blob(),
});

export const searchAtom = atom({
  key: 'searchResult',
  default: { ingredients: [], recipes: [] },
});
