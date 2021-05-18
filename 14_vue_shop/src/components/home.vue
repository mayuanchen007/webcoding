<template> 
    <!-- 头部区域 -->
    <el-container class='home-container'>
        <el-header>
            <div><img src="../assets/logo.png" alt=""><span>电商后台管理系统</span></div>
            <el-button type="info" @click="layout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <div class="toggle-button">|||</div>
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" unique-opened >
                    <el-submenu :index="item.id+''" v-for="(item) in menus" :key='item.id'>
                        <template slot="title">
                            <i :class="icons[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>  
                        <el-menu-item :index="child.id+''" v-for="(child) in item.children" :key='child.id'>
                            <template >
                                    <i class="el-icon-menu"></i>
                                    <span>{{child.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
        </el-aside>
            <!-- 主页 -->
            <el-main>Main</el-main>
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
          }
      }
  },
  created(){
      this.getMenuList();
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
        console.log(res.data);
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