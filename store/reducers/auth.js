import { LOGIN, SIGNUP, SET_USER, AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  user: [],
  authenticated: false,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token
      };
    case LOGOUT:
      return initialState;
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId
      };
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.user
      };
    case SIGNUP:
    default:
      return state;
  }
};
