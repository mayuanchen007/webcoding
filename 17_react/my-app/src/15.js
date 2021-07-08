import propTypes from 'prop-types'
import React from 'react'

class Parent extends React.Component{
    render (){
        // 可以不传值，但是传了就一定得符合规则
        return  (<Son color={['red','yello']} ></Son>)
    }
}



class Son extends React.Component{
    render(){
       return  (<div>my son</div>)
    }
}

Son.propTypes={
    color:propTypes.array,//数组
    song:propTypes.string,//字符串
    sing:propTypes.func,//函数
    tag:propTypes.element,//元素
    user:propTypes.shape({  //符合这个模式的对象
        name:propTypes.string,
        age:propTypes.number
    })
}

export default Parent