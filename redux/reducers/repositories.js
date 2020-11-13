const initialState = {
  repositories: [],
  user: null,
  loading: false,
  error: null,
  fetching: false,
};

export default function repositories(state = initialState, action) {
  switch (action.type) {
    case 'GET_REPOSITORIES_REQUESTED':
      return {
        ...state,
        loading: true,
      };
    case 'GET_REPOSITORIES_SUCCESS':
      return {
        ...state,
        loading: false,
        repositories: action.repositories,
      };
    case 'GET_REPOSITORIES_FAILED':
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
