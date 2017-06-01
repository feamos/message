<template>
    <div class="sidebar">
        <div class="head">
          <img class="head-img" src="./imgs/cat.jpg" width="80px" height="80px">
          <span>用户名</span>
          <img class="set-img" src="./imgs/set.png" @click="selectSet">
        </div>
        <div v-if="select" class="head-bt" id="bt">
          <ul>
            <li @click="$emit('Personal');select=false">个人信息</li>
            <li @click="signOut">注销登录</li>
          </ul>
        </div>
        <contact></contact>
    </div>
</template>
<script>
    import contact from './contact/contact'
    export default {
      name: 'sidebar',
      data () {
        return {
          list: false,
          select: false,
          chat: 'chat',
          contact: 'contact',
          currentview: 'chat'
        }
      },
      methods: {
        selectSet () {
          this.select = !this.select
        },
        signOut () {
          this.$nextTick(() => {
            this.$router.push('login')
          })
        }
      },
      components: {
        contact: contact
      }
    }
</script>
<style scoped>
    * {
      padding: 0;
      margin: 0;
    }

    .tab a {
        display: inline-block;
        width: 100%;
    }
    br {clear: both;}

    .head-img {
      z-index: 999;
      margin-left: 32px;
      margin-right: 24px;
    }
    .sidebar {
      width: 320px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        float: left;
        height: 100%;
        color: #fff;
    }
    .head {
      height: 157px;
    }
    .head span {
      line-height: 157px;
      font-size: 20px;
      margin-right: 44px;
    }
    .head img {
        vertical-align: middle;
        line-height: 157px;
    }

    .set-img {
      width: 36px;
      height: 23px;
      position: relative;
      cursor: pointer;
    }
    .head-bt {
      position: absolute;
      margin-left: 10%;
      margin-top: -3%;
      background: #FFFFFF;
      border: 1px solid #596179;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
      border-radius: 10px;
      width: 120px;
      color: black;
      z-index: 999;
    }
    #bt li {
      padding: 2px 10px;
      width: 120px;
      text-align:center;
      font-size: 14px;
      line-height: 30px;
      border-radius: 10px;
      cursor: pointer;
    }
    #bt li:hover {
      color: #A9CDCF;
    }
    @media (max-height: 768px), (max-width: 1024px){
      .sidebar {
        height: 617px;
      }
      .head-bt {
        margin-left: 14%;
        margin-top: -4%;
      }
    }
</style>
