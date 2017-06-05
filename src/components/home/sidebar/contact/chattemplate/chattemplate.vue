<template>
  <div class="chat" id="chat">
    <ul>
      <li v-for="(chat, index) in chats" @click="beginChat(chat)">
        <div
          id="select"
          :class="{check:chat.checkFlag,select:!chat.checkFlag,hide:hideFlag}"
          @click="chat.checkFlag=!chat.checkFlag">
          <!--hide:隐藏复选框  check/select:选中和非选中-->
        </div>
        <p class="title">{{chat.name}}</p>
        <p>(蔡珩,罗洪涛,刘明……)</p>
      </li>
    </ul>
    <div class="newde" :class="{hide:!hideFlag}" v-if="hideFlag">
      <ul>
        <li @click="newMsg">新建消息</li>
        <li @click="judgetempl">删除消息</li>
        <br style="clear:both">
      </ul>
    </div>
    <newmessage v-if="newMessage" @closeNewMsg="newMessage=false"
                @createTemplate="createTemplates"
                @selectLi="selectLi"
                @changeTempName="changeTempName"
                @deleteTempName="deleteTempName"
                :temp-names="tempNames"
                @addTemplate="addTemp"
                @hoverIntemplate="hoverInTemplate"
                @hoverOuttemplate="hoverOutTemplate"
                @renameInput="renameInput"></newmessage>
    <!--绑定修改名称事件changeTemplate,删除模板事件deleteTempName-->
    <createtemp v-if="createTemp" @closeCreate="closeCreateTemp"
                @addTemplate="addTemplate"></createtemp>
    <!--绑定子组件模板命名模态框的关闭-->
    <div class="newde" :class="{hide:hideFlag}">
      <div class="checkAll" @click="selectAll()">
        <label class="All" :class="{check:checkbtn,select:!checkbtn}"></label><span>全选</span>
      </div>
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
  import API from '@/common/API/api'
  export default {
    name: 'app',
    data () {
      return {
        quick: false,
        confirmDlete: false,
        checkbtn: false,
        hideFlag: true,
        newMessage: false,  //  新建消息的弹出框，选择模板
        createTemp: false,
        tempNames: [],
        chats: []
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
      this.$bus.$on('sendTemp', (msg) => {
        this.sendTemp = msg
      })
    },
    mounted () {
    },
    methods: {
      beginChat: function (i) {
        this.$bus.$emit('responseChat', i)
        /**
         *如果此时已经显示了个人信息的页面，需要切换右边显示栏为模板显示部分，触发上层切换事件，
         * 一直往上触发直到home父组件
         * 首先触发父组件contact
         */
        this.$emit('changeRight')
      },
      deltemp: function () {
        this.confirmDlete = false
        let chats = this.chats
        this.chats = chats.filter((item) => {
          return item.checkFlag === false
        })
        this.cancelAll()
      },
      /**
       *新建消息
       **/
      newMsg () {
        this.newMessage = !this.newMessage
        fetch(API.infos, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
          }
        }).then((res) => res.json())
          .then((json) => {
            console.log(json)
            console.log('获取模板信息')
            if (json.code === 0) {
              json.data.templates.forEach((item) => {
                item.isActive = false
                item.renameButton = false
                item.renameTemp = false
              })
              this.tempNames = json.data.templates
              console.log(this.tempNames)
            }
          })
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
      /**
       * 新建模板并关闭当前新建消息对话框
       * **/
      createTemplates () {
        this.createTemp = true
        this.newMessage = false
      },
      /**
       *  取消新建模板的模态框
       **/
      closeCreateTemp () {
        this.createTemp = false
        this.newMessage = true
      },
      /**
       *添加模板
       **/
      addTemplate (templateName) {
        fetch(API.create, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
          },
          body: JSON.stringify({
            'tempName': templateName,
            'content': '这只是个例子'
          })
        }).then((res) => res.json())
          .then((json) => {
            console.log(json)
            if (json.code === 0) {
              console.log('创建成功！')
            }
          })
      },
      selectLi (index) {
        this.tempNames.forEach((value) => {
          value.isActive = false
        })
        this.tempNames[index].isActive = true
      },
      /**
       * @param changeTemplateName：修改模板名称
       * @param index：选择的li
       */
      changeTempName (changeTemplateName, index) {
        console.log(changeTemplateName)
        this.tempNames.forEach((value) => {
          value.renameTemp = false
        })
        this.tempNames[index].templa = changeTemplateName
      },
      /**
       * 删除选中的模板
       * @param index
       */
      deleteTempName (index) {
        console.log(index + 'index')
        this.tempNames.forEach((value, i) => {
          if (i === index) {
            this.tempNames.splice(index, 1)
          }
        })
      },
      /**
       *       添加模板
       */
      addTemp () {
        var obj = {
          name: this.sendTemp.tempName,
          template: this.sendTemp.tempStr,
          chengyuan: [],
          checkFlag: false
        }
        console.log(obj.name)
        this.chats.unshift(obj)
        this.newMessage = false
      },
      /**
       * 鼠标悬停触发显示重命名事件
       * @param index
       */
      hoverInTemplate (index) {
        this.tempNames.forEach((value) => {
          value.renameButton = false
        })
        this.tempNames[index].renameButton = true
      },
      /**
       *鼠标离开隐藏重命名和删除事件
       */
      hoverOutTemplate () {
        this.tempNames.forEach((value) => {
          value.renameButton = false
        })
      },
      renameInput (index) {
        this.tempNames.forEach((value) => {
          value.renameTemp = false
        })
        this.tempNames[index].renameTemp = true
      },
      /**
       * 删除时判断模板群发是否为空
       */
      judgetempl () {
        if (!this.chats[0]) {
          alert('模板为空！')
        } else {
          this.hideFlag = false
        }
        console.log('这是一条成功的提示')
        this.$Message.success('这是一条成功的提示')
      }
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: none;
  }
  ul p {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    width:300px;
    display:inline-block;
  }

  .fl {
    float: left;
  }

  #chat {
    width: 320px;
  }

  #chat ul {
    padding-bottom: 50px;
  }

  .chat {
    width: 320px;
    clear: both;
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
    line-height: 28px;
    color: #000;
    margin-left: 3px;
    vertical-align: middle;
  }

  .All {
    width: 15px;
    height: 15px;
    margin-left: 10px;
    line-height: 24px;
    border: 1px solid #000;
    vertical-align: middle;
    display: inline-block;
  }

  .newde {
    position: absolute;
    left: 0;
    bottom: -50px;
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

  @media (max-height: 800px), (max-width: 1000px) {
    .chat {
      height: 349px;
    }
  }

  ul li {
    border-bottom: 1px solid #979797;
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    -webkit-border-radius: 50%;
  }

  ::-webkit-scrollbar-track {
    background-color: #9e9fa1;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 3px;
    background-color: #58595e;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #58595e
  }

</style>
