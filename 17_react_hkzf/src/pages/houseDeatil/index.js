import React from 'react'
import {API} from '../../utils/api'
import {BASE_URL} from '../../utils/urlUtil'
import {Carousel} from 'antd-mobile'
import './index.css'
import HousePackage from '../../components/HousePackage/index'
import { NavBar, Icon,Flex,Modal } from 'antd-mobile';
export default class HouseDeatil extends React.Component{

    state={
        house:{
            houseImg:[],
            tags:[],
            price:0,
            roomType:'',
            size:0,
            oriented:[],
            floor:'',
            community:'',
            coord:{
                latitude: "31.197715",
                longitude: "121.450691"
            },
            supporting:[],
            description:'',
            imgHeight:''
        },
        ifLogin:false,
        isFavorite:false
    }
     componentDidMount(){
         this.getHouseInfo();
         this.checkIsFavorite();
        
    }

    async checkIsFavorite()
    {
        const isLogin=window.localStorage.getItem('hkzf_token');
        if(isLogin)
        {
            const {data}=await API.get(`/user/favorites/${this.props.match.params.id}`);
            if(data.status===200)
            {
                this.setState({
                    isFavorite:data.body.isFavorite
                })
            }

        }
    }

    async getHouseInfo(){
        const {data}=await API.get(`/houses/${this.props.match.params.id}`);
        this.setState({
            house:data.body
        })
      
       this.renderMap();
    }

    // 轮播图
    renderCarousel=()=>{
        return this.state.house.houseImg.map((item,index) => (
            <div key={index}>
                <a key={item.id} href="http://www.alipay.com"  style={{ display: 'inline-block', width: '100%', height: 212 }} >
                  <img  
                      src={`http://localhost:8080${item}`}
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

    renderTitle(){
        return (
            <div className='title'>
                <span className='title_span'>
                     {this.state.house.title}
                </span>
                <div className='title_tag'>
                    {
                        this.state.house.tags.map((item,index)=>{
                            const tagClass = 'houseItem_tag' + (index + 1)
                            return (
                                <span
                                    className={['houseItem_tag',tagClass].join(' ')}
                                    key={index}
                                >
                                    {item}
                                </span>
                            )
                        })
                    }
                </div> 
                <div className='info'>
                    <div>
                        <span className='info_content'>{this.state.house.price}/月</span>
                        <span className='info_title'>租金</span>
                    </div>
                    <div>
                        <span className='info_content'>{this.state.house.roomType}</span>
                        <span className='info_title'>房型</span>
                    </div>
                    <div>
                        <span className='info_content'>{this.state.house.size}平米</span>
                        <span className='info_title'>面积</span>
                    </div>
                </div>   
                <div className='info2'>
                    <div className='info2_item'>
                        <div>
                            <span className='info_title'>装修 : </span>
                            <span className='info_content'>精装</span>
                        </div>
                        <div>
                            <span className='info_title'>朝向 : </span>
                            <span className='info_content'>{this.state.house.oriented.join(',')}</span>
                        
                        </div>
                    </div>
                    <div className='info2_item'>
                        <div>
                            <span className='info_title'>楼层 : </span>
                            <span className='info_content'>{this.state.house.floor}</span>
                            
                        </div>
                        <div>
                            <span className='info_title'>类型 : </span>
                            <span className='info_content'>普通住宅</span>
                        </div>
                    </div>
                    
                </div>        
            </div>
        )
    }

    renderMap=()=>
    {   
        var map = new BMapGL.Map("container");
        var point = new BMapGL.Point(this.state.house.coord.longitude,this.state.house.coord.latitude);
        map.centerAndZoom(point, 15); 
        var opts = {
            position: new BMapGL.Point(this.state.house.coord.longitude,this.state.house.coord.latitude), // 指定文本标注所在的地理位置
            offset: new BMapGL.Size(30, -30) // 设置文本偏移量
        };
        // 创建文本标注对象
        var label = new BMapGL.Label(this.state.house.community, opts);
        // 自定义文本标注样式
        label.setStyle({
            color: 'blue',
            borderRadius: '2px',
            background: '#80f513',
            fontSize: '14px',
            height: '24px',
            lineHeight: '20px',
            fontFamily: '微软雅黑'
        });
        map.addOverlay(label);
    }
    renderUser(){
        return (
            <div className='contact'>
              <div className='user_contact'>
                <img src={BASE_URL + '/img/avatar.png'} alt="头像" />
                <div className='useInfo'>
                  <div>王女士</div>
                  <div className='userAuth'>
                    <i className="iconfont icon-auth" />
                    已认证房主
                  </div>
                </div>
              </div>
              <span className='userMsg'>发消息</span>
            </div>
        )
    }


    //收藏
     handleFavorite=async ()=>{
         const id=this.props.match.params.id;
         const token=window.localStorage.getItem('hkzf_token')
        if(!token){
            return Modal.alert('提示', '登录后才能收藏房源，是否去登录', [
                { text: '取消' },
                {
                  text: '去登录',
                  // 使用 replace 方法，解决登录后返回详情页面，再点击左上角返回按钮时
                  // 需要点击两次的问题
                  // onPress: () => history.push('/login', { from: location })
                  onPress: () => this.props.history.push('/login')
                }
              ])
        }
        else{
            if(this.state.isFavorite)//已收藏 点击取消收藏
            {
                const {data}=await API.delete(`/user/favorites/${id}`);
                if(data.status===200)
                {
                    this.setState({
                        isFavorite:false
                    })
                }
                
            }else//未收藏
            {
                const {data}=await API.post(`/user/favorites/${id}`);
                if(data.status===200)
                {
                    this.setState({
                        isFavorite:true
                    })
                }
            }
        }
    }

    render()
    {
        return (
            <div className='house_detail'>
                {/* 轮播图 */}
                <Carousel autoplay infinite autoplayInterval={5000}>{this.renderCarousel() }</Carousel>  
                {/* title */}
                {this.renderTitle()}
                {/* 地图 */}
                <div className='map'>
                    <div className='title'>小区 : {this.state.house.community}</div>
                    <div id='container'></div>
                </div>
                {/* 房屋配套 */}
                <div className='peitao'>
                    <div className='peitao_title'>房屋配套</div>
                    <HousePackage  list={this.state.house.supporting} select={false}></HousePackage>
                </div>
                {/* 房屋概况 */}
                <div className='fwgk'>
                    <div className='peitao_fwgk'>房屋概况</div>
                    <div className='user'>{this.renderUser()}</div>
                    <div className='desc'><p>{this.state.house.description}</p></div>
                </div>
                {/* NAV */}
                <NavBar className='nav'
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.go(-1)}}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                    >{this.state.house.community}</NavBar>
                {/* 底部收藏按钮 */}
                <Flex className='fixedBottom'>
                <Flex.Item onClick={this.handleFavorite}>
                    <img
                    src={this.state.isFavorite?BASE_URL + '/img/star.png':BASE_URL + '/img/unstar.png'}
                    className='favoriteImg'
                    alt="收藏"
                    />
                    <span className='favorite'>收藏</span>
                </Flex.Item>
                <Flex.Item>在线咨询</Flex.Item>
                <Flex.Item>
                    <a href="tel:400-618-4000" className='telephone'>
                    电话预约
                    </a>
                </Flex.Item>
                </Flex>
            </div>
        )
    }
}