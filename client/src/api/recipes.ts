import axios from 'axios';

export const sendIngredientPhoto = (formData: any) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/`, formData);
};
