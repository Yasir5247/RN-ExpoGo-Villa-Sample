import Constants from 'expo-constants';
import axios from 'axios';

export const client = axios.create({
  baseURL: Constants.expoConfig?.extra?.API_URL || 'https://api.example.com',
});
