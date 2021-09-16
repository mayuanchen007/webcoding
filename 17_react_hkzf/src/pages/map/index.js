import React from 'react'
import {API} from '../../utils/api'
import {Toast} from 'antd-mobile'
import  './index.css'
//import styles from './index.module.css'
import NavHeader from '../../components/NavHeader/index'
import {BASE_URL} from '../../utils/urlUtil'

console.log(BASE_URL)

export default class Map extends React.Component{

    state={
        houseList:[],
        isShow:false
    }

    componentDidMount(){
        this.initMap();     
    }

    initMap(){
        const city= JSON.parse( window.localStorage.getItem('cur-city')); 
        const map = new BMapGL.Map('container');
        this.map=map
        //创建地址解析器实例
        var myGeo = new BMapGL.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(city[0],point=>{
            if(point){
                map.centerAndZoom(point, 11);
                var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
                map.addControl(scaleCtrl);
                var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
                map.addControl(zoomCtrl);
                // var cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
                // map.addControl(cityCtrl);

                this.renderOverlays(city[1])
                
            }else{
                alert('您选择的地址没有解析到结果！');
            }
        }, city[0]);
        map.addEventListener('movestart',()=>{
            if(this.state.isShow)
            {
                this.setState({
                    isShow:false
                })
            }
            
        })
    }

    async renderOverlays(id)
    {
        Toast.loading('加载中', 0, null, false)
        const {data:res}= await API.get('/area/map',{params:{id:id}});
        const {type,zoom}= this.getTypeAndZoom();
        this.createOverlays(type,zoom,res);
        Toast.hide()
    }

    getTypeAndZoom()
    {
        let type ,zoom
        const a=this.map.getZoom();
        if(a>10&&a<12)
        {
            type='circle';
            zoom=13
        }
        else if(a>12 && a<15)
        {
            type='circle';
            zoom=15
        }
        return {type,zoom}
    }

    createOverlays(type,zoom,res)
    {
        if(type==='circle')
        {
            this.createCircle(zoom,res);
        }
        else
        {
            this.createRect(zoom,res);
        } 
    }

    createCircle(zoom,res){
        res.body.forEach(item=>{
            var opts = {
                position: new BMapGL.Point(item.coord.longitude,item.coord.latitude), // 指定文本标注所在的地理位置
                offset: new BMapGL.Size(10, -10) // 设置文本偏移量
            };
            // 创建文本标注对象
            var label = new BMapGL.Label('', opts);
            label.setContent(`<div class='city'><span class='city-name'>${item.label}</span><span class='city-count'>${item.count}套</span></div>`)
            // 自定义文本标注样式
            label.setStyle({
                color:'#fff',
                backgroundColor: 'grey',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                fontFamily: '微软雅黑'
            });
            label.addEventListener('click',  ()=> {
                this.map.centerAndZoom(new BMapGL.Point(item.coord.longitude,item.coord.latitude), zoom);
                this.renderOverlays(item.value);
                setTimeout(()=>{
                    this.map.clearOverlays();
                },0)
            });
            this.map.addOverlay(label);
        });
    }

    createRect(zoom,res)
    {
        res.body.forEach(item=>{
            var opts = {
                position: new BMapGL.Point(item.coord.longitude,item.coord.latitude), // 指定文本标注所在的地理位置
                offset: new BMapGL.Size(10, -10) // 设置文本偏移量
            };
            // 创建文本标注对象
            var label = new BMapGL.Label('', opts);
            label.setContent(`<div><span >${item.label}</span><span >${item.count}套</span></div>`)
            // 自定义文本标注样式
            label.setStyle({
                color:'#fff',
                backgroundColor: 'grey',
               // width: '50px',
                height: '25px',
                lineHight:'20px',
                borderRadius: '7px',
                fontFamily: '微软雅黑',
                padding:'5px'
            });
            label.addEventListener('click',  e=> {
                
                this.showHouses(item.value);
                 // 点击移动标签到中心
                 const target = e.domEvent.changedTouches[0]
                 this.map.panBy(
                     window.innerWidth / 2 - target.clientX,
                     (window.innerHeight - 330) / 2 - target.clientY
                 )
                this.setState({
                    isShow:true
                });       
               
               // this.map.panBy(window.innerHeight-330)/2-target.cl
            });
            this.map.addOverlay(label);
        });
    }

    async showHouses(id)
    {
        Toast.loading('加载中', 0, null, false)
        const result=await API.get('/houses',{params:{cityId:id}});
        Toast.hide()
        this.setState({
            houseList:result.data.body.list
        })
    }

    renderHouseView(){
        return (
            <div className={['house',this.state.isShow?'house-show':''].join(' ')}>
                <div className='titleWrap '>
                      <span className='listTitle'>房屋列表</span>  
                      <span className='titleMore'>更多房源</span>
                </div>
                <div className='houseItems'>
                    {/* 房屋结构 */}
                    {this.renderHousesList()}
                </div>
            </div>
        )
    }

    renderHousesList(){
       return  this.state.houseList.map(item=>{
           console.log(BASE_URL);
            return (
                <div className='home' key={item.houseCode}>
                    <div className='imgWrap'>
                        <img className='img' src={BASE_URL+item.houseImg} alt="" />
                    </div>
                    <div className='content'>
                        <h3 className='title'>{item.title}</h3>
                        <div className='desc'>{item.desc}</div>
                        <div>
                        {/* ['近地铁', '随时看房'] */}
                        {item.tags.map((tag, index) => {
                            const tagClass = 'tag' + (index + 1)
                            return (
                            <span
                                className={[tag,tagClass].join(' ')}
                                key={tag}
                            >
                                {tag}
                            </span>
                            )
                        })}
                        </div>
                        <div className='price'>
                        <span className='priceNum'>{item.price}</span> 元/月
                        </div>
                    </div>
                 </div>
            )
        })
    }

    render(){
        return (
            <div className='map'>
                <NavHeader>地图</NavHeader>
                <div id="container"></div> 
                <div>
                    {this.renderHouseView()}
                </div>
            </div>
        )
    }
}