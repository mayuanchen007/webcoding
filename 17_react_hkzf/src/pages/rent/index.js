import React from 'react'
import {Link} from 'react-router-dom'
import {BASE_URL} from '../../utils/urlUtil'
import './index.css'
import {NavBar,Icon,Button} from 'antd-mobile'
import {API} from '../../utils/api'
import HouseItem from '../../components/houseItem'
export default class Rent extends React.Component{
    state={
        houseList:[]
    }
    componentDidMount(){
        this.initMyHouse();
    }

    initMyHouse=async ()=>{
        const {data}=await API.get('/user/houses');
        console.log(data) 
        if(data.status===200){
            this.setState({
                houseList:data.body
            })
        }
    }
    renderMyHouse=()=>{
        if(this.state.houseList.length>0){
          return (
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
          )         
        }
        else{
            return(
                <div>
                    <img
                    className='rent-img'
                    src={BASE_URL + '/img/not-found.png'}
                    alt="暂无数据"
                    />
                    <p className='rent-img-msg'>您还没有房源，
                    <Link to="/rent/add" >
                        去发布房源
                    </Link>
                    吧~
                    </p>
                </div>
            )
        }
    }
    render(){
        return (
            <div className='rent'>
                 <Button className='btn' type="primary"  size="small" className="am-button-borderfix" onClick={()=>{this.props.history.push('/rent/add')}}>发布房屋</Button>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push('/home/profile')}
                    >我的房屋</NavBar>
                   
                {this.renderMyHouse()}
            </div>
        )
        
        
    }
}