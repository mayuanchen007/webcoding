import React from 'react'
import SearchHeader from '../../components/searchHeader/index'
import {Flex} from 'antd-mobile'
import  './index.css'
import Filter  from './components/Filter'
import {API} from '../../utils/api'
import {List , WindowScroller ,AutoSizer,InfiniteLoader} from 'react-virtualized'
import HouseItem from '../../components/houseItem'
import {BASE_URL} from '../../utils/urlUtil'
import Stick from '../../components/Stick/index'
const city= window.localStorage.getItem('cur-city');
import {Toast} from 'antd-mobile'

export default class HouseList extends React.Component{
    state={
        houseList:[],
        count:0
    }

    filterData={}

    componentDidMount(){
        this.searchHouseList();
    }


    async searchHouseList()
    {
        Toast.loading("房屋加载中。。。。", 0, null, true)
        const city=JSON.parse(window.localStorage.getItem('cur-city'))[1];
        console.log(city)
        const {data}=await API.get('/houses',{
            params:{
                cityId:city,
                ...this.filterData,
                start:1,
                end:20
            }
        });
        this.setState({
            houseList:data.body.list,
            count:data.body.count
        })
        Toast.hide()
        Toast.info(`共找到${this.state.count}套房源`, 2);
    }


    getMoreHouseList=({startIndex,endIndex})=>
    {
        const city=JSON.parse(window.localStorage.getItem('cur-city'))[1];
        return new Promise((reslove)=>{
            API.get('/houses',{
                params:{
                    cityId:city,
                    ...this.filterData,
                    start:startIndex,
                    end:endIndex
                }
            } ).then((res)=>{
                this.setState({
                    houseList:[...this.state.houseList,...res.data.body.list]
                });
                reslove();
            })    
        });
    }

    isRowLoaded =({ index })=> {
        return !!this.state.houseList[index];
    }

    getFilterData=(filterData)=>
    {
        console.log(filterData)
        console.log(this.filterData)
        this.filterData=filterData;
        this.searchHouseList();
    }


    //渲染房屋列表
    renderHouseList(){
        return (
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.getMoreHouseList}
                    rowCount={this.state.count}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <WindowScroller >
                            {({ height, isScrolling, onChildScroll, scrollTop }) => (
                                <AutoSizer>
                                    {({width})=>(
                                            <List
                                                ref={registerChild}
                                                onRowsRendered={onRowsRendered}
                                                autoHeight
                                                height={height}
                                                isScrolling={isScrolling}
                                                onScroll={onChildScroll}
                                                rowCount={this.state.count}
                                                rowHeight={120}
                                                rowRenderer={this.rowRenderer}
                                                scrollTop={scrollTop}
                                                width={width}
                                                onScroll={this.getMoreHouseList}
                                            />
                                    )}
                                </AutoSizer>
                            )}
                        </WindowScroller>
                    )}
                </InfiniteLoader>
        )
    }

    rowRenderer=({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
      })=> {
        const {houseList}=this.state;
        const house=houseList[index];
        if(house)
        {
            return (
                <HouseItem 
                onClick={() => this.props.history.push(`/houseDetail/${house.houseCode}`)}
                key={key} src={BASE_URL+house.houseImg} 
                title={house.title} desc={house.desc} 
                tags={house.tags} price={house.price}  style={style}></HouseItem>
            );
        }
        else{
            return (<div className='replaceDiv' key={index}></div>)
        }
       
    }

    render(){
        return (
        <div className='house'>
            <div className='house-h'>
                <Flex className='house-header'>
                    <i className='iconfont icon-back' onClick={()=>{
                        this.props.history.push('/')
                    }}></i>
                    <SearchHeader currentCity={city} headerClass={'header'} />
                </Flex>
            </div>
            {/* 渲染头部菜单 */}
            <Stick height={45}>
                <Filter getFilterData={this.getFilterData}></Filter>
            </Stick>
           
            {/* 渲染访问列表 */}
            <div>{this.renderHouseList()}</div>
        </div>
        )
    }
} 