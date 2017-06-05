<template>
    <div class="sidebar">
        <div class="head">
          <img class="head-img" src="./imgs/cat.jpg" width="80px" height="80px">
          <span class="user-name">{{nickname}}</span>
          <img class="set-img" src="./imgs/set.png" @click="selectSet">
        </div>
        <div v-if="select" class="head-bt" id="bt">
          <ul>
            <li @click="$emit('Personal');select=false">个人信息</li>
            <li @click="signOut">注销登录</li>
          </ul>
        </div>
        <contact @changeRightSideBar="changeRightSideBar"></contact>
    </div>
</template>
<script>
    import contact from './contact/contact'
    import API from '@/common/API/api'
    export default {
      name: 'sidebar',
      data () {
        return {
          list: false,
          select: false,
          chat: 'chat',
          contact: 'contact',
          currentview: 'chat',
          nickname: localStorage.getItem('nickname') === null ? localStorage.getItem('mobile') : localStorage.getItem('nickname')
          //   获取昵称,如果返回昵称为空就设电话号码为初始用户名
        }
      },
      updated: function () {
        this.$bus.on('nickname', (msg) => {
          this.nickname = msg
        })
      },
      methods: {
        selectSet () {
          this.select = !this.select
        },
        signOut () {
          this.$nextTick(() => {
            fetch(API.logout, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
              }
            }).then((res) => res.json())
              .then((json) => {
                console.log(json)
                if (json.code === 0) {
                  localStorage.clear()
                  this.$router.push('login')
                } else if (json.code === 30002) {
                  console.log('登录过期，请重新登录！')
                  this.$router.push('login')
                }
              })
          })
        },
        changeRightSideBar () {
          /**
           * 触发父组件home中的事件切换右边显示栏
           */
          this.$emit('changeRightBar')
          console.log('第二层')
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

    .sidebar {
      width: 320px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        float: left;
        height: 100%;
        color: #fff;
    }
    .head {
      padding-top: 30px;
      height: 157px;
      /*line-height: 157px;*/
      /*margin-top: 50px;*/
    }
    .head span {
      font-size: 20px;
      /*line-height: 157px;*/
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space:nowrap;
      width:100px;
      height:24px;
      display:inline-block;
      /*color: white;*/
    }
    .head img {
        vertical-align: middle;
        line-height: 157px;
    }

    .head-img {
      margin-left: 20px;
      margin-right: 14px;
    }
    .set-img {
      width: 36px;
      height: 23px;
      margin-left: 20px;
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
