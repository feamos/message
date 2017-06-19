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
      <div class="message-wrap">
        <el-card class="message-card">
          <div v-for="item in messages" class="message-list">
            {{item.message}}
          </div>
        </el-card>
        <!--<div class="midd-message">-->
        <!--{{message}}-->
        <!--&lt;!&ndash;<img src="./imgs/user.jpg" width="80px" height="80px" alt="">&ndash;&gt;-->
        <!--</div>-->
        <br class="clfl">
      </div>
      <!--保存成功之后弹出保存成功对话框-->
      <div v-if="saveContents" class="save-content" @click="saveContents = false">
        <div class="save-contain" @click.stop="">
          <span>
            保存成功！！！
          </span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-btn">
        <img src="./imgs/{}.png" alt="" @click="addString()">
        <img src="./imgs/table.png" @click="importExcel = true" alt="">
        <img src="./imgs/format.png" @click="tem = true" style="width: 40px;height: 28px;" alt="">
        <img src="./imgs/save.png" style="width:20px; height:20px"
             @click="saveContent(templateContent, chat.id, chat.name)">
      </div>
      <div>
        <textarea id="editArea" v-model='templateContent'></textarea>
      </div>
      <div class="send">
        <span @click="checkMessage(templateContent, chat.id)">发送</span>
      </div>
    </div>
    <!--以下是上传文件的部分-->
    <div v-if="importExcel" class="upload-back" @click="importExcel = false">
      <div class="upload-contain" @click.stop="">
        <div class="upload-file">
          <el-upload
            class="upload-demo"
            drag
            :action="uploadUrl()"
            :headers="uploadToken()"
            :on-success="uploadSuccess"
            :on-change="handleChange"
            :file-list="fileList">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
          </el-upload>
        </div>
      </div>
    </div>
    <tem v-if="tem" @cancel="tem = false"></tem>
  </div>
</template>

<script>
  import tem from './template.vue'
  import API from '@/common/API/api'
  export default {
    name: 'app',
    data () {
      return {
        list1: false,
        importExcel: false, //  上传表格
        tem: false,
        saveContents: false, //  保存成功弹出框
        showSetupPhoto: false,
        messages: [{
          message: ''
        }],
        templateContent: '',
        fileList: [],
        urlId: '',  //  上传的文件所属模板ｉｄ
        chat: {
          name: '发起聊天',
          template: '',
          chengyuan: [],  //  成员
          checkFlag: false
        }
      }
    },
    components: {
      tem
    },
    mounted () {
      this.$bus.on('responseChat', (i) => {
        this.chat = i
        this.chat.name = i.tempName  //  把获取的模板名称替换到数组定义的名称
//        this.chat.template = i.content  //  获取到的模板内容
        this.templateContent = i.content
        this.urlId = i.id
        console.log('显示的urlId:' + this.urlId)
      })
    },
    created () {             // 这里接受从chat.vue中传递过来的被选中的群组的名称，并替换默认chat.name的值(by lee)
      var that = this
      this.$bus.on('hello', function (groupName) {
        that.chat.name = groupName
        that.showSetupPhoto = true
      })
    },
    methods: {
      checkMessage (msg, id) {
        if (msg) {
          console.log('message: ' + msg)
          console.log('id号:' + id)
          this.importExcel = true
//          this.sendMessage(msg, id)
          this.urlId = id
        }
      },
      handleChange (file, fileList) {
        this.fileList = fileList.slice(-3)
        console.log('文件' + file)
      },
      uploadUrl () {
        console.log(this.urlId)
        return API.template + '/' + this.urlId + '/send'
      },
      /**
       *文件上传时需要token
       **/
      uploadToken () {
        let token = localStorage.getItem('token')
        let header = {
          'token': token
        }
        return header
      },
      /**
       *文件上传成功后执行的事件
       **/
      uploadSuccess (response) {
        this.importExcel = false
        this.$message('发送成功！！！')
        console.log('code:' + response.code)
        console.log('uuid:' + response.data.uuid)
        localStorage.setItem('uuid', response.data.uuid)
        this.getMessage()
      },
      /**
       *获取消息历史记录列表
       **/
      getMessage () {
        let uuid = localStorage.getItem('uuid')
        let token = localStorage.getItem('token')
        if (token) {
          fetch(API.loginfo + 'uuid=' + uuid, {
            method: 'GET',
            headers: {
              'token': token,
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          }).then((res) => {
            return res.json()
          }).then((json) => {
            if (json.code === 0) {
              this.messages = json.data.logs
//              json.data.logs.forEach(function (value) {
//                console.log('mess:' + value.message)
//              })
              console.log(json.data.logs)
            }
            console.log(json)
          })
        }
      },
      /**
       *添加花括号{}的事件
       **/
      addString () {
        let textContent = document.getElementById('editArea').value
        let value = this.templateContent
        let isBrack = /\{[0-9]}/g  //  定义正则是否存在花括号{}
        isBrack.test(textContent)  //  进行花括号的匹配
        let count = 0
        while (isBrack.lastIndex !== 0) {
          //  如果返回的匹配的位置不为0，则表示存在{}，计数count+1，并且继续向下匹配，直到匹配失败
          count++
          isBrack.test(textContent)
        }
        value += '{' + count + '}'
        this.templateContent = value
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
            console.log('保存成功！！！')
            this.saveContents = true
            let that = this
            setTimeout(function () {  //  设置定时显示保存成功的按钮
              that.saveContents = false
            }, 1000)
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
    white-space: nowrap;
    display: inline-block;
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

  .head .title {
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
    /*padding: 0 10px;*/
    /*padding-top: 20px;*/
    display: table;
    margin: 0 auto;
    text-align: center;
  }

  .message-wrap {
    padding: 6px 5px;
    width: 100%;
    right: 0;
    min-height: 50px;
    margin: 10px 0;
  }

  /*.middle .midd-message {*/
  /*display: inline-block;*/
  /*padding: 0 10px;*/
  /*position: relative;*/
  /*max-width: 360px;*/
  /*line-height: 2.5;*/
  /*font-size: 12px;*/
  /*text-align: left;*/
  /*word-break: break-all;*/
  /*!*自动换行，允许在单词内换行*!*/
  /*background-color: #fafafa;*/
  /*!*float: right;*!*/
  /*margin-right: 23%;*/
  /*background: #A9CDCF;*/
  /*border-radius: 10px;*/
  /*}*/

  /*.middle .midd-message img {*/
  /*position: absolute;*/
  /*right: -100px;*/
  /*top: 0px;*/
  /*}*/

  .message-card {
    width: 400px;
    max-height: 300px;
    overflow-y: auto;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }

  .message-list {
    font-size: 20px;
    margin: 20px 0;
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

  .SetupPhoto {
    position: absolute;
    top: 50%;
    margin-top: -17px;
    cursor: pointer;
  }

  .save-content {
    position: fixed;
    z-index: 120;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(101, 101, 101, .2);
  }

  .save-contain {
    position: fixed;
    z-index: 121;
    width: 220px;
    height: 100px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, .4);
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #596179;
  }

  .upload-back {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(51, 51, 51, .1);
    justify-content: center;
    align-items: center;
    transition: opacity .3s ease;
  }

  .upload-contain {
    display: flex;
    vertical-align: middle;
    margin: 0 auto;
    padding: 0 20px;
    height: 360px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, .6);
    font-family: PingFangSC-Regular;
  }

  .upload-file {
    position: relative;
  }

  .upload-button {
    position: absolute;
    margin-top: 150px;
  }
</style>
