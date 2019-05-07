import { crudCreate, crudUpdate } from './dataActions'

export function login(code, callback) {
  return crudCreate('auth', { code }, null, { callback })
}
export function gotUserInfo(id, userInfo) {
  return crudUpdate('profile', id, { userInfo }, `profile/${id}`);
}