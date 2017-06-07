<template>
  <div class="change-pass" @click="$emit('closeNewMsg')">
    <!--在遮罩层定义点击事件，关闭模态框-->
    <div class="contain" @click.stop="">
      <!--修饰符.stop阻止事件冒泡-->
      <ul class="template-ul" @click.stop="">
        <li v-for="(tempName, index) in tempNames" class="template-li"
            :class="{ active: tempName.isActive }"
            @click.stop="selectShowTemplate(index, tempName)"
            @mouseenter="$emit('hoverIntemplate', index)"
            @mouseleave="$emit('hoverOuttemplate', index)">
          <transition name="fade">
            <button v-show="tempName.renameButton" class="rename"
                    @click.stop="$emit('renameInput', index)">编辑
            </button>
          </transition>
          <!--修改模板-->
          <div v-if="tempName.renameTemp" class="edit-contain" @click.stop="">
              <div class="edit">
                <span> 修 改 模 板 </span>
                <div class="contain-head">
                  模板名称
                  <input class="create-input" type="text"
                         v-model="tempName.tempName">
                </div>
                <div class="contain-body">
                  模板内容
                  <Input class="content-text" type="textarea"
                         :rows="3" v-model="tempName.content"></Input>
                </div>
                <div class="edit-buttons">
                  <button class="cancel-edit-button" @click="tempName.renameTemp=false">
                    取消
                  </button>
                  <button class="ok-edit-button"
                          @click="changeTemplate(tempName.tempName, tempName.id, tempName.content)">
                    确定</button>
                </div>
            </div>
          </div>
          <span v-else class="li-span">{{tempName.tempName}}</span>
          <transition name="fade">
            <button v-show="tempName.renameButton" class="delete-tmp"
                    @click.stop="deleteTemp(tempName.tempName)">删除
            </button>
          </transition>
          <div class="sure-delete-temp" v-if="showDeleteTemp" @click.stop="">
            <!--删除模板确定模态框显示-->
            <div class="sure-delete-contain">
              <div class="warn-text-contain">
                <span class="warn-text">确定删除该模板吗？</span>
              </div>
              <Checkbox class="no-mention">以后不再提示</Checkbox>
              <div class="buttons">
                <button class="cancel-change-button" @click="showDeleteTemp=false">
                  取消
                </button>
                <button class="ok-change-button" @click="sureDelete(item)">确定</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="new-temp-container">
        <button class="new-temp-button" @click.stop="$emit('createTemplate')">新建模板</button>
        <!--新建模板的事件定义在父组件chattemplate中-->
      </div>
    </div>
    <addtemp v-if="addTemp" @confirmAdd="$emit('addTemplate');addTemp = false"
             @cancelAdd="addTemp = false"></addtemp>
    <!--添加模板弹出二次确认框-->
  </div>
</template>

<script>
  import addtemp from './addtemp.vue'
  export default {
    data () {
      return {
        pass: '',
        ensurepass: '',
        addTemp: false, //  添加模板的二次确认框显示与否
        renameTemp: false,
        createTemp: false,
        showDeleteTemp: false,
        item: Number, //        显示二次确定删除模板
        changeTemplateName: '', //        修改模板名称
        changeContent: ''  //  修改的内容
      }
    },
    components: {
      addtemp
    },
    props: ['tempNames'],
    methods: {
      /**
       * 删除弹出二次确定框
       * @param tempName传递的是数组中模板的名称
       */
      deleteTemp (tempName) {
        this.showDeleteTemp = true
        this.item = tempName
      },
      /**
       *确认删除
       * @param item指传递的删除的名称
       **/
      sureDelete (item) {
        console.log('选中' + item)
        this.showDeleteTemp = false
        this.$emit('deleteTempName', item)
      },
      selectShowTemplate (index, temp) {
        this.$emit('selectLi', index)
        this.sendTemp(temp)  //  传递的是添加到模板的值
      },
      /**
       *修改模板名称
       * @param tempName需要修改的名称
       */
      changeTemplate (tempName, changeId, contents) {
        console.log('要修改的名称： ' + tempName)
        console.log('准备修改的id： ' + changeId)
        console.log('要修改的content：' + contents)
        this.$emit('changeTempName', tempName, changeId, contents)
        //  传递的值分别为修改后的名称，以及选中的模板id
        this.renameTemp = false
      },
      sendTemp (temp) {
        this.$bus.$emit('sendTemp', temp)
        console.log('提交的数据：' + temp.tempName)
        this.addTemp = true
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }

  .change-pass {
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    display: flex;
    background-color: rgba(51, 51, 51, .5);
    justify-content: center;
    align-items: center;
    transition: opacity .3s ease;
  }

  .contain {
    z-index: 99;
    display: table-cell;
    vertical-align: middle;
    position: absolute;
    bottom: 10%;
    left: 30%;
    margin: 0 auto;
    width: 200px;
    max-height: 250px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #596179;
    background: #FFFFFF;
    border: .5px solid #596179;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  }

  .sure-delete-temp {
    z-index: 120;
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sure-delete-contain {
    position: fixed;
    z-index: 121;
    width: 320px;
    height: 160px;
    background: #FFFFFF;
    border: 1px solid #979797;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }

  .edit-contain {
    z-index: 130;
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .edit {
    z-index: 1;
    display: table-cell;
    vertical-align: middle;
    margin: 0 auto;
    width: 440px;
    height: 340px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    color: #596179;
    background: #FFFFFF;
    border: .5px solid #596179;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  }

  .edit span {
    font-size: 28px;
  }
  .contain-head, .contain-body {
    font-size: 24px;
    color: #596179;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .edit-buttons {
    margin-top: 50px;
  }
  .buttons, .edit-buttons {
    display: flex;
    justify-content: space-between;
  }

  .cancel-change-button, .ok-change-button {
    border: none;
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #596179;
    background: none;
    outline: none;
  }

  .cancel-change-button:hover, .ok-change-button:hover, .ok-edit-button:hover, .cancel-edit-button:hover {
    color: #A9CDCF;
  }

  .cancel-change-button, .cancel-edit-button {
    border-right: 1px solid rgba(89, 97, 121, 0.38);
    width: 160px;
    margin-left: 10px;
  }

  .ok-change-button {
    width: 160px;
    padding-right: 50px;
  }
  .cancel-edit-button, .ok-edit-button {
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #596179;
    background: none;
    outline: none;
  }

  .cancel-edit-button {
    border-right: 1px solid rgba(89, 97, 121, 0.38);
    width: 210px;
    margin-left: 10px;
  }

  .ok-edit-button {
    width: 210px;
    padding-right: 50px;
  }

  .create-input {
    width: 240px;
    border: none;
    outline: none;
    margin-left: 20px;
    border-bottom: 1px solid #596179;
  }
  .content-text {
    width: 240px;
    margin-left: 20px;
  }
  .rename, .delete-tmp {
    font-size: 14px;
    color: #7D88AC;
    border: none;
    outline: none;
    cursor: pointer;
    background: none;
    height: 47px;
    line-height: 47px;
    position: absolute;
    font-family: PingFangSC-Regular;
  }

  .rename {
    margin-left: -50px;
  }

  .delete-tmp {
    margin-left: 10px;
  }

  .rename:hover, .delete-tmp:hover {
    color: #49526A;
  }

  .li-span {
    display: inline-block;
    width: 80px;
    height: 47px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
  }

  .template-ul {
    overflow: auto;
    max-height: 200px;
    min-height: 200px;
  }

  .template-li, .template-li:link {
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #596179;
    height: 47px;
    line-height: 47px;
    border-bottom: 1px solid #596179;
    cursor: pointer;
    position: relative;
  }

  .template-li:hover, .template-li:target, .active {
    background: #CDE7E9;
  }

  .active {
    background: #A9CDCF;
  }

  .new-temp-container {
    text-align: center;
    height: 49px;
    line-height: 49px;
    border-top: 1px solid #D8D8D8;
  }

  .new-temp-button {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: rgba(89, 97, 121, 0.58);
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .warn-text-contain {
    margin-top: 10px;
  }

  .warn-text {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #596179;
    position: relative;
  }

  .no-mention {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #596179;
  }

  .warn-text .no-mention {
    position: absolute;
    margin-left: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
