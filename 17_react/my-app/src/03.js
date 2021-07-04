import React from 'react'

function App(){
    function sing(){
        alert('11')
    }
    return (<button onClick={sing}>按钮</button>)
}

export default App