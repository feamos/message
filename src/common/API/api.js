const _APIHOST_ = 'http://192.168.1.217:8080/user'
const userApiMaker = (path) => {
  return `${_APIHOST_}/${path}`
}
export default {
  login: userApiMaker('login'),
  register: userApiMaker('register'),
  logout: userApiMaker('logout'),
  info: userApiMaker('info'),
  user: _APIHOST_
}
