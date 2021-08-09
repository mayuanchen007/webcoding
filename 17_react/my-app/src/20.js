/**
 * 路由基本使用
 * 1.下载路由模块
 *  npm i react-dom-router
 */
import React from 'react'
//2.导入 路由模块 起别名必须使用Router 注意R大写
import { BrowserRouter as Router,Link,Route } from 'react-router-dom'

//3.创建一个路由跳转模块
const First=()=><h1>hello</h1>


//4.使用路由
function App() {
    return (
        <div>
            <Router>
                <Link to="/forst">点击跳转</Link>
                <Route path='/forst' component={First}></Route>
            </Router>
        </div>
    )
}

export default App