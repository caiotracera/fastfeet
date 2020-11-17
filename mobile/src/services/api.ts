import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.25.27:3333',
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const token = AsyncStorage.getItem('@FastFeet:token');
    if (error.response.status === 401 && token) {
      console.log(error);
    }
    return Promise.reject(error);
  },
);

export default api;
