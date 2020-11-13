const initialState = {
  user: null,
  fetching: true,
  error: null,
};

export default function token(state = initialState, action) {
  switch (action.type) {
    case 'GET_TOKEN_REQUESTED':
      return {
        ...state,
        fetching: true,
      };
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        user: action.user,
        fetching: false,
      };
    case 'GET_USER_FAILED':
      return {
        ...state,
        error: action.message,
        fetching: false,
      };
    case 'GET_TOKEN_FAILED':
      return {
        ...state,
        error: action.message,
        fetching: false,
      };
    default:
      return state;
  }
}
