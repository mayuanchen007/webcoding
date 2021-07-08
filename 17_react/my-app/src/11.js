import React from 'react'
class Father extends React.Component{
    state={
        msg:''
    }
    handle=data=>{
        console.log(data);
        // this.setState({
        //     mgs:data
        // })
    }
    render(){
        return (
            <div>
                 {this.state.msg}
                 <Son getMsg={this.handle} />
            </div>
           
        )
    }
}

class Son extends React.Component{
    state={
        msg:"我是儿子"
    }
    render(){
        return (
            <div>
                <button onClick={this.props.getMsg(this.state.msg)}>按钮</button>
            </div>
        )
    }
}

export default Father