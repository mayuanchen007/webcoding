import React from 'react'
import porpTypes from 'prop-types'
import img from '../images/cat.png'
class Mouse extends React.Component{
    state={
        x:0,
        y:0
    }

    
    mouseMoveHandle=(e)=>{
        console.log(e);
        this.setState({
            x:e.pageX,
            y:e.pageY
        })
    }
    //注意调用方法使用箭头函数 或者直接this.mouseMoveHandle
    componentDidMount(){
        window.addEventListener('mousemove',e=>{this.mouseMoveHandle(e)});
    }
    //卸载组件时移除事件
    componentWillUnmount(){
        window.removeEventListener('mousemove',this.mouseMoveHandle)
    }

    render(){
        return this.props.children(this.state)
    }
}
Mouse.porpTypes={
    children:porpTypes.func.isRequired
}

class App extends React.Component{
    render(){
        return (
            <div>
                <Mouse >
                    {(mouse)=>{
                        return (
                            <div>
                                <h3>X:{mouse.x}</h3>
                                <h3>Y:{mouse.y}</h3>
                            </div>
                        )
                    }}
                </Mouse>
                <Mouse>
                    {
                        mouse=>{
                            return (
                                <img src={img} style={{
                                    position:'absolute',
                                    top:mouse.x-60,
                                    left:mouse.y-64
                                }}></img>
                            )
                        }
                    }
                </Mouse>
            </div>

        )
    }
}

export default App