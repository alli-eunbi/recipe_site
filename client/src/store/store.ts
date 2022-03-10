import axios from 'axios';
import { atom, selector } from 'recoil';
import { formData } from '../components/search/ImageSearchUploader';

export const LoggedInUser = atom({
  key: 'userNickname',
  default: '',
});

export const authState = atom({
  key: 'auth',
  default: false,
});

export const fileAtom = atom({
  key: 'file',
  default: new Blob(),
});

export const ingredientsState = atom({
  key: 'ingredients',
  default: [],
});

export const recipesState = atom<string[]>({
  key: 'recipes',
  default: [],
});

export const updateDataState = atom({
  key: 'updateDate',
  default: {},
});

export const pageState = atom({
  key: 'currentPage',
  default: 1,
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
