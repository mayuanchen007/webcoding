import React from 'react'

import img from '../images/cat.png'

function withMouse(WroperComponent){
    class Mouse extends React.Component{
        state={
            x:0,
            y:0
        }
        componentDidMount(){
            window.addEventListener('mousemove',this.handleMove)
        }
        handleMove=(e)=>{
            this.setState({
                x:e.clientX,
                y:e.clientY
            })
        }

        render(){
            return (
                // 增加{...this.props} 防止 props丢失
                <WroperComponent { ...this.state} {...this.props} />
            )
        }
    }
    //设置别名
    Mouse.displayname=`WithMouse${getDisplayName(WroperComponent)}`

    return Mouse
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayname || WrappedComponent.name|| 'Component'
}

const position=(mouse)=>{
        return (
            <div>
                <h3>X:{mouse.x}</h3>
                <h3>Y:{mouse.y}</h3>
            </div>
        )
}
const MousePosition=withMouse(position)

const cat=(mouse)=>{
    return (
        <div>
        <img src={img} style={{
            position:'absolute',
            top:mouse.y-64,
            left:mouse.x-64
        }} alt=''></img>
        </div>
    )
}
const CatPosition=withMouse(cat)
class App extends React.Component{
    render(){
        return (
            <div>
                <MousePosition/>
                <CatPosition />
            </div>
        )
    }
}

export default App