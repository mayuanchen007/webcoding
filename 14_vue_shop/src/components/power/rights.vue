<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card >
            <el-table :data="rightList" border style="width: 100%"> 
                <el-table-column type="index" >#</el-table-column>
                <el-table-column prop="authName" label="权限名称"> </el-table-column>
                <el-table-column prop="path" label="路径"> </el-table-column>
                <el-table-column prop="level" label="权限等级">
                     <template slot-scope="scope">
                            <el-tag type="success" v-if='scope.row.level==="1"'>一级</el-tag>
                            <el-tag type="info" v-else-if='scope.row.level==="2"'>二级</el-tag>
                            <el-tag type="warning" v-else>三级</el-tag>
                    </template>
                </el-table-column>
               
            </el-table>
        </el-card>
    </div>
    
</template>
<style lang="less" scoped>

</style>
<script>
export default {
    data(){
        return {
            rightList:[]
        }
    },
    created(){
        this.initRightList();
    },
    methods:{
        async initRightList(){
            const {data:res}=await this.$http.get('/rights/list');
            console.log(res);
            if(res.meta.status!==200) return this.$message.error('获取权限列表失败');
            this.rightList=res.data;
            console.log(this.rightList);
        }
    }
}
</script>