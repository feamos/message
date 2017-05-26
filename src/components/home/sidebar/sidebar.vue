<template>
    <div class="sidebar">
        <div class="head">
            <span>18716028979</span><a href="javascript:;" @click.stop="titleBt"><img src="./imgs/side-add.png" alt=""></a>
        </div>
        <div class="head-bt" id="bt">
          <ul>
            <li>个人中心</li>
            <li>新建群组</li>
            <li>管理群组</li>
            <li>退出</li>
          </ul>
        </div>
        <div class="tab">
            <div class="contact ">
                <a href="javascript:;"><img src="./imgs/contact1.png" height="30" width="30"></a>
            </div>
            <br>
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
    .fl {
        float: left;
    }
    .tab a {
        display: inline-block;
        width: 100%;
    }
    br {clear: both;}
    img {
        width: 30px;
        height: 30px;
    }
    .sidebar {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        float: left;
        width: 280px;
        height: 767px;
        background: #2e313a;
        color: #fff;
    }
    .head {
        padding: 18px 18px 36px 18px;
    }
    .head span {
        line-height: 30px;
        padding-left: 30px;
    }
    .head img {
        vertical-align: middle;
        padding-left: 30px;
    }
    #bt {
      background-color: white;
      color: #000;
      border-radius: 5px;
      position: absolute;
      left: 590px;
      top: 150px;
      display: none;
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
    .tab {
        border-bottom: 1px solid #292c35;
        height: 34px;
    }
    .tab .contact {
        width: 100%;
        text-align: center;
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
