const initialState = {
  user: null,
  isLogin: false,
  mainLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'LOGOUT':
      return { ...state, user: null, isLogin: false };
    case 'LOGIN':
      return { ...state, isLogin: true };
    case 'MAIN_LOADING':
      return { ...state, mainLoading: action.loading };
  }
};

export default reducer;
