import React from "react";
import {NavBar,Icon} from 'antd-mobile'
import {API} from '../../utils/api'
import HouseItem from '../../components/houseItem'
import {BASE_URL} from '../../utils/urlUtil'
import './index.css'
import NavHeader from '../../components/NavHeader/index'
export default class Favorite extends React.Component{

    state={
        houseList:[]
    }

    componentDidMount(){
        this.initHouseList();
        console.log(this.props)
    }

    async initHouseList(){
        const {data}=await API.get('/user/favorites');
        console.log(data)
        if(data.status===200)
        {
            this.setState({
                houseList:data.body
            })
        }
    }

    render(){
        return (
            <div className='favorite'>
                  <NavHeader>我的收藏</NavHeader>
                   
                    <div>
                        {
                            this.state.houseList.map(house=>{
                                return (
                                    <HouseItem 
                                        onClick={() => this.props.history.push(`/houseDetail/${house.houseCode}`)}
                                        key={house.houseCode} src={BASE_URL+house.houseImg} 
                                        title={house.title} desc={house.desc} 
                                        tags={house.tags} price={house.price} ></HouseItem>
                                )
                            })
                        }
                    </div>
            </div>
        )
    }
}