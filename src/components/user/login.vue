<template>
  <div class="login">
    <div class="contain">
      <div class="title">
        <h1 class="first-words">便捷联系</h1>
        <h1 class="second-words">纽扣群发帮你轻松简化一切，让生活更美好</h1>
        <h1 class="third-words">让工作更省力</h1>
      </div>
      <form method="post" @submit.prevent="onSubmit()">
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
              @click="goto('home')">
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
  export default {
    name: 'login',
    data () {
      return {
        mobile: '',
        pass: '',
        show: true
      }
    },
    methods: {
      goto () {
        this.$nextTick(() => {
          this.$router.push('register')
        })
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s
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

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  @-webkit-keyframes fade-in {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  @-ms-keyframes fade-in {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  @-o-keyframes fade-in {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  @-moz-keyframes fade-in {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes fade-in-left {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  @-webkit-keyframes fade-in-left {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }
  @-webkit-keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .first-words {
    opacity: 0; /*实先规定文字的状态是不显示的*/
    animation: fade-in 2s ease 0s 1; /*调用名称为fade-in的动画，全程动画显示时间4S，进入方式为ease，延时0S进入，播放次数1次*/
    -webkit-animation: fade-in 2s ease 0s 1;
    -moz-animation: fade-in 2s ease 0s 1;
    -o-animation: fade-in 2s ease 0s 1;
    -ms-animation: fade-in 2s ease 0s 1;

    /*规定动画的最后状态为结束状态*/
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    -ms-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
  }

  .second-words {
    opacity: 0;
    animation: fade-in-left 2s ease 2s 1;
    -webkit-animation: fade-in-left 2s ease 0s 1;
    -moz-animation: fade-in-left 2s ease 0s 1;
    -o-animation: fade-in-left 2s ease 0s 1;
    -ms-animation: fade-in-left 2s ease 0s 1;

    /*规定动画的最后状态为结束状态*/
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    -ms-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
  }

  .third-words {
    opacity: 0;
    animation: fade-in-up 2s ease 1s 1;
    -webkit-animation: fade-in-up 2s ease 1s 1;
    -moz-animation: fade-in-up 2s ease 1s 1;
    -o-animation: fade-in-up 2s ease 1s 1;
    -ms-animation: fade-in-up 2s ease 1s 1;

    /*规定动画的最后状态为结束状态*/
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    -ms-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
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
    width: 400px;
    height: 50px;
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
    background-color: #bbe1e3;
    color: white;
    margin-right: 20px;
    margin-left: 100px;
  }

  .to-register, .forget-pwd {
    color: white;
  }

</style>
