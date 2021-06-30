<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value='inputValue' @change="changeInputValue" />
    <a-button type="primary" @click='addItem1'>添加事项</a-button>

    <a-list bordered :dataSource="getList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked='item.done' @click="(e)=>{changeIsDone(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{sumWWC}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="flag==='all'?'primary':''"  @click="changeState('all')">全部</a-button>
          <a-button :type="flag==='undo'?'primary':''"  @click="changeState('undo')">未完成</a-button>
          <a-button :type="flag==='do'?'primary':''"  @click="changeState('do')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="cleanDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import {mapState,mapMutations,mapGetters} from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  created(){
      this.$store.dispatch('getList')
  },
  computed:{
    ...mapState(['list','inputValue','flag']),
    ...mapGetters(['sumWWC','getList'])
  },
  methods:{
    ...mapMutations(['getInputValue','addItem','removeItemByid','changStatus','cleanDone']),
    changeInputValue(e){
        this.getInputValue(e.target.value)
    },
    addItem1(){
      this.addItem();
    },
    removeItem(id){
      this.removeItemByid(id);
    },
    changeIsDone(e,id){
      console.log(e);
      const param={
          id,
          done:e.target.checked
      }
      this.$store.commit('changeIsDoneById',param)
    },
    changeState(flag){
        this.changStatus(flag);
        console.log(this.getList);
    }
  }
}
</script>
<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>