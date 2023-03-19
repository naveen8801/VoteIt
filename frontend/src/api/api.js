import axios from 'axios';

const url =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';

export const server = axios.create({
  baseURL: url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `${
      localStorage.getItem('vote-it-token')
        ? 'Bearer ' + localStorage.getItem('vote-it-token')
        : ''
    }`,
  },
});

export const login = (data) => server.post(`${url}/api/v1/auth/login`, data);

export const register = (data) =>
  server.post(`${url}/api/v1/auth/register`, data);

export const verifyUser = () => server.get(`${url}/api/v1/auth/user`);
