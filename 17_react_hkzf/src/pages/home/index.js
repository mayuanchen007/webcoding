import React from 'react'
import {TabBar} from 'antd-mobile'
import '../../utils/fonts/iconfont.css'
import './index.css'
//导入路由
import {Route} from 'react-router-dom'
//导入组件
import Index from '../index/index'
import House from '../houseList/index'
import News from '../news/index'
import Profile from '../profile/index'
const items=[
  {title:'首页',path:'/home',icon:"icon-ind"},
  {title:'找房',path:'/home/house',icon:"icon-findHouse"},
  {title:'资讯',path:'/home/news',icon:"icon-infom"},
  {title:'我的',path:'/home/profile',icon:"icon-my"}
]
export default class Home extends React.Component{
    state = {
        // 默认选中的TabBar菜单项
         selectedTab: this.props.location.pathname
    };
    getItem(){
      return items.map(item=>{ 
        return (
            <TabBar.Item
                title={item.title}
                key={item.title}
                icon={<i className={`iconfont ${item.icon}`}/>}
                selectedIcon={<i className={`iconfont ${item.icon}`}/>}
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                  this.setState({
                    selectedTab: item.path,
                  });
                  //点击切换路由
                  this.props.history.push(item.path);
                }}
                >
            </TabBar.Item>
        )
          
      })
    }
    //切换路由时调用
    componentDidUpdate(preProps)
    {
        if(preProps.location.pathname!==this.props.location.pathname)
        {
            this.setState({
              selectedTab: this.props.location.pathname
            })
        }
    } 
    render(){
        return (
            <div className='home'>
            <Route path="/home" exact component={Index}></Route>
            <Route path='/home/house' component={House}></Route>
            <Route path='/home/news' component={News}></Route>
            <Route path='/home/profile' component={Profile}></Route>
            <TabBar tintColor="blue"  barTintColor="white" noRenderContent='false' >
              {this.getItem()}
            </TabBar>
          </div>
        )
    }
}