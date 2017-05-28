<template>
    <div class="sidebar">
        <div class="head">
          <img class="head-img" src="./imgs/cat.jpg" width="80px" height="80px">
          <span>用户名</span>
          <a href="javascript:;" @click.stop="titleBt">
            <img class="set-img" src="./imgs/set.png">
          </a>
        </div>
        <div class="head-bt" id="bt">
          <ul>
            <li>个人中心</li>
            <li>新建群组</li>
            <li>管理群组</li>
            <li>退出</li>
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
          chat: 'chat',
          contact: 'contact',
          currentview: 'chat'
        }
      },
      mounted () {
        document.addEventListener('click', function () {
          document.getElementById('bt').style.display = 'none'
        })
      },
      methods: {
        titleBt () {
          document.getElementById('bt').style.display = 'block'
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
    li {
      list-style: none;
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
    #bt {
      background-color: white;
      color: #000;
      border-radius: 5px;
      position: absolute;
      left: 590px;
      top: 150px;
      display: none;
      z-index: 9999;
    }
    #bt li {
      padding: 2px 10px;
      width: 120px;
      text-align:center;
      font-size: 14px;
      line-height: 30px;
      border-bottom: 1px solid #d6d6d6;
      cursor: pointer;
    }
    #bt li:hover {
      background-color: #eeeeee;
    }
    @media (max-height: 800px), (max-width: 1000px){
      .sidebar {
        height: 617px;
      }
      #bt {
        left:310px;
        top:65px;
      }
    }
</style>
