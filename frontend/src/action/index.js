import { verifyUser } from '../api/api';

export const getUser = () => {
  return async (dispatch, getState) => {
    dispatch(setMainLoading(true));
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
    dispatch(setMainLoading(false));
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
  if (localStorage.getItem('vote-it-token')) {
    localStorage.removeItem('vote-it-token');
  }
  return {
    type: 'LOGOUT',
  };
};

export const setMainLoading = (loading) => {
  return {
    type: 'MAIN_LOADING',
    loading,
  };
};
