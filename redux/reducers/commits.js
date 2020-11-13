const initialState = {
  commits: [],
  loading: false,
  error: null,
};

export default function commits(state = initialState, action) {
  switch (action.type) {
    case 'GET_COMMITS_REQUESTED':
      return {
        ...state,
        loading: true,
      };
    case 'GET_COMMITS_SUCCESS':
      return {
        ...state,
        loading: false,
        commits: action.commits,
      };
    case 'GET_COMMITS_FAILED':
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
