import React from 'react'
const {Provider,Consumer}=React.createContext();
class Father extends React.Component{
    
    state={
        count:0
    }

    render(){
        return (
            <Provider value={this.state.count}>
                <Son1 />
            </Provider>
        )
    }
}

class Son1 extends React.Component{
    render(){
        return (
            <Son2 />
        )
    }
}


class Son2 extends React.Component{
    render(){
        return (
            <div>
                <Consumer>{data=><h1>接收数据{data}</h1>}</Consumer>
            </div>
        )
        
    }
}


export default Father