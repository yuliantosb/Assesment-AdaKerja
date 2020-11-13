export function getRepositories(repositories) {
  return {
    type: 'GET_REPOSITORIES_REQUESTED',
    payload: repositories,
  };
}
