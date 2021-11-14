import React from 'react'
import {NavBar,Icon,Flex,WingBlank,WhiteSpace,InputItem,List,Button,Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import {API} from '../../utils/api'
import {withFormik,ErrorMessage} from 'formik'
import * as yup from 'yup'
import './index.css'
 class Login extends React.Component{

    // state={
    //     username:'',
    //     password:''
    // }

    // getUserName=(e)=>{
    //     this.setState({
    //         username:e
    //     })
    // }

    // getPassWord=(e)=>{
    //     this.setState({
    //         password:e
    //     })
    // }

    //  handleSubmit= async ()=>{
    //      const {data}= await API.post('/user/login',{
    //         username: this.state.username,
    //         password: this.state.password
    //     });
    //     if(data.status===200)
    //     {
    //         Toast.success(data.description, 2);
    //         window.localStorage.setItem('hkzf_token',data.body.token);
    //     }
    //     else{
    //         Toast.fail(data.description, 2);
    //     }
    // }

    render(){
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = this.props;
        return (
            <div className='login'>
                {/* 头部 */}
                <NavBar className='nav'
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.go(-1)}}
                >账号登录</NavBar>
                <WhiteSpace size='xl'></WhiteSpace>
                {/* 登录表单 */}
                <WingBlank>
                    <form action="">
                        <div>
                            <List>
                                <WhiteSpace size='xl'/>
                                <input placeholder="请输入账号" name='username' value={values.username} onBlur={handleBlur} onChange={handleChange}  />
                            </List>
                            <ErrorMessage className='error'  name="username" component="div" />
                            <List>
                                <WhiteSpace size='xl'/>
                                <input placeholder="请输入密码" name="password" value={values.password} onBlur={handleBlur} type="password" onChange={handleChange} />
                            </List>
                            <ErrorMessage className='error'  name="password" component="div" />
                        </div>
                        <WhiteSpace size='xl'/>
                        <Button type="primary" onClick={handleSubmit} >登录</Button><WhiteSpace />
                    </form>
                    <Link to='/'><div className='registory'><span>还没有账号，去注册~</span></div></Link>
                </WingBlank>
            </div>
        )
    }
}

Login = withFormik({
    mapPropsToValues: () => ({ username: '' ,password:''}),
  
    // Custom sync validation
    // validate: values => {
    //   const errors = {};
  
    //   if (!values.name) {
    //     errors.name = 'Required';
    //   }
  
    //   return errors;
    // },
    validationSchema:yup.object().shape({
        username:yup.string().required("账号为必填项").matches(/^[a-zA-Z_\d]{5,8}$/,'长度为5到8位，只能出现数字、字母、下划线'),
        password:yup.string().required("密码为必填项").matches(/^[a-zA-Z_\d]{5,12}$/,'长度为5到12位，只能出现数字、字母、下划线')
    }),
    handleSubmit: async (values,{props}) => {
        const {data}= await API.post('/user/login',{
                    username: values.username,
                    password: values.password
                });
                if(data.status===200)
                {
                    Toast.success(data.description, 2);
                    window.localStorage.setItem('hkzf_token',data.body.token);
                    if (!props.location.state) {
                        // 此时，表示是直接进入到了该页面，直接调用 go(-1) 即可
                        props.history.go(-1)
                      } else {
                        // push：[home, login, map]
                        // replace: [home, map]
                        props.history.replace(props.location.state.from.pathname)
                      }

                }
                else{
                    Toast.fail(data.description, 2);
                }
    },
    displayName: 'BasicForm',
  })(Login);

export default Login