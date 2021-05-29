<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限名称</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row>
                <el-col :span="24">
                     <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>
            <el-table :data="rolesList" border style="width: 100%" stripe>
                <el-table-column type="expand">
                    <template slot-scope="scope">
                         <el-row v-for="(item1,i1) in scope.row.children" :key='i1' :class="['tagcenter','bdbottom',i1===0?'bdtop':'']">
                             <el-col :span="5">
                                 <el-tag>{{item1.authName}}</el-tag><i class="el-icon-caret-right"></i>
                             </el-col>
                             <el-col :span="19">
                                 <el-row v-for="(item2,i2) in item1.children" :key='i2' :class="['tagcenter',i2!==0?'bdtop':'']">
                                     <el-col :span="6">
                                         <el-tag type="info">{{item2.authName}}</el-tag><i class="el-icon-caret-right"></i>
                                     </el-col>
                                     <el-col :span="18">
                                         <el-tag type="warning" v-for="(item3,i3) in item2.children" :key='i3' closable @close='removeRightById(scope.row,item3.id)'>{{item3.authName}}</el-tag>
                                     </el-col>
                                 </el-row>
                             </el-col>
                         </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index"  label="#" width="50"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述" ></el-table-column>
                <el-table-column prop="roleName" label="操作">
                    <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit"  size="small">编辑</el-button>
                            <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
                            <el-button type="info" icon="el-icon-setting"  size="small" @click="fenpeiPower(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 分配权限页面 -->
        <el-dialog title="分配权限" :visible.sync="powerDialogVisible" width="30%" @close='closePowerDialogVisible'>
            <el-tree :props="props" :data="rightsList" node-key='id'  ref="tree" :default-expand-all=true show-checkbox :default-checked-keys='defleaves'>
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="powerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRights">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return {
            rolesList:[],
            rightsList:[],
            powerDialogVisible:false,
             props: {
                        label: 'authName',
                        children: 'children'
                    },
            defleaves:[],
            roleId:''
        }
    },
    created(){
        this.initRoles();
    },
    methods:{
       async initRoles(){
           const {data:res}=await this.$http.get('/roles');
           if(res.meta.status!==200) return this.$message.error('初始化角色列表失败');
           this.rolesList=res.data;
        }
        ,
       async removeRightById(role,id){
            const result=await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).catch(error=>error);
            if(result==='cancel') return this.$message.info('取消删除');
            //执行删除
            const {data:res}=await this.$http.delete(`roles/${role.id}/rights/${id}`);
            if(res.meta.status!==200) return this.$message.error("删除失败");
            this.$message.success("删除成功");
            role.children=res.data;
        },
        //获取权限
        async fenpeiPower(role){
            this.powerDialogVisible=true;
            const {data:res}=await this.$http.get('/rights/tree');
            if(res.meta.status!==200) return this.$message.error("获取权限失败");
            //获取勾选的权限

            role.children.forEach(item=>{
                this.getcheckLeaves(item,this.defleaves);
            });
            this.rightsList=res.data;
            this.roleId=role.id;
        },
        closePowerDialogVisible(){
            this.rightsList=[];
        },
        //获取权限列表 递归获取ID
        getcheckLeaves(node,arr){
            if(!node.children){
               return arr.push(node.id);
            }
            else{
                node.children.forEach(item=>{
                    this.getcheckLeaves(item,arr);
                });
            }
        },
        //保存分配权限
        async saveRights(){
            const arr=[...this.$refs.tree.getCheckedKeys(),...this.$refs.tree.getHalfCheckedKeys()];
            const str=arr.join(',');
            const {data:res}=await this.$http.post(`roles/${this.roleId}/rights`,{rids:str});
            if(res.meta.status!==200) return this.$message.error('分配权限失败');
             this.powerDialogVisible=false;
            this.$message.success('分配权限成功');
            this.initRoles();
        }
    }
}
</script>
<style lang="less" scoped>
    .el-tag{
        margin: 7px;
    }
    .bdtop{
        border-top: 1px solid #eee
    }
    .bdbottom{
        border-bottom: 1px solid #eee;
    }
    .tagcenter{
        display: flex;
        align-content: center;
    }
</style>