<template>
    <div class="rightcontent">
        <div class="head">
            <div class="title">
                <span href="javascript:;" @click="list1 = !list1">{{ chat.name }}</span>
                <div class="mobile" v-if="list1">
                  <img src="./imgs/add.png" alt=""><li v-for="mobile in chat.mobiles">{{mobile}}</li>
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
              <img src="./imgs/{}.png" alt="">
              <img src="./imgs/table.png" alt="">
              <img src="./imgs/format.png" style="width: 40px;height: 28px;" alt="">
            </div>
            <div>
                <textarea
                  id="editArea"
                  v-model='chat.template'
                  >
                </textarea>
              <!--placeholder="发送前请先：1,导入Excel表格 2,编辑对话框内容-->
              <!--注意：{1}表示Excel表格的第一列对应数据-->
              <!--{2}表示Excel表格的第二列,以此类推"-->
            </div>
            <div class="send">
                <span @click="checkMessage(chat.template)">发送</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      list1: false,
      message: '',
      chat: {
        name: '发起聊天'
      }
    }
  },
  mounted: function () {
    this.$bus.on('responseChat', (i) => {
      this.chat = i
    })
  },
  methods: {
    checkMessage (msg) {
      if (this.message) {
        this.sendMessage(msg)
      }
    },
    sendMessage (msg) {
      msg.push(this.message)
      this.message = ''
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
   clear:both;
 }
 .head {
    position: relative;
    text-align: center;
    margin: 0 19px;
    padding: 30px 0px;
    line-height: 30px;
    text-decoration: none;
    font-size: 13px;
    border-bottom: 1px solid rgba(89,97,121,0.38);
 }
 .head span {
    cursor: pointer;
    width:200px;
 }
 .head img {
    margin-left: 3px;
 }
 .head .mobile {
   padding:10px 20px 0 20px;
   position: absolute;
   top:50px;
 }
 .head .mobile img {
   float: left;
   cursor: pointer;
 }
 .head .mobile li{
   float: left;
   list-style: none;
   line-height: 30px;
   padding:2px 5px;
   background: #fff;
   font-size:12px;
   border:1px solid #d6d6d6;
   border-radius: 5px;
   margin-left: 5px;
   margin-bottom: 5px;
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
    overflow-y:auto;
    overflow-x:hidden;
    white-space: pre-wrap;
    word-break: normal;
    letter-spacing: 1px;
 }
 textarea:focus {
    outline: none;
 }
 .send {
    text-align:right;
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
 @media (max-height: 800px), (max-width: 1000px){
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
</style>
