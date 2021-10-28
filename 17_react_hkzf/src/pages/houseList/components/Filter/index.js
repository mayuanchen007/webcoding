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
        }
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
            else if(item==='more')
            {
            }
            else{
                newTitleSelect[item]=false
            }
        })
        this.setState({
        titleSelect:newTitleSelect,
        type:type
        })
    }
    //点击取消
    onCanel=()=>{
        this.setState({
            type:''
        })
    }
    //点击确定
    onSave=(type,value)=>{
        console.log(this.state.selectDefaultValues)
        this.setState({
            type:'',
            selectDefaultValues:{
                ...this.state.selectDefaultValues,
                [type]:value
            }
        });
    }
    //获取选择框数据
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

    render(){
       
        return(
            <div className='houselist_title'>
                {/* 遮罩层 */}
                {
                    this.state.type==='area'|| this.state.type==='mode'|| this.state.type==='price'?( <div className='mask'></div>):(<div/>)
                }  
                <div className='content'>
                    {/* 标题栏 */}
                    <FilterTitle titleSelect={this.state.titleSelect} onTitleclick={this.onTitleclick}></FilterTitle>
                    {/* 选择框 */}
                    { this.renderFilterPicker()}
                   
                    <FilterMore></FilterMore>
                </div>
            </div>
        )
    }
}