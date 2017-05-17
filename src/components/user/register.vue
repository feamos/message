<template>
    <div class="register">
      <div class="contain">
        <h1 class="title">注 册</h1>
        <form method="post" @submit.prevent="onSubmit()">
          <!--@submit.prevent中的.prevent修饰符表示提交事件不再重载页面-->
          <div class="form-alias">
            <label>
              <strong>手机号</strong>
              <!--  v-model的.trim修饰符 可以自动过滤用户输入的首尾空格-->
              <input
                v-model.trim="email"
                type="text"
                name="email"
                placeholder="手机号">
              <!--  placeholder 属性提供可描述输入字段预期值的提示信息（hint）。
                    该提示会在输入字段为空时显示，并会在字段获得焦点时消失。-->
            </label>
          </div>
          <div class="form-password">
            <label>
              <strong>密 码</strong>
              <template v-if="passType === 'password'">
                <input
                  v-model.trim="pass"
                  type="password"
                  name="pass"
                  placeholder="密码">
              </template>
              <template v-if="passType === 'text'">
                <input
                  v-model.trim="pass"
                  type="text"
                  name="pass"
                  placeholder="密码">
              </template>
              <!--class与isShow绑定-->
              <span class="show-pwd" :class="{show: isShow}" @click="showPwd()">
            <img v-if="isShow" type="eye" src="../../images/browse.png">
            <img v-else type="eye-disabled" src="../../images/browse_fill.png">
          </span>
            </label>
          </div>
          <div class="form-user">
            <label>
              <strong>用户名</strong>
              <input
                v-model.trim="name"
                type="text"
                name="name"
                placeholder="用户名">
            </label>
          </div>
          <div class="has-account">
            <Button type="text" class="to-log" @click="gotoL">已有账号，立即登录</Button>
          </div>
          <div class="form-submit">
            <button
              class="submit"
              type="submit"
              :disabled="isDisabled"
              :class="{disabled: isDisabled}">
              <!--立即注册时可以点击，提交时按钮变换样式-->
              {{registerState}}
            </button>
          </div>
        </form>
        <div class="footer">
          <div class="agreement">点击注册代表你已阅读并同意使用协议</div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        email: '',
        passType: 'password',  //  是否隐藏密码
        pass: '',
        isShow: 0,
        registerState: '立即注册'
      }
    },
    methods: {
      showPwd () {
        this.isShow = this.isShow ? 0 : 1
        this.isShow ? this.passType = 'text' : this.passType = 'password'
      },
      gotoL () {
        this.$nextTick(() => {
          this.$router.push('/login')
        })
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }
  .register {
    margin:0 auto;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    display: flex;
    justify-content: center;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, .6);
  }

  h1 {
    /*检索或设置对象四边的外延边距,如果提供三个，第一个用于上，第二个用于左、右，第三个用于下。*/
    margin: 5% 0 3%;

    /*设置或检索对象中的文本字体的粗细*/
    font-weight: 300;
    color: #407637;
    text-align: center;
  }

  form {
    /*内部边距,如果提供两个，第一个用于上、下，第二个用于左、右*/
    padding: 2rem 1.5rem;
  }
  form strong {
  font-size: 1.0rem;
  color: #222;
  margin-bottom: 0.5rem;
  }
  form input::placeholder {
    color: #ccc;
  }

  form input[type="text"], form input[type="password"] {
    /*指定对象为内联块元素*/
    display: inline-block;
    width: 80%;
    height: 2.0rem;
    padding: 0 0.8rem;
    box-sizing: border-box;
    font-size: 1.0rem;
    background: #fff;
    border: 0.1rem solid #ccc;
    border-radius: 0.3rem;
    outline: 0;
    margin-bottom: 30px;
  }

  form .form-password {
    position: relative;
  }
  form .form-password .show-pwd {
    position: absolute;
    left: 82%;
    top: 0.1rem;
    display: block;
    height: 3.2rem;
    width: 3.2rem;
    z-index: 3;
  }

  .form-submit {
    position: relative;
  }
  .form-submit .submit {
    margin-top: 40px;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    position: absolute;
    left: 35%;
  }

  .agreement {
    margin-top: 50px;
    text-align: center;
  }

  .has-account {
    position: relative;
  }
  .to-log {
    position: absolute;
    left: 55%;
  }

</style>
