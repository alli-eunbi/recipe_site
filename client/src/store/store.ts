import axios from 'axios';
import { atom, selector } from 'recoil';
import { formData } from '../components/search/PhotoSearchUploader';

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

export const filterAtom = atom({
  key: 'filterOptions',
  default: { kind: '페스코', method: '전체', occ: '전체' },
});

export const searchState = selector({
  key: 'asyncSearchState',
  get: async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/recipes/image-search`,
      formData
    );
    const data = response.data;
    return data;
  },
});
