import { atom, atomFamily } from 'recoil';

const selectedOptionState = atomFamily({
  key: 'optionState',
  default: (name) => {
    return {
      name: '',
      option: '',
      checked: false,
    };
  },
});

export const userLoginInfo = atom({
  key: 'user-info',
  default: {
    userId: '',
    userPw: '',
  },
});

export const authAtom = atom({
  key: 'auth',
  default: '',
});
