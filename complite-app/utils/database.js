import axios from 'axios';
import { parseQueryParams } from 'expo-router/build/fork/getStateFromPath-forks';

const baseUrl = 'http://10.0.2.2:8000';

export const loginUser = async (username, password) => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/api/login',{username, password}, {headers: {"content-type" : "application/json"}, });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response?.data || error.message;
    }
};