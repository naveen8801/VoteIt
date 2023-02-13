import { verifyUser } from '../api/api';

export const getUser = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await verifyUser();
      if (data) {
        await dispatch(setUser(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const setUser = (data) => {
  return {
    type: 'SET_USER',
    data,
  };
};
