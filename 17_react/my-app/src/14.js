import React from 'react'
class Father extends React.Component{
    render(){
        return (
            <Son>
                <h1>测试</h1>
            </Son>
        )
    }
}


class Son extends React.Component{
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Father