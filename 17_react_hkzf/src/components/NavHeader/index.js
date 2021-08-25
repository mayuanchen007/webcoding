import React from 'react'
import {NavBar } from 'antd-mobile';
import  PropsTypes  from 'prop-types';
import './index.css'
import {withRouter} from 'react-router-dom'
 function NavHeader(props){
    const defaultHandler=() => props.history.go(-1)
    return (
        <NavBar className='navbar'
        mode="light"
        icon={<i className='iconfont icon-back' />}
        onLeftClick={props.onLeftClick||defaultHandler} 
        >{props.children}</NavBar>
    )
}
NavHeader.prototype={
    children:PropsTypes.string.isRequired,
    onLeftClick:PropsTypes.func
}

//部署router渲染的组件无法直接使用props
//使用withRouter包装后的组件可以调用路由渲染的props 
export default withRouter(NavHeader);