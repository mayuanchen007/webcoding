import React from "react";
import './index.css'
import FilerFooter from '../../../../components/FilerFooter/index'
export default class FilterMore extends React.Component{
    state={
        selectValue:this.props.selectValues
    }
    onTagClick(value)
    {
        const newSelectValue=[...this.state.selectValue];
        console.log(value)
        if(newSelectValue.indexOf(value)<=-1)
        {
            newSelectValue.push(value);
        }
        else{
            newSelectValue.splice(newSelectValue.findIndex((item)=>{return item===value}),1);
        }
        this.setState({
            selectValue:newSelectValue
        })
    }
    renderFilters(data)
    {
        return (
            <div>
                {data.map(item=>{
                    const selectFlag=this.state.selectValue.indexOf(item.value)>-1?true:false;
                    return (
                        <span className={selectFlag?'tag tagActive':'tag'} key={item.value} onClick={()=>{this.onTagClick(item.value)}}>{item.label}</span>
                    )
                })}
            </div>
            )
    }
    //清除
    onCanel(){
        this.setState({
            selectValue:[]
        })
    }
    //确定
    onOk(){
        const {type,onConfrim}=this.props;
        onConfrim(type,this.state.selectValue);
    }
    render(){
        return (
            <div className='houselist_filterMore'>
                <div className='tags'>
                    <dl className='dl'>
                        <dt className='dt'>户型</dt>
                        <dd className='dd'>{this.renderFilters(this.props.roomType)}</dd>
                    
                        <dt className='dt'>朝向</dt>
                        <dd className='dd'>{this.renderFilters(this.props.oriented)}</dd>

                        <dt className='dt'>楼层</dt>
                        <dd className='dd'>{this.renderFilters(this.props.floor)}</dd>
                        
                        <dt className='dt'>户型</dt>
                        <dd className='dd'>{this.renderFilters(this.props.characteristic)}</dd>
                    </dl>
                </div>
               {/*  */}
               <FilerFooter classname='filer_footer' canelText='清除' onCanel={()=>{this.onCanel()}} onConfrim={()=>{this.onOk()}}></FilerFooter>
            </div>
        )
    }
}