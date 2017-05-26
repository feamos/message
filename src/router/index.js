import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/user/register'
import Login from '@/components/user/login'
import Home from '@/components/home/home'
import Setpass from '@/components/user/setPass'
import SetNewpass from '@/components/user/setNewPass'
import Forgotpass from '@/components/user/forgotPass'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InitPage',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/setpass',
      name: 'Setpass',
      component: Setpass
    },
    {
      path: '/setNewpass',
      name: 'SetNewpass',
      component: SetNewpass
    },
    {
      path: '/forgotpass',
      name: 'Forgotpass',
      component: Forgotpass
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
