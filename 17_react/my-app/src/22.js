import React from 'react'
import { BrowserRouter as Router,Route,Link } from 'react-router-dom'

const App=()=>{
    return (
        <Router>
            <Route path='/' component={Home}></Route>
        </Router>
    )
}

class Home extends React.Component{
    render(){
        return (<div>主页</div>)
    }
}

export default App