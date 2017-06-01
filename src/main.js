// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'    //  路由挂载
import router from './router'    // 路由列表
import VueBus from 'vue-bus'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Animate from 'animate.css'

Vue.use(Animate)
Vue.use(iView)
Vue.config.productionTip = false
Vue.use(VueBus)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
