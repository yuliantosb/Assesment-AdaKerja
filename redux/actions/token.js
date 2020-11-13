export function getToken(token) {
  return {
    type: 'GET_TOKEN_REQUESTED',
    payload: token,
  };
}
