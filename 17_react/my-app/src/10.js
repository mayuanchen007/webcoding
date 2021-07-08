import React from 'react'

class Parent extends React.Component{
    state={
        count:0,
        name:'李四'
    }
    render(){
        return (<div>
            <Child name={this.state.count} uname={this.state.name} />
        </div>)
    }
}

class Child extends React.Component{
    render(){
        return (<div>{this.props.name}{this.props.uname}</div>)
    }
}

export default Parent