import React from 'react'
class App extends React.Component {
    state = {
        username: '',
        gender: 0,
        city:'sh',
        hobby: true
    }
    handleForm=(e)=> {
        const type = e.target.type;
        console.log(type);
        const value=e.target.type==='checked'?e.target.checked:e.target.value
        const name=e.target.name
        this.setState({
            [name]:value
        })
    }
    render(){
        return (
            <div>
            <input type="text" name='username' value={this.state.username} onChange={this.handleForm} />
            <br/>
            <select name='city' value={this.state.city} onChange={this.handleForm}>
                <option value='bj'>北京</option>
                <option value='sh'>上海</option>
            </select>
            <br/>
            <input type="checkbox" name='hobby' checked={this.state.hobby} onChange={this.handleForm} /> 
            </div>
        )
    }
}
export default App