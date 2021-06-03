<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类参数</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
             <el-alert class="tx" title="注意：只允许为第三级分类设置相关的参数！" show-icon type="warning"></el-alert>
             <span>选择商品分类：</span>
             <!-- 级连选择框 -->
               <el-cascader v-model="cate" :options="cateList" :props="cateProps"  @change="handleChange"></el-cascader>
            <!-- tab页 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="动态参数" name="many">
                     <el-button type="primary" :disabled='isBtnDisabled'>添加参数</el-button>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="only">
                     <el-button type="primary" :disabled='isBtnDisabled'>添加属性</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            cateList:[],
            cate:[],
            cateProps:{
                value: 'cat_id',
                label: 'cat_name',
                children:'children',
                expandTrigger: 'hover' 
            },
            activeName:'only',
            onlyTable:[],
            manyTable:[]
        }
    },
    created(){
        this.initCateList();
    },
    methods:{
        async initCateList(){
            const {data:res}=await this.$http.get('/categories',{params:{type:3}});
            if(res.meta.status!==200) return this.$message.erroe("获取商品分类失败");
            this.cateList=res.data;
        },
        async handleChange(){
            console.log(this.cate);
            if(this.cate.length!==3)
            {
               this.cate=[];
               return;
            }
           this.getAttributes();
        },
        async handleClick(){
            this.getAttributes();
        },
        async getAttributes(){
            console.log(this.cat_id);
            const {data:res}=await this.$http.get(`/categories/${this.cat_id}/attributes`,{params:{sel:this.activeName}});
            if(res.meta.status!==200) return this.$message.error("获取参数失败");
            if(this.activeName==='only'){
               this.onlyTable=res.data;
            }
            else{
                 this.manyTable=res.data;
            }
        }

    },
    computed:{
        isBtnDisabled(){
            if(this.cate.length!==3)
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        cat_id(){
             if(this.cate.length===3)
            {
                return this.cate[2];
            }
            else
            {
                return null;
            }
        }
        
    }
}
</script>
<style lang="less" scoped>
    .tx{
        margin: 15px 0;
    }
</style>