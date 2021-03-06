const _APIHOST_ = 'http://192.168.1.217:8080'

const APIHOSTUSER = 'http://192.168.1.217:8080/user'

const APIHOSTTEMP = 'http://192.168.1.217:8080/template'

const userApiMaker = (path) => {
  return `${_APIHOST_}/user/${path}`
}
const templateApiMaker = (path) => {
  return `${_APIHOST_}/template/${path}`
}
const logApiMaker = (path) => {
  return `${_APIHOST_}/log/${path}`
}
export default {
  login: userApiMaker('login'),
  register: userApiMaker('register'),
  logout: userApiMaker('logout'),
  info: userApiMaker('info'),
  password: userApiMaker('password'),
  nickname: userApiMaker('nickname'),
  infos: templateApiMaker('infos'),
  create: templateApiMaker('create'),
  user: APIHOSTUSER,
  template: APIHOSTTEMP,
  loginfo: logApiMaker('info?')
}
