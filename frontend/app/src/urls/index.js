const DEFAULT_API_LOCALHOST = 'http://localhost:3001/api/v1'

export const usersIndex = `${DEFAULT_API_LOCALHOST}/users`
export const listsIndex = (userId) =>
  `${DEFAULT_API_LOCALHOST}/users/${userId}/lists`
