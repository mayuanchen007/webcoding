import React from 'react'
import FilterMore from '../FilterMore/index'
import FilterPicker from '../FilterPicker/index'
import FilterTitle from '../FilterTitle/index'
import {API} from '../../../../utils/api'
import './index.css'

const titleSelect={
    area:false,
    mode:false,
    price:false,
    more:false
}
export default class Filter extends React.Component{
    state={
        titleSelect,
        type:'',
        filterData:'',
        selectDefaultValues:{
            area:['area','null'],
            mode:['null'],
            price:['null'],
            more:''
        },
        selectValues:{}
    }
    //
    componentDidMount(){
       this.getFilterData();
    }

    //点击标题栏
    onTitleclick=(type)=>{
        const selectDefaultValues=this.state.selectDefaultValues;
        const newTitleSelect={...this.state.titleSelect}
        Object.keys(this.state.titleSelect).forEach(item=>{
            //当前标题
            if(item===type)
            {
                newTitleSelect[type]=true;
                return;
            }
            //其他标题
            const selectVal=selectDefaultValues[item];
            if(item==='area'&&(selectVal.length!==2||selectVal[0]!=='area'))
            {
                newTitleSelect[item]=true
            }
            else if(item==='mode'&&selectVal[0]!=='null')
            {
                newTitleSelect[item]=true
            }
            else if(item==='price'&&selectVal[0]!=='null')
            {
                newTitleSelect[item]=true
            }
            else if(item==='more'&&selectVal.length>0)
            {
                console.log(selectVal.length)
                newTitleSelect[item]=true
            }
            else{
                newTitleSelect[item]=false
            }
        })
        this.setState({
        titleSelect:newTitleSelect,
        type
        })
        if(type==='more')
        {
            this.setState({
                type:'more'
                })
        }
    }

    //点击取消
    onCanel=()=>{
        this.setState({
            type:''
        })
    }

    //点击确定
    onSave=(type,value)=>{
        const selectDefaultValues=this.state.selectDefaultValues;
        const newTitleSelect={...this.state.titleSelect}
        Object.keys(this.state.titleSelect).forEach(item=>{
            //其他标题
            const selectVal=selectDefaultValues[item];
            if(item==='area'&&(selectVal.length!==2||selectVal[0]!=='area'))
            {

                newTitleSelect[item]=true
            }
            else if(item==='mode'&&selectVal[0]!=='null')
            {
                newTitleSelect[item]=true
            }
            else if(item==='price'&&selectVal[0]!=='null')
            {
                newTitleSelect[item]=true
            }
            else if(item==='more'&&selectVal.length>0)
            {
                console.log(selectVal.length)
                newTitleSelect[item]=true
            }
            else{
                newTitleSelect[item]=false
            }
        })
        const newselectDefaultValues={...this.state.selectDefaultValues}
        newselectDefaultValues[type]=value;

        //封装查询数据
        const filterDate={};
        // 区域
        const areaKey = newselectDefaultValues.area[0]
        let areaValue = 'null'
        const {area}=newselectDefaultValues;
        if (newselectDefaultValues.area.length === 3) {
        areaValue = area[2] !== 'null' ? area[2] : area[1]
        }
        filterDate[areaKey] = areaValue      
        filterDate.price=newselectDefaultValues.price[0];
        filterDate.mode=newselectDefaultValues.mode[0];
        if(newselectDefaultValues.more)
        {
            filterDate.more=newselectDefaultValues.more.join(',');
        }
       
        console.log(filterDate)
        this.props.getFilterData(filterDate);
        this.setState({
            type:'',
            titleSelect:newTitleSelect,
            selectDefaultValues:newselectDefaultValues
        });
        this.setState({
            selectValues:newselectDefaultValues
        })
    }
    //获取数据
    async getFilterData()
    {
      const cityId=JSON.parse(window.localStorage.getItem('cur-city'));
      const {data}= await API.get('/houses/condition',{params:{id:cityId[1]}});
      this.setState({
          filterData:data.body
      })
    }
    //渲染选择框
    renderFilterPicker()
    {
        
        const {type,filterData}=this.state;
        const {area,subway,price,rentType}=filterData;
        const defaultValues=this.state.selectDefaultValues[type];
        if(type!=='area'&& type!=='mode'&& type!=='price')
        {
            return null
        }
        let data=[];
        let cols=1;
        switch(type){
            case 'area':
            data=[area,subway];
            cols=3;
            break;
            case 'mode':
                data=rentType;
                cols=1
                break;
            case 'price':
                data=price;
                cols=1;
                break;
            default:
                break;
        }
        return (<FilterPicker onCanel={this.onCanel} data={data} cols={cols} type={type} onConfrim={this.onSave} defaultValues={defaultValues} key={type}></FilterPicker>)
    }

    //渲染更多
    renderFilterMore()
    {
        const {type,filterData,selectDefaultValues}=this.state;
        const {roomType,oriented,floor,characteristic}=filterData
        if(type!=='more')
        {
            return null;
        }
        return (<FilterMore onConfrim={this.onSave} type={type} selectValues={selectDefaultValues.more} roomType={roomType} oriented={oriented} floor={floor} characteristic={characteristic}></FilterMore>)
    }

    // 渲染遮挡层
    renderMask()
    {
        console.log(this.state.type)
        if(!this.state.type)
        {
            return null
        }
        if(this.state.type==='more'){
            console.log(this.state.type,1)
            return (<div className='mask' onClick={this.onCanel}></div>)
        }else{
            console.log(this.state.type,2)
            return (<div className='mask1' onClick={this.onCanel}></div>)
        }
        return null;
    }
    
    render(){
       
        return(
            <div className='houselist_title'>
                {/* 遮罩层 */}
                { this.renderMask()}  
                <div className='content'>
                    {/* 标题栏 */}
                    <FilterTitle titleSelect={this.state.titleSelect} onTitleclick={this.onTitleclick}></FilterTitle>
                    {/* 选择框 */}
                    { this.renderFilterPicker()}
                    {/* 更多 */}
                    {this.renderFilterMore()}
                </div>
            </div>
        )
    }
}