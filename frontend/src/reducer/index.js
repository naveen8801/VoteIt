const initialState = {
  user: null,
  isLogin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'LOGOUT':
      return { ...state, user: null, isLogin: false };
    case 'LOGIN':
      return { ...state, isLogin: true };
  }
};

export default reducer;
