import React from 'react'
import { Carousel } from 'antd-mobile';
import { Flex } from 'antd-mobile';
import axios from 'axios'
import './index.css'
import Nav1 from '../../assets/images/nav-1.png';
import Nav2 from '../../assets/images/nav-2.png';
import Nav3 from '../../assets/images/nav-3.png';
import Nav4 from '../../assets/images/nav-4.png';
import { Grid } from 'antd-mobile';
import {getCurrentCity} from '../../utils/index'

// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/list'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent'
  }
]
export default class Index extends React.Component{
    state = {
      swiper: [1,2,3],
      groups:[],
      currentCity:'上海'
    }
    componentDidMount() {
        this.getImageUrl();
        this.getGroups();
        this.getCurrentCity();
    }
    async getImageUrl(){
          const {data}=await axios.get("http://localhost:8080/home/swiper");
          this.setState({
            swiper:data.body
          })
    }
    async getGroups(){
        const {data:res}=await axios.get("http://localhost:8080/home/groups",{params:{area:'AREA%7C88cff55c-aaa4-e2e0'}});
        if(res.status===200){
            this.setState({
              groups:res.body
            })
        }
    }
    getCurrentCity(){
      // var myCity = new window.BMapGL.LocalCity();
      //  myCity.get(async (result)=>{
      //     const {data:res}=await axios.get('http://localhost:8080/area/info',{params:{name:result.name}});
      //     this.setState({
      //       currentCity:res.body.label
      //     })
      //  });
      //使用utils中的公共方法获取当前城市
      getCurrentCity().then(res=>{
       // console.log()
        this.setState({
          currentCity:res[0]
        })
      });
      
       
    }
    // 轮播图
    renderSwiper(){
      return this.state.swiper.map((item,index) => (
        <div key={index}>
            <a key={item.id} href="http://www.alipay.com"  style={{ display: 'inline-block', width: '100%', height: 212 }} >
              <img  
                  src={`http://localhost:8080${item.imgSrc}`}
                  alt={item.alt}
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
            </a>
        </div>  
      ))        
    }
    //导航菜单
    renderNavs(){
      return navs.map(item=>(
            <Flex.Item onClick={()=>this.props.history.push(item.path)} key={item.id}>
                <img src={item.img} alt="" />
                <h2>{item.title}</h2>
            </Flex.Item>
        ))
    }
    
    render() {
        return (
          <div className='index'>
           
            {/* 輪播圖 */}
            <Carousel autoplay infinite autoplayInterval={5000}>
             {this.renderSwiper()}
            </Carousel>
             {/* 顶部导航 */}
             <Flex className='search-box'>
              <Flex className='search'>
                <div onClick={()=>this.props.history.push('/cityList')}>
                    <span className='name'>{this.state.currentCity}</span>
                    <i className='iconfont icon-arrow '></i>
                </div>
                <div className='form'>
                  <i className='iconfont icon-seach '></i>
                  <span className='text'>请输入小区或者地址</span>
                </div>
              </Flex>
              <i className='iconfont icon-map ' onClick={()=>this.props.history.push('/map')}></i>
            </Flex>
            {/* 導航菜單 */}
            <Flex className='nav'>
                {this.renderNavs()}
            </Flex>
            <div className='group'>
                <h3 className='group-title'>
                  租房小组 <span className='more'>更多</span>
                </h3>
                <Grid data={this.state.groups} columnNum={2} square={false} renderItem={item => (
                      <Flex className="group-item" justify="around" key={item.id}>
                        <div className="desc">
                          <p className="title">{item.title}</p>
                          <span className="info">{item.desc}</span>
                        </div>
                        <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                      </Flex>
                 )} />
            </div>
          </div>
        );
      }
}