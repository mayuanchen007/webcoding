import React from 'react'

class Father extends React.Component{
    state={
        count:0
    }
    getchild=data=>{
        console.log(data);
        //获得son得到的count
        this.setState({
            count:data
        });
    }
    render(){
        return (
            <div>
                {/* 把得到count传递到son2中 */}
                <Son2 count={this.state.count} />
                <Son1 getMsg={this.getchild} />
            </div>
        )
    }
}

class Son1 extends React.Component{
    state={
        count:0
    }
    add=()=>{
        this.setState({
            count:this.state.count+=1
        });
        this.cdsh();
    }
    cdsh=()=>{
        this.props.getMsg(this.state.count);
    }
    render(){
        return (
            <div>
                <button onClick={this.add}>+1</button>  
            </div>
        )
    }
}
class Son2 extends React.Component{
    render() {
        return (
            <div>
                <h1>{this.props.count}</h1>
            </div>
        );
    }
}
export default Father