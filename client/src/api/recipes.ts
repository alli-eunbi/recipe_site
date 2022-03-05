import axios from 'axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies().get('access_token');

export const sendIngredientPhoto = (formData: FormData) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/`, formData);
};

export const fetchDetailInfo = (params: string | undefined) => {
  return axios.get(`http://localhost:3000/api/recipes/${params}`);
};

export const registerRecipe = (formData: FormData) => {
  const header = axios.create({
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return header.post(
    `${process.env.REACT_APP_BASE_URL}/recipe-board/register`,
    formData
  );
};

export const deleteRecipe = (params: string | undefined) => {
  const header = axios.create({
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });

  return header.delete(
    `http://localhost:3000/api/recipe-board/delete/${params}`
  );
};

export const fetchWordSearchResult = (query: string | undefined) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/recipes/word/search?ing=${query}`
  );
};

export const updateRecipe = (params: string | undefined) => {
  const header = axios.create({
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return header.get(`http://localhost:3000/api/recipe-board/update/${params}`);
};

export const fetchIngredientsFromImage = (formData: FormData) => {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/ingredients/image/search`,
    formData
  );
};

export const fetchImageSearchResult = (query: string) => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/recipes/image/additional-search?ing=${query}`
  );
};
