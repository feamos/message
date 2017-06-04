<template>
  <div class="login">
    <div class="contain">
      <div class="title">
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeInDown">
          <h1 v-if="show">便捷联系</h1>
        </transition>
        <transition name="custom-second-transition"
                    enter-active-class="animated fadeInLeft">
          <h1 v-if="show">纽扣群发帮你轻松简化一切，让生活更美好</h1>
        </transition>
        <transition name="custom-third-transition"
                    enter-active-class="animated fadeInUp">
          <h1 v-if="show">让工作更省力</h1>
        </transition>
      </div>
      <form method="post" @submit.prevent="">
        <div class="input-container">
          <div class="form-alias">
            <label>
              <!--  v-model的.trim修饰符 可以自动过滤用户输入的首尾空格-->
              <input
                v-model.trim="mobile"
                type="text"
                name="mobile"
                placeholder="手机号/邮箱">
              <!--  placeholder 属性提供可描述输入字段预期值的提示信息（hint）。
                    该提示会在输入字段为空时显示，并会在字段获得焦点时消失。-->
            </label>
          </div>
          <div class="form-password">
            <label>
              <input
                v-model.trim="pass"
                class="input-pass"
                type="password"
                name="pass"
                placeholder="密码">
            </label>
          </div>
        </div>
        <div class="forget-pass">
          <Button type="text" size="large" class="forget-pwd"
                  @click="forgotPassword">忘记密码?
          </Button>
        </div>
        <div class="button-container">
          <div class="form-submit">
            <button
              class="submit"
              style="cursor:pointer"
              @click="signIn">
              登录
            </button>
          </div>
          <div class="no-account">
            <Button type="text" size="large"
                    class="to-register" @click="goto">快速注册
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import API from '@/common/API/api'
  export default {
    name: 'login',
    data () {
      return {
        mobile: '',
        pass: '',
        show: false
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.show = true
      })
    },
    methods: {
      goto () {
        this.$nextTick(() => {
          this.$router.push('register')
        })
      },
      signIn () {
        const PASSWD_ERR = 20002
        const MOBILE_ERR = 20001
        const SUCCESS = 0
        if (!this.mobile) {
          this.$Message.info('请输入手机号')
          console.log('请输入手机号')
        } else if (!this.pass) {
          this.$Message.info('请输入密码')
        } else {
          fetch(API.login, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              mobile: this.mobile,
              password: this.pass
            })
          }).then((res) => res.json())
            .then((json) => {
              console.log(json)
              if (json.code === SUCCESS) {
                console.log('登录成功！')
                localStorage.setItem('token', json.data.token)
                localStorage.setItem('mobile', json.data.user.mobile)
                this.$router.push('/home')
              }
              if (json.code === PASSWD_ERR) {
                console.log('密码错误！')
                this.pass = ''
              }
              if (json.code === MOBILE_ERR) {
                this.$Message.info('用户名不存在')
                this.mobile = ''
                this.pass = ''
              }
            })
        }
      },
      forgotPassword () {
        this.$nextTick(() => {
          this.$router.push('forgotPass')
        })
      }
    },
    transitions: {
      bounce: {
        enterClass: 'bounceInLeft'
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }

  .login {
    background-image: url("../../images/background.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: table;
  }

  .contain {
    z-index: 9999;
    display: table-cell;
    vertical-align: middle;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(51, 51, 51, .5);
    transition: opacity .3s ease;
  }

  .title {
    /*检索或设置对象四边的外延边距,如果提供三个，第一个用于上，第二个用于左、右，第三个用于下。*/
    margin: 8% 10% 3%;
    color: white;
    text-align: center;
  }

  h1 {
    /*设置或检索对象中的文本字体的粗细*/
    font-weight: lighter;
    font-size: 40px;
    font-family: Microsoft YaHei;
  }


  form {
    font-size: larger;
  }

  .input-container, .button-container {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
  }

  /*.input-pass {*/
  /*position: relative;*/
  /*}*/

  .forget-pass {
    /*position: absolute;*/
    /*right: 0;*/
    display: flex;
    justify-content: flex-end;
    margin-right: 20%;
  }

  .form-alias input, .form-password input {
    width: 300px;
    height: 45px;
    margin: 25px;
    outline: none;
    padding-left: 7px;
    border-radius: 3px;
  }

  .form-submit .submit {
    width: 200px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    background-color: rgb(142, 185, 228);;
    color: white;
    margin-right: 20px;
    margin-left: 100px;
  }

  .to-register, .forget-pwd {
    color: white;
  }

</style>
