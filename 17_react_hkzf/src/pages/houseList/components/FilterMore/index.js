import React from "react";
import './index.css'
import FilerFooter from '../../../../components/FilerFooter/index'
export default class FilterMore extends React.Component{
    renderFilters(data)
    {
        return (
            <div>
                {data.map(item=>{
                    return (
                        <span className='tag' key={item.value}>{item.label}</span>
                    )
                })}
            </div>
            )
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
               <FilerFooter classname='filer_footer' onCanel={this.props.onCanel} onConfrim={this.props.onConfrim}></FilerFooter>
            </div>
        )
    }
}