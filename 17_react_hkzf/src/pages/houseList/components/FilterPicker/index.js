import React from "react";
import {PickerView } from 'antd-mobile'
import FilerFooter from '../../../../components/FilerFooter/index'
import './index.css'


export default class FilerPicker extends React.Component{
    state={
        value:this.props.defaultValues
    }
    render(){
        const {onCanel,onConfrim,data,cols,type}=this.props;
        const {value}=this.state;
        return (
            <div className='filer_picker'>
                <PickerView data={data} value={value} cols={cols} onChange={val => {  this.setState({  value: val }) }} />    
                <FilerFooter onCanel={onCanel} onConfrim={()=>{onConfrim(type,value)} } classname={'filer_footer'}></FilerFooter>        
            </div>
        )
    }
}