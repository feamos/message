const _APIHOST_ = 'http://192.168.1.217:8080'

const userApiMaker = (path) => {
  return `${_APIHOST_}/user/${path}`
}
const templateApiMaker = (path) => {
  return `${_APIHOST_}/template/${path}`
}
export default {
  login: userApiMaker('login'),
  register: userApiMaker('register'),
  logout: userApiMaker('logout'),
  info: userApiMaker('info'),
  password: userApiMaker('password'),
  nickname: userApiMaker('nickname'),
  infos: templateApiMaker('infos'),
  create: templateApiMaker('create')
}
