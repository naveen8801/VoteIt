import axios from 'axios';

const url = 'http://localhost:5000';

export const server = axios.create({
  baseURL: url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const login = (data) => server.post(`${url}/api/v1/auth/login`, data);

export const register = (data) =>
  server.post(`${url}/api/v1/auth/register`, data);
