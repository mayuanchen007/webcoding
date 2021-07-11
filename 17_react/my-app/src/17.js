import React from 'react'
import cat from '../images/cat.png'

class Mouse extends React.Component {
    state = {
        x: 0,
        y: 0
    }

    componentDidMount() {
        window.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        })
    }
    handleMouseMove = (e) => {
        this.setState({
            x: e.pageX,
            y: e.pageY
        })
    }
    render() {
        return this.props.handle(this.state)
    }
}

class App extends React.Component {
    render() {
        return ( <
            div >
            <
            Mouse handle = {
                (mouse) => {
                    return ( <
                        div >
                        <
                        h3 > X: { mouse.x } < /h3> <
                        h3 > Y: { mouse.y } < /h3> <
                        img src = { cat }
                        alt = 'cat'
                        style = {
                            {
                                position: 'absolute',
                                top: mouse.y - 64,
                                left: mouse.x - 64
                            }
                        }
                        /> <
                        /div>
                    )
                }
            } > < /Mouse> <
            /div>
        )
    }
}

export default App