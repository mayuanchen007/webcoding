import React from 'react'
import { Route,Redirect } from 'react-router-dom'


export default function AuthRoute({component:Component,...rest}){
    return (
        <Route {...rest} render={
            props=>{
                const isLogin=window.localStorage.getItem('hkzf_token');
                console.log(isLogin)
                if(isLogin)
                {
                    return (<Component  {...props}></Component>)
                }
                else{
                    return (<Redirect  to={{pathname:'/login',state:{from:props.location}}}></Redirect>)
                }
            }
        }></Route>
    )
}