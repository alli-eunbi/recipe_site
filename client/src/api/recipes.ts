import axios from 'axios';
import Cookies from 'universal-cookie';

export const sendIngredientPhoto = (formData: FormData) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/`, formData);
};

export const fetchDetailInfo = (params: string | undefined) => {
  return axios.get(`http://localhost:3000/api/recipes/${params}`);
};

export const registerRecipe = (formData: FormData) => {
  const cookie = new Cookies().get('access_token');

  const header = axios.create({
    headers: {
      Authorization: cookie,
    },
  });
  return header.post(
    `${process.env.REACT_APP_BASE_URL}/recipe-board/register`,
    formData
  );
};

export const fetchWordSearchResult = (query: string | undefined) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/recipes/word/search?ing=${query}`
  );
};

export const fetchIngredientsFromImage = (formData: FormData) => {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/recipes/image/search`,
    formData
  );
};
