<template>
  <div class="rightcontent">
    <div class="user-title">
      <h1>个人信息</h1>
    </div>
    <div class="user-img-container">
      <img class="user-img" src="../content/imgs/user.jpg"/>
    </div>
    <div v-if="editName" class="user-name-container">
      <Input v-model="nickname" placeholder="修改昵称" class="nickname-input"></Input>
      <button class="change-nick-button" @click="changeNikeName">确定</button>
    </div>
    <div v-else class="user-name-container">
      <span class="user-name">{{nickname}}</span>
      <img class="edit-img" src="./imgs/edit.png" @click="editNikeName"/>
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
  import API from '../../../common/API/api'
  export default {
    name: 'app',
    data () {
      return {
        userMobile: localStorage.getItem('mobile'),
        userEmail: '暂定@163.com',
        changePass: false, // 修改密码模块
        editName: false, //  编辑昵称，为true时变为输入框可修改
        nickname: localStorage.getItem('mobile') //  初始昵称为手机号
      }
    },
    components: {
      changepass
    },
    methods: {
      openChangePass () {
        this.changePass = true
      },
      editNikeName () {
        this.editName = true
      },
      changeNikeName () {
        this.editName = false
        let userId = localStorage.getItem('userId')
        let token = localStorage.getItem('token')
        console.log(userId)
        fetch(API.user + '/' + userId + '/nickname', {
          method: 'PUT',
          headers: {
            'token': token,
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            'nickname': this.nickname
          })
        }).then((res) => {
          return res.json()
        }).then((json) => {
          console.log(json)
          localStorage.setItem('nickname', this.nickname)
        })
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
  .user-name-container {
    margin-top: 20px;
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
  .nickname-input {
    width: 150px;
  }

  .change-nick-button {
    font-size: 15px;
    color: #FFFFFF;
    background: #A9CDCF;
    border-radius: 5px;
    width: 60px;
    height: 30px;
    margin-left: 20px;
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
