import { crudCreate, crudUpdate} from './dataActions'

export function login(code) {
  return crudCreate('auth', {code})
}
export function gotUserInfo(id,userInfo){
  return crudUpdate('profile',id,{userInfo});
}