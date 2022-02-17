import axios from 'axios';

export const testRequest = () => {
  return axios.get('localhost:5000/check');
};
