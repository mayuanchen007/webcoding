import React from 'react'
class App extends React.Component {
        state = {
            count: 0
        }
        handleAdd(){
            this.setState({
                count:this.state.count+=1
            })
        }
        render() {
            return (<div> <div>{ this.state.count }</div><button onClick={()=>{
                this.handleAdd()
            }}>+1</button></div>)
        }
 }
export default App