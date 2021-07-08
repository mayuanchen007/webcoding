import React from 'react'
class App extends React.Component{
    render(){
        return (
            <CC/>
        )
    }
}

class CC extends React.Component{
    render(){
        return (
            <div>
                <h3>当前页：{this.props.size}</h3>
            </div>
        )
    }
}

CC.defaultProps={
    size:10,
    currentPate:1
}


export default App