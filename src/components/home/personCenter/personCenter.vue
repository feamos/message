<template>
  <div class="rightcontent">
    <div class="user-title">
      <h1>个人信息</h1>
    </div>
    <div class="user-img-container">
      <img class="user-img" src="../content/imgs/user.jpg"/>
    </div>
    <div v-if="editName" class="user-name-container">
      <span @click="clickinput"><Input v-model="nickname" :placeholder="nicknull" class="nickname-input" :class="{nick: nickbool}" ></Input></span>
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
        nickbool: false,
        nicknull: '修改昵称',
        editName: false, //  编辑昵称，为true时变为输入框可修改
        nickname: localStorage.getItem('nickname') === null ? localStorage.getItem('mobile') : localStorage.getItem('nickname')
        //   获取昵称,如果返回昵称为空就设电话号码为初始用户名
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
      clickinput () {
        this.nickbool = false
        this.nicknull = '修改昵称'
        this.nickname = ''
      },
      /**
       * 修改昵称
       */
      changeNikeName () {
        if (this.nickname === '') {
          console.log('昵称不能为空！')
          this.nickbool = true
          this.nicknull = '昵称不能为空'
        } else {
          this.editName = false
          fetch(API.nickname, {
            method: 'PUT',
            headers: {
              'token': localStorage.getItem('token'),
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              'nickname': this.nickname
            })
          }).then((res) => {
            return res.json()
          }).then((json) => {
            this.$bus.$emit('nickname', this.nickname)
          })
        }
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
  .nick {
    border: 1px solid red;
    border-radius: 5px;
    outline: none;
    color: red;
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
