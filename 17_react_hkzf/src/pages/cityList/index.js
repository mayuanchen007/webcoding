import React from 'react'
import {Toast } from 'antd-mobile';
import {List,AutoSizer} from 'react-virtualized';
import './index.css'
import axios from 'axios';
import {getCurrentCity} from '../../utils/index'
import NavHeader from '../../components/NavHeader/index'
const titleHight=36;
const nameHight=50;
export default class CityList extends React.Component{

    constructor(props){
        super(props);
        this.cityListComponent=React.createRef();
    }

    state={
        cityList:{},
        cityIndex:[],
        currentLi:'#',
        list:['北京','上海','广州','深圳']
    }

    async componentDidMount(){
        await this.getCityList();
        this.cityListComponent.current.measureAllRows();
    }

    formatCityList(list){
        const cityList={};
        list.forEach(item=>{
            var key=item.short.substr(0,1);
            if(cityList[key])
            {
                cityList[key].push(item)
            }
            else
            {
                cityList[key]=[item]
            }
        });

        const cityIndex=Object.keys(cityList).sort();
        return {cityList,cityIndex}
    }

    formatLetter(code)
    {
        switch(code){
            case code==="#"
            : return "當前城市"
            break;
            case code==='hot'
            :return "熱門城市";
            break;
            default:
                return code.toUpperCase()
            break;
        }
    }

    async getCityList(){
        //城市列表
        const {data:res}=await axios.get('http://localhost:8080/area/city',{params:{level:1}});
        const {cityList:cityList1,cityIndex:cityIndex1}= this.formatCityList(res.body);
        //热门城市
        const {data:resHot}=await axios.get('http://localhost:8080/area/hot');
        cityList1['hot']=resHot.body;
        cityIndex1.unshift('hot');
        //当前城市
        const curr= await getCurrentCity();
        cityList1['#']=[curr[0]];
        cityIndex1.unshift('#')
        this.setState({
            cityList:cityList1,
            cityIndex:cityIndex1
        });
    }

    getRowHight=({index})=>{
        const h=titleHight+nameHight*this.state.cityList[this.state.cityIndex[index]].length;
        return h;
    }

    //选择城市
    changeCity(item){
        if(this.state.list.indexOf(item.label)>-1)
        {
            const arr=[item.label,item.value]    
            window.localStorage.setItem("cur-city",JSON.stringify(arr));
            this.props.history.go(-1);
        }
        else{
            Toast.info('暂时没有该城市房源', 3,null,false);
        }
    }

    //渲染城市列表
    rowRenderer=({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
      })=> {
          const {cityIndex,cityList}=this.state;
          const letter=cityIndex[index];
        return (
                <div key={key} style={style} className='city'>
                    <div className='cityTitle'>{this.formatLetter(letter)}</div>
                    {cityList[letter].map((item,index)=>{
                        if(letter==='#')
                        {
                            return (<div key={index} className='cityName' onClick={
                                ()=>{
                                    this.changeCity(item);
                                }
                            }>{item}</div>)
                        }
                        else
                        {
                            return (<div key={index} className='cityName' onClick={
                                ()=>{
                                    this.changeCity(item);
                                }
                            } >{item.label}</div>)
                        }

                    }) }
                </div>
        );
    }

    //渲染导航列表
    indexRender(){
       return this.state.cityIndex.map((item,index)=>{
            return (<li key={item} className={this.state.currentLi===item?'li-active':''} onClick={
                ()=>{
                    this.cityListComponent.current.scrollToRow(index);
                }
            }>{item==='hot'?'熱':item.toUpperCase()}</li>)
        })
    }

    onRowsRendered=({startIndex})=>{
        if(this.state.cityIndex[startIndex]!==this.state.currentLi)
        {
            this.setState({
                currentLi:this.state.cityIndex[startIndex]
            })
            
        }
    }

    render(){
        return (
            <div className='city-list' >
                <NavHeader>城市选择</NavHeader>
                <AutoSizer>
                        {({height, width}) => (
                        <List
                        ref={this.cityListComponent}
                            height={height}
                            rowCount={this.state.cityIndex.length}
                            rowHeight={this.getRowHight}
                            rowRenderer={this.rowRenderer}
                            width={width}
                            onRowsRendered={this.onRowsRendered}
                            scrollToAlignment='start'
                        />
                        )}
                </AutoSizer>
                <div className='cityIndex'>
                    <ul>
                        {this.indexRender()}
                    </ul>
                </div>

            </div>
            )
    }
}