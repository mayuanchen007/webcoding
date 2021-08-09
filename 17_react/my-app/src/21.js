import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Login extends React.Component {
    state = {

    }
    handleLogin=()=>{
        this.props.history.push('/home');
    }
    render() {

        return (
                <button onClick={this.handleLogin}>请登录</button>
        )

    }
}
const Home=(props)=>{
    const goBack=()=>{
        props.history.go(-1);
    }
    return (<div>主页<button onClick={goBack}>返回</button> </div>)
}

const App=()=>(
    <Router>
        <Link to='/login'>首页</Link>
        <Route path='/login' component={Login} ></Route>
        <Route path='/home' component={Home}></Route>
    </Router>
)

export default App