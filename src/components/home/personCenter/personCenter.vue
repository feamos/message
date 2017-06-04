<template>
  <div class="rightcontent">
    <div class="user-title">
      <h1>个人信息</h1>
    </div>
    <div class="user-img-container">
      <img class="user-img" src="../content/imgs/user.jpg"/>
    </div>
    <div class="user-name-container">
      <span class="user-name">{{userName}}</span>
      <img class="edit-img" src="./imgs/edit.png"/>
    </div>
    <div class="user-mobile">
      <span>手机：{{userMobile}}</span>
    </div>
    <div class="user-email">
      <span>邮箱：{{userEmail}}</span>
    </div>
    <div class="change-pass-container">
      <button class="change-pass" @click="openChangePass">修改密码</button>
    </div>
    <changepass v-if="changePass" @closeChange="changePass=false"></changepass>
  </div>
</template>

<script>
  import changepass from './changePassword.vue'
  export default {
    name: 'app',
    data () {
      return {
        userName: '1777627637@qq.com',
        userMobile: localStorage.getItem('mobile'),
        userEmail: 'hfakuiuvif@163.com',
        changePass: false
      }
    },
    components: {
      changepass
    },
    methods: {
      openChangePass () {
        this.changePass = true
      }
    }
  }
</script>

<style scoped>
  .rightcontent {
    display: block;
    color: #000000;
    height: 768px;
  }

  .user-img-container, .user-title, .user-name-container, .user-mobile, .user-email, .change-pass-container {
    display: flex;
    justify-content: center;
  }
  .user-title {
    padding-top: 36px;
    border-bottom: 1px solid rgba(89,97,121,0.38);
    height: 113px;
  }
  .user-title h1 {
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #A9CDCF;
    font-weight: lighter;
  }
  .user-img {
    width: 128px;
    height: 128px;
    margin-top: 60px;
  }
  .user-name, .user-mobile {
    margin-top: 26px;
  }
  .user-email {
    margin-top: 12px;
  }
  .user-name, .user-mobile, .user-email {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #596179;
  }
  .edit-img {
    height: 32px;
    width: 32px;
    margin-top: 26px;
    margin-left: 15px;
    cursor: pointer;
  }
  .change-pass {
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #FFFFFF;
    background: #A9CDCF;
    border-radius: 5px;
    width: 160px;
    height: 40px;
    cursor: pointer;
    margin-top: 30px;
  }
</style>
