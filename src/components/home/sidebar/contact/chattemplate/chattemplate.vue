<template>
  <div class="chat" id="chat">
    <ul>
      <li v-for="(chat, index) in chats">
        <div id="select" :class="{check:chat.checkFlag,select:!chat.checkFlag,hide:hideFlag}"
             @click="chat.checkFlag=!chat.checkFlag"></div>
        <p class="title">{{chat.name}}</p>
        <p>(蔡珩,罗洪涛,刘明……)</p>
      </li>
    </ul>
    <div class="newde" :class="{hide:!hideFlag}">
      <ul>
        <li @click="newMsg">新建消息</li>
        <li @click="hideFlag = false">删除消息</li>
        <br style="clear:both">
      </ul>
    </div>
    <newmessage v-if="newMessage" @closeNewMsg="newMessage=false"
                @createTemplate="createTemplates"
                @selectLi="selectLi"
                :temp-names="tempNames"></newmessage>
    <createtemp v-if="createTemp" @closeCreate="closeCreateTemp"
                @addTemplate="addTemplate"></createtemp>
    <!--绑定子组件模板命名模态框的关闭-->
    <div class="newde" :class="{hide:hideFlag}">
      <div class="checkAll" @click="selectAll()"><label class="All" :class="{check:checkbtn,select:!checkbtn}"></label><span >全选</span></div>
      <ul>
        <li @click="cancelAll()">&nbsp;&nbsp;取&nbsp;&nbsp;&nbsp;消&nbsp;&nbsp;</li>
        <li @click="checkQuick()">&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;</li>
        <br style="clear:both">
        <confirm v-if="confirmDlete" @cancel="closedel" @confirmDel="deltemp"></confirm>
      </ul>
    </div>
  </div>
</template>

<script>
  import newmessage from './newMessage.vue'
  import confirm from './comfirmdelete'
  import createtemp from './createTemplate.vue'
  export default {
    name: 'app',
    data () {
      return {
        quick: false,
        confirmDlete: false,
        checkbtn: false,
        hideFlag: true,
        newMessage: false,
        createTemp: false,
//        tempNames: ['模板一', '模板二', '模板三', '模板四', '模板五'],
        tempNames: [
          {
            isActive: false,
            id: 1,
            templa: '模板一'
          },
          {
            isActive: false,
            id: 2,
            templa: '模板二'
          },
          {
            isActive: false,
            id: 3,
            templa: '模板三'
          },
          {
            isActive: false,
            id: 4,
            templa: '模板四'
          },
          {
            isActive: false,
            id: 5,
            templa: '模板五'
          }
        ],
        chats: [
          {
            name: '班会通知',
            checkFlag: false
          },
          {
            name: '比赛通知',
            checkFlag: false
          },
          {
            name: '开会通知',
            checkFlag: false
          },
          {
            name: 'Chris',
            checkFlag: false
          },
          {
            name: 'Bill',
            checkFlag: false
          },
          {
            name: 'Tracy',
            checkFlag: false
          },
          {
            name: 'Chris',
            checkFlag: false
          },
          {
            name: 'Bill',
            checkFlag: false
          },
          {
            name: 'Tracy',
            checkFlag: false
          },
          {
            name: 'Chris',
            checkFlag: false
          },
          {
            name: 'Bill',
            checkFlag: false
          },
          {
            name: 'Tracy',
            checkFlag: false
          },
          {
            name: 'Chris',
            checkFlag: false
          },
          {
            name: 'Bill',
            checkFlag: false
          },
          {
            name: 'Tracy',
            checkFlag: false
          },
          {
            name: 'Chris',
            checkFlag: false
          },
          {
            name: 'Bill',
            checkFlag: false
          },
          {
            name: 'Tracy',
            checkFlag: false
          },
          {
            name: 'Chris',
            checkFlag: false
          }
        ]
      }
    },
    components: {
      confirm,
      newmessage,
      createtemp
    },
    created () {
      this.$bus.$on('quickDel', (msg) => {
        this.quick = msg
      })
    },
    mounted () {
      this.addTemplate
    },
    methods: {
      deltemp: function () {
        this.confirmDlete = false
        let chats = this.chats
        this.chats = chats.filter((item) => {
          return item.checkFlag === false
        })
        this.cancelAll()
      },
      newMsg () {
        this.newMessage = !this.newMessage
      },
      selectAll: function () {
        if (this.checkbtn) {
          this.chats.forEach(function (item) {
            item.checkFlag = false
          })
        } else {
          this.chats.forEach(function (item) {
            if (!item.checkFlag) {
              item.checkFlag = true
            }
          })
        }
        this.checkbtn = !this.checkbtn
        this.chats.forEach(function (item) {
          if (!item.checkFlag) {
            item.checkFlag = false
          }
        })
      },
      cancelAll: function () {
        this.hideFlag = true
        this.checkbtn = false
        this.chats.forEach(function (item) {
          item.checkFlag = false
        })
      },
      closedel: function () {
        this.confirmDlete = false
        this.cancelAll()
      },
      checkQuick: function () {
        if (!this.quick) {
          this.confirmDlete = true
        } else {
          this.deltemp()
        }
      },
//      新建模板并关闭当前新建消息对话框
      createTemplates () {
        this.createTemp = true
        this.newMessage = false
      },
//      取消新建模板的模态框
      closeCreateTemp () {
        this.createTemp = false
        this.newMessage = true
      },
      addTemplate (templateName) {
        this.tempNames.push(templateName)
        console.log(this.tempNames)
      },
      selectLi (index) {
        this.tempNames.forEach((value, index) => {
          value.isActive = false
        })
        this.tempNames[index].isActive = !this.tempNames[index].isActive
      }
    }
  }
</script>

<style scoped>
  * {padding: 0;margin: 0;}
  ul {list-style: none;}
  .fl {
    float: left;
  }
  #chat {
    width: 320px;
  }
  .chat {
    width: 320px;
    clear:both;
    overflow: auto;
    overflow-x: hidden;
    height: 500px;
  }
  .chat li {
    height: 80px;
    text-align: center;
    position: relative;
  }
  .check {
    background: #A9CDCF;
  }
  .select {
    background: #fff;
  }
  .hide {
    display: none;
  }
  .chat li #select {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 20px;
    top: 40%;
    cursor: pointer;
    border: 1px solid #000;
  }
  .chat .title {
    font-size: 24px;
    padding: 15px 0 0 0;
    line-height: 36px;
    vertical-align: top;
  }
  .chat li:hover {
    background: #fff;
    color: #596179;
  }
  .checkAll {
    cursor: pointer;
    background: #596179;
  }
  .checkAll span {
    line-height:28px;
    color: #000;
    margin-left: 3px;
    vertical-align: middle;
  }
  .All {
    width: 15px;
    height: 15px;
    margin-left: 10px;
    line-height:24px;
    border:1px solid #000;
    vertical-align: middle;
    display: inline-block;
  }
  .newde {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .newde ul li {
    height: 50px;
    padding: 0 42px;
    line-height: 50px;
    float: left;
    font-size: 18px;
    cursor: pointer;
    color: #fff;
    background: #596179;
  }
  .newde ul li:hover {
    color: #A9CDCF;
    background: #596179;
  }
  .newde ul li:first-child {
    border-right: solid 2px #979797;
  }
  @media (max-height: 800px), (max-width: 1000px){
    .chat {
      height: 349px;
    }
  }
  ul li {
    border-bottom: 1px solid #979797;
    cursor: pointer;
  }
  ::-webkit-scrollbar{width:6px;height: 6px;
    -webkit-border-radius: 50%;}
  ::-webkit-scrollbar-track{background-color:#9e9fa1;}
  ::-webkit-scrollbar-thumb{-webkit-border-radius: 3px;background-color: #58595e;}
  ::-webkit-scrollbar-thumb:hover {background-color:#58595e}

</style>
