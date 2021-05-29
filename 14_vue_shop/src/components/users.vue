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
                    <el-table-column type="index" label="#"> </el-table-column>
                    <el-table-column  prop="username" label="姓名"> </el-table-column>
                    <el-table-column  prop="email" label="邮箱" > </el-table-column>
                    <el-table-column  prop="mobile" label="电话" > </el-table-column>
                    <el-table-column  prop="role_name" label="角色" > </el-table-column>
                    <el-table-column  prop="mg_state" label="状态"> 
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row)"></el-switch>
                        </template>
                        
                    </el-table-column>
                    <el-table-column   label="操作" >
                        <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="用户编辑"  placement="top" :enterable=false>
                            
                            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editUserDialogVisible(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable=false>
                            <el-button type="primary" icon="el-icon-delete" circle size="mini" @click="removeUserById(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="角色分配" placement="top" :enterable=false>
                            <el-button type="primary" icon="el-icon-setting" circle size="mini" @click="fenpeiRole(scope.row)"></el-button>
                        </el-tooltip>
                        </template>
                    </el-table-column>
             </el-table>
             <!-- 分页区域 -->
                 <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="params.pagenum" :page-sizes="[1, 2, 4, 10]"
                                :page-size="params.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
            <!-- 添加用户弹出框 -->
            <el-dialog title="添加用户" :visible.sync="dialogVisible"  width="30%" @close='addDialogVisible'>
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
            <!-- 点击编辑弹出页面 -->
            <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="30%" @close='resetFiled'>
                     <el-form :model="editForm" :rules="editFormRules" ref="editFormRef"  label-width="80px">
                        <el-form-item label="用户名" prop='username'>
                            <el-input v-model="editForm.username" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop='email'>
                            <el-input v-model="editForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="手机" prop='mobile'>
                            <el-input v-model="editForm.mobile"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="editDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitEdit">确 定</el-button>
                    </span>
            </el-dialog>
            <!-- 点击分配角色弹出页面 -->
            <el-dialog title="角色分配" :visible.sync="roleDialogVisible" width="30%" @close='clearRole'>
                <span><p>当前的用户:{{userinfo.username}}</p></span>
                <span><p>当前的角色:{{userinfo.role_name}}</p></span>
                 <el-select v-model="role" placeholder="请选择">
                    <el-option  v-for="item in roleList"  :key="item.id"  :label="item.roleName" :value="item.id"> </el-option>
                </el-select>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="roleDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveRoleById(userinfo.id)">确 定</el-button>
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
            editDialogVisible:false,
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
            ,
            editForm:{
                
            },
            editFormRules:{
                email:[{required: true, message: '请输入邮箱', trigger: 'blur' },{validator:checkEamil,trigger: 'blur'}],
                mobile:[ { required: true, message: '请输入密码手机', trigger: 'blur' },
                     {validator:checkMobile,trigger: 'blur'}]
            },
            roleDialogVisible:false,
            userinfo:{},
            roleList:[],
            role:''
        }
    },
    created(){
        this.initUsers();
    },
    methods:{
        initUsers:async function(){
            const {data:res}=await this.$http.get('/users',{params:this.params});
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
            this.$refs.userFormRef.validate(async valid=>{
                if(!valid){
                    return;
                }
                const {data:res}=await this.$http.post('users',this.userForm);
                if(res.meta.status!==201) return this.$message.error('添加用户失败');
                this.$message.success('添加用户成功');
                this.dialogVisible=false;
            });
        },
        //编辑用户
        async editUserDialogVisible(id){
            this.editDialogVisible=true
            const {data:res} =await this.$http.get('users/'+id);
            if(res.meta.status!=200) return this.$message.error("查询用户失败");
            this.editForm=res.data;
        },
        resetFiled(){
            this.$refs.editFormRef.resetFields();          
        },
        submitEdit(){
            this.$refs.editFormRef.validate(async valid=>{
                if(!valid) return;
                //提交修改
                const {data:res}=await this.$http.put('/users/'+this.editForm.id,{email:this.editForm.email,mobile:this.editForm.mobile});
                if(res.meta.status!==200) return this.$message.error('修改用户失败');
                this.editDialogVisible=false;
                this.$message.success('修改用户成功');
                this.initUsers();
            });
        },
        //删除用户
        async removeUserById(id){
            const result=await  this.$confirm('是否删除用户?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                         }).catch(err=> err);
                         console.log(result);
                         if(result==='cancel') return this.$message.info('已取消删除');
            const {data:res}=await this.$http.delete('users/'+id);
            if(res.meta.status!==200) return this.$message.error('删除失败');
            this.$message.success('删除成功');
            this.initUsers();
        },
        //分配角色
        async  fenpeiRole(user)
        {
            this.userinfo=user;
            //获取所有角色填充下拉框
            const {data:res}=await this.$http.get('/roles');
            if(res.meta.status!==200) return this.$message.error('获取角色失败');
            this.roleList=res.data;
            this.roleDialogVisible=true;
        },
        clearRole(){
            this.roleList=[];
            this.userinfo={};
            this.role='';
        },
        async saveRoleById(id){
            if(!this.role)
            {
                return this.$message.error('请选择角色');
            }
            const {data:res}= await this.$http.put(`users/${id}:id/role`,{rid:this.role});
            if(res.meta.status!==200) return this.$message.error('分配角色失败');
            this.roleDialogVisible=false;
            this.$message.success('分配角色成功');    
            this.initUsers();
        }
    }
   
}
</script>
<style lang="less" scoped>

</style> 