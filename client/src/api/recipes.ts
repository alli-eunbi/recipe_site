import axios from 'axios';

export const sendIngredientPhoto = (formData: FormData) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/`, formData);
};

export const fetchDetailInfo = (params: string | undefined) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/recipes/${params}`);
};
