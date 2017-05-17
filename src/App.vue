<template>
  <div id="app">
    <div class="main" v-if="login">
        <div class="left fl">
            <sidebar :list='list'></sidebar>
        </div>
        <div class="right fl">
            <rightcontent></rightcontent>
        </div>
        <br>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import sidebar from './components/sidebar/sidebar'
import rightcontent from './components/content/content'
import login from './components/user/login'
export default {
  name: 'app',
  data () {
    return {
      login: true,
      list: false
    }
  },
  components: {
    sidebar,
    rightcontent,
    login
  }

}
</script>

<style >
*{padding: 0;margin: 0;}
.fl {
    float: left;
}
br {clear:both;}

#app {
  padding-top: 100px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 80%;
  min-height: 600px;
}
.login {
  width: 900px;
}
.main {
   max-width: 1000px;
   min-width: 800px;
   height: 100%;
   margin: 0 auto;
}
.right {
  width: 720px;
  height: 767px;
  background-color: #eeeeee;
}
@media (max-height: 800px), (max-width: 1000px){
    #app {
        padding-top: 10px;
        height: 100%;
    }
    .right {
      height:617px;
    }
}
body {
    background: url(https://res.wx.qq.com/a/wx_fed/webwx/res/static/img/2zrdI1g.jpg) no-repeat 50%;
    background-size: cover;
    overflow: hidden;
}
</style>
