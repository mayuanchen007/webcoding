import React from "react";
import {Flex} from 'antd-mobile'
import  './index.css'
import {withRouter} from 'react-router-dom'
const titleList=[
    {title:'区域',type:'area'},
    {title:'方式',type:'mode'},
    {title:'租金',type:'price'},
    {title:'筛选',type:'more'}
]
 class FilterTitle extends React.Component{
    render(){
        console.log(this.props)
        return (
            <div className='filter_title'>
                <Flex>
                    {
                        titleList.map((item,index)=>{
                            const seleteFlag=this.props.titleSelect[item.type];
                            console.log(seleteFlag)
                            return (
                                <Flex.Item key={index} className={seleteFlag?'select':''}  onClick={()=>{this.props.onTitleclick(item.type)}}>
                                    <span>{item.title}</span>
                                    <i className='iconfont icon-arrow'></i>
                                </Flex.Item>
                            )
                        })
                    }               
                </Flex>
            </div>
        )
    }
}
export default withRouter(FilterTitle)