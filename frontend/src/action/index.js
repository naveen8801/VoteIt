import { verifyUser } from '../api/api';

export const getUser = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await verifyUser();
      if (data?.data) {
        await dispatch(setUser(data?.data));
        await dispatch(setLogin());
      }
    } catch (err) {
      console.log(err);
      await dispatch(setLogout());
    }
  };
};

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user,
  };
};

export const setLogin = () => {
  return {
    type: 'LOGIN',
  };
};

export const setLogout = () => {
  return {
    type: 'LOGOUT',
  };
};
