import React from 'react'
import SearchHeader from '../../components/searchHeader/index'
import {Flex} from 'antd-mobile'
import  './index.css'
const city= window.localStorage.getItem('cur-city');
export default class HouseList extends React.Component{
    render(){
        return (
        <div className='house'>
            <Flex className='house-header'>
                <i className='iconfont icon-back' onClick={()=>{
                    this.props.history.push('/')
                }}></i>
                <SearchHeader currentCity={city} headerClass={'header'} />
            </Flex>
        </div>
        )
    }
}