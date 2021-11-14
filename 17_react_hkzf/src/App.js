/* eslint-disable */
import React,{ Component } from 'react';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import './App.css';
import Home from './pages/home/index'
import CityList from './pages/cityList/index'
import Map from './pages/map/index'
import houseDetail from './pages/houseDeatil/index'
import Login from './pages/login/index'
class App extends Component{
    render(){
        return (<Router>
            <div className="App">
                    <Route path='/' exact render={()=><Redirect to='/home'></Redirect>}></Route>
                    <Route path='/cityList' component={CityList}></Route>
                    <Route path='/home' component={Home}></Route>
                    <Route exact path='/map' component={Map}></Route>
                    <Route exact path='/houseDetail/:id' component={houseDetail}></Route>
                    <Route exact path='/login' component={Login}></Route>
                </div>
            </Router>);
    }
}

export default App;