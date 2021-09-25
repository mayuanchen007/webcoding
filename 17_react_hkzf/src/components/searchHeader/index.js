import React from 'react'
import {withRouter} from 'react-router-dom'
import {Flex} from 'antd-mobile'
import  PropTypes from 'prop-types'
import './index.css'
function SearchHeader(props){
    return (
        <Flex className='search-box'>
              <Flex className={['search',props.headerClass?props.headerClass:''].join(' ')}>
                <div onClick={()=>props.history.push('/cityList')}>
                    <span className='name'>{JSON.parse(props.currentCity)[0]}</span>
                    <i className='iconfont icon-arrow '></i>
                </div>
                <div className='form'>
                  <i className='iconfont icon-seach '></i>
                  <span className='text'>请输入小区或者地址</span>
                </div>
              </Flex>
              <i className='iconfont icon-map ' onClick={()=>{console.log(11); props.history.push('/map')}}></i>
        </Flex>
    )
}
SearchHeader.prototype={
    currentCity:PropTypes.array.isRequired
}
export default withRouter(SearchHeader)