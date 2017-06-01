<template>
  <div class="chat-container">
    <div class="chat">
      <ul>
        <li v-for="(chat,index) in chats">
          <div class="checkbox" v-if="select" v-on:click="selectThis(index)"
               v-bind:class="{'class-b':chat.isSelected }"></div>
          <span v-on:click="getThis(index)">{{chat.name}}</span>
        </li>
      </ul>
      <div class="chat-footer">
        <span v-on:click="confirms">{{createName}}</span><span class="second-span">|</span><span
        v-on:click="deleteItem">{{deleteName}}</span>
      </div>
      <div class="create-modal" v-if="showOrHide">
        <div class="input-groupName">
          <Form :model="formItem">
            <Form-item>
              <Input v-model="formItem.newGroupName" placeholder="请输入群名称" class="input-groupName-input"></Input>
            </Form-item>
          </Form>
        </div>
        <div class="confirm-giveUp">
          <span v-on:click="cancelThis">取消</span><span class="second-span">|</span><span
          v-on:click="createNewGroup">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        select: false,
        isSelected: false,
        deleteName: '删除群',
        createName: '新建群',
        showOrHide: false,
        formItem: {
          newGroupName: ''
        },
        chats: [
          {
            name: '我们的家',
            isSelected: false,
            person: [
              {
                name: '张三',
                phoneNumber: 1232332323,
                isSelected: false
              }
            ]
          },
          {
            name: '中国篮球迷',
            isSelected: false,
            person: [
              {
                name: '张三',
                phoneNumber: 1232332323,
                isSelected: false
              }
            ]
          },
          {
            name: '世界旅游爱好者',
            isSelected: false,
            person: [
              {
                name: '张三',
                phoneNumber: 1232332323,
                isSelected: false
              }
            ]
          },
          {
            name: '东北大学it',
            isSelected: false,
            person: [
              {
                name: '张三',
                phoneNumber: 1232332323,
                isSelected: false
              }
            ]
          },
          {
            name: '不洗碗工作室',
            isSelected: false,
            person: [
              {
                name: '张三',
                phoneNumber: 1232332323,
                isSelected: false
              }
            ]
          },
          {
            name: '纽约',
            isSelected: false,
            person: [
              {
                name: '张三',
                phoneNumber: 1232332323,
                isSelected: false
              }
            ]
          },
          {
            name: '六一儿童节',
            isSelected: false,
            person: [
              {
                name: '张三',
                phoneNumber: 1232332323,
                isSelected: false
              }
            ]
          }
        ]
      }
    },
    methods: {
      deleteItem: function () {
        if (this.select === false) {
          this.select = true
          this.deleteName = '取消'
          this.createName = '确定'
        } else {
          this.select = false
          this.deleteName = '删除群'
          this.createName = '新建群'
        }
      },
      selectThis: function (index) {
        if (this.chats[index].isSelected === false) {
          this.chats[index].isSelected = true
        } else {
          this.chats[index].isSelected = false
        }
      },
      hasSelected: function (arrObject) {
        for (let index = 0; index <= arrObject.length - 1; index++) {
          if (arrObject[index].isSelected === true) {
            return true
          }
        }
      },
      confirms: function () {
        var arrObject = this.chats
        if (this.createName === '确定') {
          if (this.hasSelected(arrObject)) {
            for (let index = 0; index <= arrObject.length - 1; index++) {
              while (arrObject[index].isSelected === true) {
                arrObject.splice(index, 1)
              }
            }
          }
        }
        if (this.createName === '新建群') {
          if (this.showOrHide === false) {
            this.showOrHide = true
          } else {
            this.showOrHide = false
          }
        }
      },
      cancelThis: function () {
        this.showOrHide = false
      },
      createNewGroup: function () {
        let that = this
        if (that.formItem.newGroupName !== '') {
          let newName = {
            name: that.formItem.newGroupName,
            isSelected: false
          }
          this.chats.push(newName)
          this.formItem.newGroupName = ''
          this.showOrHide = false
        }
      },
      getThis: function (index) {
        this.$bus.emit('hello', this.chats[index].name)
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
    height: 300px;
    /*background-color: yellow;*/
    overflow-y: scroll;
  }

  ul li {
    height: 50px;
    /*background-color: red;*/
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid #979797;
    color: white;
    font-size: 18px;
    cursor: pointer;
    position: relative;
    overflow-y: hidden;
  }

  ul li:hover {
    background-color: white;
    color: #333;
  }

  .chat {
    clear: both;
    height: 500px;
  }

  @media (max-height: 800px), (max-width: 1000px) {
    .chat {
      height: 340px;
    }
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

  .checkbox {
    width: 20px;
    height: 20px;
    background-color: white;
    position: absolute;
    top: 50%;
    margin-top: -10px;
    left: 30px;
    cursor: pointer;
    border: 1px solid #ccc;
  }

  .class-b {
    width: 20px;
    height: 20px;
    background-color: #A9CDCF;
    position: absolute;
    top: 50%;
    margin-top: -10px;
    left: 30px;
    cursor: pointer;
  }

  .chat-footer {
    height: 50px;
    /*background-color: red;*/
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: white;
  }

  .chat-footer span {
    cursor: pointer;
  }

  .chat-footer span:hover {
    color: #A9CDCF
  }

  .second-span {
    margin: 0 55px;
  }

  .create-modal {
    width: 320px;
    height: 150px;
    background-color: #596179;
    box-shadow: 5px 5px 2px #888888;
    position: fixed;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    border-radius: 5px;
  }

  .input-groupName {
    height: 70px;
    /*background-color: khaki;*/
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: relative;
  }

  .input-groupName Form {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -15px;
    margin-left: -133px;
  }

  .input-groupName-input {
    width: 260px;
  }

  .confirm-giveUp {
    height: 80px;
    /*background-color: saddlebrown;*/
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    text-align: center;
    line-height: 80px;
    font-size: 18px;
    color: white;
  }

  .confirm-giveUp span {
    cursor: pointer;
  }
  .confirm-giveUp span:hover{
    color: #A9CDCF
  }
  .second-span {
    margin: 0 30px;
  }

</style>
