<template>
  <div class="rightcontent">
    <div class="head">
      <div class="title">
        <span href="javascript:;" @click="list1 = !list1">{{ chat.name }}</span>
        <img src="../../../assets/setups.png" v-if="showSetupPhoto" class="SetupPhoto">
        <div class="mobile" v-if="list1">
          <img src="./imgs/add.png" alt="">
          <li v-for="mobile in chat.mobiles">{{mobile}}</li>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="message-wrap" v-for="message in chat.messages">
        <div class="midd-message">
          {{message}}
          <img src="./imgs/user.jpg" width="80px" height="80px" alt="">
        </div>
        <br class="clfl">
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-btn">
        <img src="./imgs/{}.png" alt="" @click="addstring()">
        <img src="./imgs/table.png" @click="importExcel = true" alt="">
        <img src="./imgs/format.png" @click="tem = true" style="width: 40px;height: 28px;" alt="">
        <img src="./imgs/save.png" style="width:20px; height:20px"
             @click="saveContent(chat.template, chat.id, chat.name)">
      </div>
      <div>
        <textarea id="editArea" v-model='chat.template'></textarea>
      </div>
      <div class="send">
        <span @click="checkMessage(chat.template)">发送</span>
      </div>
    </div>
    <excel v-if="importExcel" @cancel="importExcel = false"></excel>
    <tem v-if="tem" @cancel="tem = false"></tem>
  </div>
</template>

<script>
  import excel from './importExcel.vue'
  import tem from './template.vue'
  import API from '@/common/API/api'
  export default {
    name: 'app',
    data () {
      return {
        list1: false,
        message: '',
        importExcel: false,
        tem: false,
        showSetupPhoto: false,
        chat: {
          name: '发起聊天',
          template: '',
          chengyuan: [],  //  成员
          checkFlag: false
        }
      }
    },
    components: {
      excel,
      tem
    },
    mounted: function () {
      this.$bus.on('responseChat', (i) => {
        this.chat = i
        this.chat.name = i.tempName  //  把获取的模板名称替换到数组定义的名称
        this.chat.template = i.content  //  获取到的模板内容
      })
    },
    created: function () {             // 这里接受从chat.vue中传递过来的被选中的群组的名称，并替换默认chat.name的值(by lee)
      var that = this
      this.$bus.on('hello', function (groupName) {
        that.chat.name = groupName
        that.showSetupPhoto = true
      })
    },
    methods: {
      checkMessage (msg) {
        if (this.message) {
          this.sendMessage(msg)
          console.log('message: ' + this.message)
        }
      },
      sendMessage (msg) {
        msg.push(this.message)
        this.message = ''
      },
      /**
       * 编辑内容并保存
       * @param content为编辑的内容
       * id为选中的模板的id
       */
      saveContent (content, id, name) {
        let token = localStorage.getItem('token')
        console.log('修改内容为： ' + content)
        fetch(API.template + '/' + id + '/info', {
          method: 'PUT',
          headers: {
            'token': token,
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            'tempName': name,
            'content': content
          })
        }).then((res) => {
          return res.json()
        }).then((json) => {
          if (json.code === 0) {
            console.log(json)
          }
          console.log(json)
        })
      }
    }
  }
</script>

<style scoped>
  .rightcontent {
    display: block;
    color: #000000;
    height: 768px;
  }

  .clfl {
    clear: both;
  }

  .head {
    position: relative;
    text-align: center;
    margin: 0 19px;
    padding: 30px 0px;
    line-height: 30px;
    text-decoration: none;
    font-size: 13px;
    border-bottom: 1px solid rgba(89, 97, 121, 0.38);
  }

  .head span {
    cursor: pointer;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    display:inline-block;
  }

  .head img {
    margin-left: 3px;
  }

  .head .mobile {
    padding: 10px 20px 0 20px;
    position: absolute;
    top: 50px;
  }

  .head .mobile img {
    float: left;
    cursor: pointer;
  }

  .head .mobile li {
    float: left;
    list-style: none;
    line-height: 30px;
    padding: 2px 5px;
    background: #fff;
    font-size: 12px;
    border: 1px solid #d6d6d6;
    border-radius: 5px;
    margin-left: 5px;
    margin-bottom: 5px;
  }
  .head .title{
    position: relative;
  }
  .head .title span {
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #A9CDCF;
  }

  .middle {
    height: 480px;
    border-bottom: 1px solid #d6d6d6;
    padding: 0 10px;
    padding-top: 20px;
    overflow: auto;
  }

  .message-wrap {
    padding: 6px 5px;
    width: 100%;
    right: 0;
    min-height: 50px;
    margin: 10px 0;
  }

  .middle .midd-message {
    display: inline-block;
    padding: 0 10px;
    position: relative;
    max-width: 360px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    /*自动换行，允许在单词内换行*/
    background-color: #fafafa;
    float: right;
    margin-right: 23%;
    background: #A9CDCF;
    border-radius: 10px;
  }

  .middle .midd-message img {
    position: absolute;
    right: -100px;
    top: 0px;
  }

  .bottom {
    width: 720px;
    height: 181px;
  }

  .bottom-btn {
    padding-top: 4px;
    padding-left: 5px;
  }

  .bottom-btn img {
    width: 24px;
    height: 24px;
    margin-left: 5px;
    vertical-align: middle;
    cursor: pointer;
  }

  #editArea {
    resize: none;
    height: 104px;
    width: 700px;
    padding: 10px 10px 10px 10px;
    font-size: 14px;
    color: #333;
    overflow: auto;
    border: 0;
    overflow-y: auto;
    overflow-x: hidden;
    white-space: pre-wrap;
    word-break: normal;
    letter-spacing: 1px;
  }

  textarea:focus {
    outline: none;
  }

  .send {
    text-align: right;
    padding-right: 20px;
  }

  .send span {
    display: inline-block;
    width: 90px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #d6d6d6;
    margin-top: 5px;
    background: #A9CDCF;
    border-radius: 5px;
  }

  .send span:hover {
    background: #eeeeee;
    cursor: pointer;
  }

  @media (max-height: 800px), (max-width: 1000px) {
    .rightcontent {
      height: 617px;
    }

    .head {
      padding: 10px 0;
    }

    .head .title span {
      font-size: 24px;
    }

    .middle {
      height: 396px;
      /*border-bottom: 1px solid #d6d6d6;   */
    }

    #editArea {
      height: 80px;
    }
  }
 .SetupPhoto{
   position: absolute;
   top:50%;
   margin-top:-17px;
   cursor:pointer;
 }
</style>
