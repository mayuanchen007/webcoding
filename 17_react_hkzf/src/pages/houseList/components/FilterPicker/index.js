import React from "react";
import {PickerView } from 'antd-mobile'
import FilerFooter from '../../../../components/FilerFooter/index'
import './index.css'
const columns = [
    ['1', '2', '3'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']   
  ]

export default class FilerPicker extends React.Component{
    render(){
        return (
            <div className='filer_picker'>
                <PickerView columns={columns} />        
                <FilerFooter></FilerFooter>        
            </div>
        )
    }
}