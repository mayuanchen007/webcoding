import React from 'react'
import { BrowserRouter as Router,Link,Route } from 'react-router-dom'

const App=()=>{
    return (
        <Router>
            <Link to='/a/b'>跳转</Link>
            {/**
             *   <Route path='/a' component={A}></Route>  可以访问
             *   <Route path='/a/b' component={B}></Route>可以访问
             *   <Route path='/a/b/c' component={B}></Route>访问不到
             *   <Route path='/' component={B}></Route> 可以访问
             *   <Route path='/b' component={B}></Route>访问不到
             *  
             */}
            <Route exact path='/a' component={A}></Route> 
            <Route path='/a/b' component={B}></Route>
            <Route path='/a/b/c' component={B}></Route>
            <Route path='/' component={B}></Route>
            <Route path='/b' component={B}></Route> 
        </Router>
    )
}

const A=()=>(<div>我是A</div>)
const B=()=>(<div>我是B</div>)


export default App