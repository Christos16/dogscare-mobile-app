import { GET_SITTERS, GET_SITTER, BOOK_SITTER } from '../actions/sitters';

const initialState = {
  sittersProfile: [],
  sitter: {},
  reservation: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SITTERS: {
      return {
        ...state,
        sittersProfile: action.sitters
      };
    }
    case GET_SITTER: {
      return {
        ...state,
        sitter: action.sitter
      };
    }
    case BOOK_SITTER: {
      return {
        ...state,
        reservation: [action.reservation]
      };
    }
  }
  return state;
};
