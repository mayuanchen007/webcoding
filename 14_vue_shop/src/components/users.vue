<template>
    <div>
        <el-breadcrumb >
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card >
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="params.query" class="input-with-select" clearable @clear='initUsers'>
                    <el-button slot="append" @click="initUsers" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addUserDialogVisible">添加用户</el-button>
                </el-col>               
            </el-row>
             <el-table  :data="userList" border style="width: 100%">
                    <el-table-column type="index" label="序号" width="120"> </el-table-column>
                    <el-table-column  prop="username" label="姓名" width="120"> </el-table-column>
                    <el-table-column  prop="email" label="邮箱" width="180"> </el-table-column>
                    <el-table-column  prop="mobile" label="电话" width="180"> </el-table-column>
                    <el-table-column  prop="role_name" label="角色" width="180"> </el-table-column>
                    <el-table-column  prop="mg_state" label="状态" width="180"> 
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row)"></el-switch>
                        </template>
                        
                    </el-table-column>
                    <el-table-column   label="操作" width="180">
                        <el-tooltip class="item" effect="dark" content="用户编辑" placement="top" :enterable=false>
                            <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable=false>
                            <el-button type="primary" icon="el-icon-delete" circle size="mini"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="角色分配" placement="top" :enterable=false>
                            <el-button type="primary" icon="el-icon-setting" circle size="mini"></el-button>
                        </el-tooltip>
                    </el-table-column>
             </el-table>
             <!-- 分页区域 -->
                 <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="params.pagenum" :page-sizes="[1, 2, 4, 10]"
                                :page-size="params.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
            <!-- 添加用户弹出框 -->
            <el-dialog title="提示" :visible.sync="dialogVisible"  width="30%" @close='addDialogVisible'>
                    <el-form :model="userForm" :rules="userFormRules" ref="userFormRef"  label-width="80px">
                        <el-form-item label="用户名" prop='username'>
                            <el-input v-model="userForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop='password'>
                            <el-input v-model="userForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop='email'>
                            <el-input v-model="userForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="手机" prop='mobile'>
                            <el-input v-model="userForm.mobile"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addUser">确 定</el-button>
                    </span>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        var checkEamil=(rule,value,callback)=>{
            const emailRex=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if(emailRex.test(value))
            {
                return callback();
            }
            return callback(new Error('请输入正确的邮箱'));
        }
        var checkMobile=(rule,value,callback)=>{
            const mobileRex=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if(mobileRex.test(value))
            {
                return callback();
            }
            return callback(new Error('请输入正确的手机号'))
        }
        return {
            params:{query:'',pagenum:1,pagesize:4},
            userList:[],
            total:0,
            dialogVisible:false,
            userForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            userFormRules:{
                username:[
                     { required: true, message: '请输入用户名', trigger: 'blur' },
                     { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                password:[
                     { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                email:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {
                        validator:checkEamil,trigger: 'blur'
                    }
                ],
                mobile:[
                     { required: true, message: '请输入密码手机', trigger: 'blur' },
                     {validator:checkMobile,trigger: 'blur'}
                ]
            }
        }
    },
    created(){
        this.initUsers();
    },
    methods:{
        initUsers:async function(){
            const {data:res}=await this.$http.get('/users',{params:this.params});
            console.log(res);
            this.userList=res.data.users;
            this.total=res.data.total;
        },
        handleSizeChange:function(value){
            this.params.pagesize=value;
            this.initUsers();
        },
        handleCurrentChange:function(value)
        {
             this.params.pagenum=value;
             this.initUsers();
        },
        //修改用户状态
        changeState: async function(userinfo){
            const {data:res}= await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`);
            if(res.meta.status!==200){
                userinfo.mg_state=!userinfo.mg_state;
                return this.$message.error('修改用户状态失败');
            } 
        },
        addUserDialogVisible:function(){
            this.dialogVisible=true;
        },
        addDialogVisible(){
            this.$refs.userFormRef.resetFields()
        },
        //添加用户
        addUser(){
            console.log(this.$refs);
            this.$refs.userFormRef.validate(async valid=>{
                if(!valid){
                    return;
                }
                const {data:res}=await this.$http.post('users',this.userForm);
                console.log(res);
                if(res.meta.status!==201) return this.$message.error('添加用户失败');
                this.$message.success('添加用户成功');
                this.dialogVisible=false;
            });
        }
    }
   
}
</script>
<style lang="less" scoped>

</style>