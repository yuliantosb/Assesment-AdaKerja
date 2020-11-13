export function getCommits(commits) {
  return {
    type: 'GET_COMMITS_REQUESTED',
    payload: commits,
  };
}
