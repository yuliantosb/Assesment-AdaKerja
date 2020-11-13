export function getUsers(users) {
  return {
    type: 'GET_USERS_REQUESTED',
    payload: users,
  };
}
