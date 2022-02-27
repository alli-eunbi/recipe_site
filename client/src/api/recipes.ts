import axios from 'axios';

export const sendIngredientPhoto = (formData: FormData) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/`, formData);
};

export const fetchDetailInfo = (params: string | undefined) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/recipes/${params}`);
};

export const registerRecipe = (formData: FormData) => {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/recipe-board/register`,
    formData
  );
};

export const fetchWordSearchResult = (query: string | undefined) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/recipes/word-search?ing=${query}`
  );
};
