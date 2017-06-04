<template>
  <div class="register">
    <template v-if="isGoNext">
      <!--点击下一步后显示该组件框-->
      <transition name="modal">
        <div class="set-pass-contain">
          <div class="modal-header">
            <slot name="header">
              <h1 class="title">设 置 密 码</h1>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="input-body">
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                  <Form-item label="密码" prop="passwd">
                    <Input type="password" class="form-input"
                           v-model="formCustom.passwd"
                           placeholder="请输入密码"></Input>
                  </Form-item>
                  <Form-item label="确认密码" prop="passwdCheck">
                    <Input type="password" class="form-input"
                           v-model="formCustom.passwdCheck"
                           placeholder="确认密码"></Input>
                  </Form-item>
                  <Form-item class="form-login">
                    <button class="tologin" type="submit" @click="toLogin">
                      登录
                    </button>
                  </Form-item>
                </Form>
              </div>
            </slot>
          </div>
        </div>
      </transition>
    </template>
    <template v-else>
      <transition name="modal">
        <div class="regist-contain">
          <div class="modal-header">
            <slot name="header">
              <h1 class="title">快 速 注 册</h1>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="input-body">
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom"
                      :label-width="80">
                  <Form-item label="手机号" prop="mobile" class="form-mobile">
                    <Input type="text" class="form-input"
                           v-model="formCustom.mobile"
                           placeholder="请输入手机号"></Input>
                  </Form-item>
                  <Form-item label="验证码" prop="identify" class="form-mobile">
                    <Input type="password" class="form-identify"
                           v-model="formCustom.identify"
                           placeholder="输入验证码"></Input>
                    <button class="get-idencode">获取验证码</button>
                  </Form-item>
                  <Form-item>
                    <div class="form-next">
                      <button class="next" @click="goNext">
                        下一步
                      </button>
                    </div>
                  </Form-item>
                </Form>
              </div>
            </slot>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
  import API from '@/common/API/api'
  export default {
    name: 'register',
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck')
          }
          callback()
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      const validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        }
      }
      const validateIdenty = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        }
      }
      return {
        formCustom: {
          passwd: '',
          passwdCheck: '',
          mobile: '',
          identify: ''
        },
        ruleCustom: {
          passwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          passwdCheck: [
            {validator: validatePassCheck, trigger: 'blur'}
          ],
          mobile: [
            {
              validator: validateMobile, trigger: 'blur'
            }
          ],
          identify: [
            {
              validator: validateIdenty, trigger: 'blur'
            }
          ]
        },
        isGoNext: false  //  注册页面，为true时显示设置密码
      }
    },
    methods: {
      goNext () {
        this.$nextTick(function () {
          if (this.formCustom.mobile === '') {
            console.log('请输入手机号')
          } else {
            this.isGoNext = true
            console.log(this.formCustom.mobile)
          }
        })
      },
      toLogin () {
        const MOBILE_EXSIST = 20003
        let submitRegister = {
          mobile: this.formCustom.mobile,
          password: this.formCustom.passwd
        }
        fetch(API.register, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submitRegister)
        }).then((res) => res.json())
          .then((json) => {
            console.log(json)
            if (json.code === 0) {
              this.$router.push('/login')
              window.localStorage.setItem('token', json.data.token)
            } else if (json.code === MOBILE_EXSIST) {
              console.log('手机号存在！')
            }
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
    background-image: url("../../images/background_vague.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: fixed;
    z-index: 98;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity .3s ease;
  }

  .regist-contain {
    z-index: 99;
    display: table-cell;
    vertical-align: middle;
    top: 30%;
    left: 35%;
    position: fixed;
    width: 450px;
    height: 320px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, .6);
  }

  .set-pass-contain {
    z-index: 99;
    display: table-cell;
    vertical-align: middle;
    position: fixed;
    margin: 0 auto;
    top: 30%;
    left: 35%;
    width: 450px;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, .6);
  }

  h1 {
    /*检索或设置对象四边的外延边距,如果提供三个，第一个用于上，第二个用于左、右，第三个用于下。*/
    margin: 5% 0 3%;
    /*设置或检索对象中的文本字体的粗细*/
    font-weight: 100;
    text-align: center;
    font-size: 40px;
  }

  .form-input::placeholder {
    color: #ccc;
  }

  .form-input {
    width: 300px;
  }

  .form-identify {
    width: 120px;
  }

  .form-mobile {
    line-height: 3.5rem;
  }

  .get-idencode {
    width: 35%;
    margin-left: 10%;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.5rem;
    color: white;
    background-color: #a9cdcf;
    cursor: pointer;
    border-radius: 10px;
  }

  .form-next {
    text-align: center;
    margin-top: 1rem;
  }

  .next {
    width: 40%;
    height: 3.3rem;
    font-size: 1.5rem;
    color: white;
    background-color: #a9cdcf;
    cursor: pointer;
    border-radius: 10px;
    margin-left: -80px;
  }

  .form-login {
    text-align: center;
    margin-top: 1.8rem;
    margin-left: -80px;
  }

  .tologin {
    width: 40%;
    height: 3.3rem;
    font-size: 1.5rem;
    color: white;
    background-color: #a9cdcf;
    cursor: pointer;
    border-radius: 10px;
  }

</style>
