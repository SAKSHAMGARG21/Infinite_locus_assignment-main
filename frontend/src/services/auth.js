// src/services/auth.js
import axios from '../utils/axios.js';

export const register = async (data) => {
  const res = await axios.post('/auth/register', data);
  // Return user and token in a consistent format
  return { ...res.data.user, token: res.data.token };
};
export const login = async (data) => {
  const res = await axios.post('/auth/login', data);
  // Return user and token in a consistent format
  return { ...res.data.user, token: res.data.token };
};
