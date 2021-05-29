<template> 
    <!-- 头部区域 -->
    <el-container class='home-container'>
        <el-header>
            <div><img src="../assets/logo.png" alt=""><span>电商后台管理系统</span></div>
            <el-button type="info" @click="layout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="!iscollapse?'200px':'64px'">
                <div class="toggle-button" @click='tochange'>|||</div>
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" unique-opened :collapse='iscollapse' :collapse-transition='false' router :default-active='activeIndex'>
                    <el-submenu :index="'/'+item.path" v-for="(item) in menus" :key='item.id'>
                        <template slot="title">
                            <i :class="icons[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>  
                        <el-menu-item :index="'/'+child.path+''" v-for="(child) in item.children" :key='child.id' @click='setActive(child.path)'>
                            <template >
                                    <i class="el-icon-menu"></i>
                                    <span>{{child.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
        </el-aside>
            <!-- 主页 -->
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data(){
      return{
          menus:[],
          icons:{
              '125':'iconfont icon-users',
              '103':'iconfont icon-tijikongjian',
              '101':'iconfont icon-shangpin',
              '102':'iconfont icon-danju',
              '145':'iconfont icon-baobiao'
          },
          iscollapse:false,
          activeIndex:''
      }
  },
  created(){
      this.getMenuList();
      this.activeIndex=sessionStorage.getItem('activeIndex');
  },
  methods:{
      layout(){
          window.sessionStorage.clear();
          this.$router.push('/login')
      },
      async getMenuList(){
        const {data :res}= await this.$http.get('menus');
        if(res.meta.status!==200) return this.$message.error("获取左侧菜单失败");
        this.menus=res.data;
      },
      tochange(){
          this.iscollapse=! this.iscollapse;
      },
      setActive(value){
          sessionStorage.setItem('activeIndex',"/"+value);
          this.activeIndex=sessionStorage.getItem('activeIndex');
      }
  }
}
</script>
<style lang="less" scoped>
    .el-header{
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        color: rgb(255, 255, 255);
        font-size: 20px;
        >div{
            display: flex;
            align-items: center;
            span{
                margin-left: 15px;
            }
        }
    }
    img{
        width: 50px;
        height: 50px;
    }
    .el-aside{
        background-color: #333744;
        .el-menu{
            border-right: 0;
        }
    }
    .el-main{
         background-color: #eaedf1;
    }
    .home-container{
        height: 100%;
    }
    .iconfont{
        margin-right: 10px;
    }
    .toggle-button{
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 1px;
        cursor: pointer;
    }
</style>