/* eslint-disable */
import React,{ Component } from 'react';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import './App.css';
import Home from './pages/home/index'
import CityList from './pages/cityList/index'
import Map from './pages/map/index'
import houseDetail from './pages/houseDeatil/index'
import Login from './pages/login/index'
import AuthRoute from './components/AuthRoute/index'
import Favorite from './pages/favorite/index'
import Rent from './pages/rent/index'
import RentAdd from './pages/rent/rentAdd/index'
import RentSearch from './pages/rent/rentSearch/index'
class App extends Component{
    render(){
        return (<Router>
            <div className="App">
                    <Route path='/' exact render={()=><Redirect to='/home'></Redirect>}></Route>
                    <Route path='/cityList' component={CityList}></Route>
                    <Route path='/home' component={Home}></Route>
                    {/* <Route exact path='/map' component={Map}></Route>  */}
                    {/* 使用 AuthRoute 访问map需要登录才能访问*/}
                    <AuthRoute exact path='/map' component={Map}></AuthRoute>
                    <Route exact path='/houseDetail/:id' component={houseDetail}></Route>
                    <Route exact path='/login' component={Login}></Route>
                    <AuthRoute exact path='/favorate' component={Favorite}></AuthRoute>

                    {/* 去租房 */}
                    <AuthRoute exact path='/rent' component={Rent}></AuthRoute>
                    <AuthRoute exact path='/rent/add' component={RentAdd}></AuthRoute>
                    <AuthRoute exact path='/rent/search' component={RentSearch}></AuthRoute>
                </div>
            </Router>);
    }
}

export default App;