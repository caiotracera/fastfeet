import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.25.28:3333',
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const refresh_token = await AsyncStorage.getItem('@FastFeet:token');
    const user = await AsyncStorage.getItem('@FastFeet:user');

    if (user) {
      const parsedUser = JSON.parse(user);

      if (
        error.response.status === 401 &&
        refresh_token &&
        parsedUser.remember
      ) {
        const response = await axios.put('sessions', {
          grant_type: 'refresh_token',
          refresh_token,
        });

        const { token } = response.data;
        await AsyncStorage.setItem('@FastFeet:token', token);

        return Promise.resolve();
      }
    }
    return Promise.reject(error);
  },
);

export default api;
