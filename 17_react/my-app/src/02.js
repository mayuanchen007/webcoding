import React from 'react'

class H1 extends React.Component {
        sing() {
            alert('哈哈')
        }
        render() {
            return ( <button onClick={ this.sing } >按钮 </button>)
        }
}
export default H1