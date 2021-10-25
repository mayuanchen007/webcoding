import React from 'react'
import FilterMore from '../FilterMore/index'
import FilterPicker from '../FilterPicker/index'
import FilterTitle from '../FilterTitle/index'
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
        type:''
    }
    onTitleclick=(type)=>{
        this.setState({
        titleSelect:{...this.state.titleSelect,[type]:true},
        type:type
        })
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
                    {
                        // 选择框
                        this.state.type==='area'|| this.state.type==='mode'|| this.state.type==='price'?(<FilterPicker></FilterPicker>):(<div/>)
                    }
                   
                    <FilterMore></FilterMore>
                </div>
            </div>
        )
    }
}