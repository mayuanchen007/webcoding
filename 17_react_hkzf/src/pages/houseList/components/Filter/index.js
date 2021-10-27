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
    onTitleclick=(type)=>{
        this.setState({
        titleSelect:{...this.state.titleSelect,[type]:true},
        type:type
        })
    }
    onCanel=()=>{
        this.setState({
            type:''
        })
    }
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
    async getFilterData()
    {
      const cityId=JSON.parse(window.localStorage.getItem('cur-city'));
      const {data}= await API.get('/houses/condition',{params:{id:cityId[1]}});
      this.setState({
          filterData:data.body
      })
    }
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