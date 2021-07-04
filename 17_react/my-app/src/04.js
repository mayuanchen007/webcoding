import React from 'react'

function App() {
    function handleClick(e) {
        e.preventDefault();
    }
    return (<a href='www.baidu.com' onClick={handleClick}>点我</a>)
}

export default App