import {
  LOGIN,
  SIGNUP,
  SET_USER,
  AUTHENTICATE,
  LOGOUT,
  GET_BOOKING,
  BOOKING_NOW
} from '../actions/auth';

const initialState = {
  token: null,
  user: [],
  authenticated: false,
  userId: null,
  bookings: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN:
    //   return {
    //  ...state,
    //token: action.token
    //   };
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
    case GET_BOOKING:
      return {
        ...state,
        bookings: action.payload
      };
    case BOOKING_NOW:
      return {
        ...state,
        reservation: [action.payload, ...state.booking],
        loading: false
      };
    case SIGNUP:
    default:
      return state;
  }
};
