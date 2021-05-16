<template>
   <div class="login_container">
       <!-- 头像部分 -->
       <div class="login_box">
           <div class="avatar_box">
               <img src="../assets/logo.png" alt="">
           </div>
            <!-- 用户名密码 -->
            <el-form :model='login_form' :rules="login_form_rules" ref="loginForm" label-width="0px" class="login_form">
                <el-form-item prop='username' >
                    <el-input v-model="login_form.username" prefix-icon="iconfont icon-user" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop='password'>
                    <el-input v-model="login_form.password" type='password' prefix-icon="iconfont icon-3702mima" placeholder="请输入密码"></el-input>
                </el-form-item>
                 <el-form-item class="btns">
                    <el-button type="primary" @click='login'>登录</el-button>
                    <el-button type="success" @click='reset' >重置</el-button>
                </el-form-item>
            </el-form>
       </div>    
   </div>
</template>
<script>
export default {
   data(){
       return {
           login_form:{
               username:"admin",
               password:"123456"
           },
           login_form_rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
                    ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
       }
   },
  methods:{
      //重置表单
      reset(){
          this.$refs.loginForm.resetFields();
      },
      //登录验证
      login(){
          this.$refs.loginForm.validate(async valid=>{
              if(valid){
                  //发送请求
                const {data:res}= await  this.$http.post('login',this.login_form);
                console.log(res);
                if(res.meta.status==400) return this.$message.error(res.meta.msg);
                if(res.meta.status==200)  this.$message.success(res.meta.msg);
                //记录登录token
                window.sessionStorage.setItem('token',res.data.token);
                //跳转主页
                this.$router.push('/home');
              }
              else{
                  console.log('error submit!!');
            return false;
              }
          })
      }
  }
}
</script>
<style lang="less"  scoped>
    .login_container{
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box{
        width: 450px;
        height:300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .avatar_box{
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left:50%;
            transform: translate(-50%,-50%);
            background-color: #fff;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
    
</style>
