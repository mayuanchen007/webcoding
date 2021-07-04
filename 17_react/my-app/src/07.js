import React from 'react'
class App extends React.Component{
    state={
        count:0
    }
    change=()=>{
        this.setState({
            count:this.state.count+=1
        })
    }
    render(){
        return (
            <div>
                <h1>{this.state.count}</h1>
                {/* 注意调用函数不加括号 */}
                <button onClick={this.change}>+1</button>
            </div>
        )
    }
}
export default App