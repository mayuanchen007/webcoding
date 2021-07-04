import React from 'react'

/* 
  评论列表案例

  comments: [
    { id: 1, name: 'jack', content: '沙发！！！' },
    { id: 2, name: 'rose', content: '板凳~' },
    { id: 3, name: 'tom', content: '楼主好人' }
  ]
// */

// import './index.css'

class App extends React.Component {
    state={
        comments: [
            { id: 1, name: 'jack', content: '沙发！！！' },
            { id: 2, name: 'rose', content: '板凳~' },
            { id: 3, name: 'tom', content: '楼主好人' }
          ],
          //评论人
          userName:'',
          //评论内容
          userContent:''
    }
    renderList(){
        if(this.state.comments.length){
            return (
                <ul>
                {
                    this.state.comments.map(item=>(
                        <li key={item.id}>
                            <h3>评论人：{item.name}</h3>
                            <p>评论内容：{item.content}</p>
                        </li>
                    ))
                }
                </ul>
            )
        }
        else{
            return (<div className="no-comment">暂无评论，快去评论吧~</div>)
        }
    }
    handleFrom=(e)=>{
        console.log(e.target.name);
        const {name,value}=e.target
        this.setState({
            [name]:value
        })
    }
    submit=()=>{
        const name=this.state.userName;
        const content=this.state.userContent;
        if(content===''){ 
            alert('请输入内容')
             return
             }
        const id=this.state.comments.length+1
        const commentsNew=[{id,name,content},...this.state.comments];
        this.setState({
            comments:commentsNew,
            userName:'',
            userContent:''
        })
    }

    render() {
    return (
        <div className="app">
            <div>
            <input className="user" type="text" placeholder="请输入评论人" name='userName' value={this.state.userName} onChange={this.handleFrom} />
            <br />
            <textarea
                className="content"
                cols="30"
                rows="10"
                placeholder="请输入评论内容"
                name='userContent'
                value={this.state.userContent}
                onChange={this.handleFrom}
            />
            <br />
            <button onClick={this.submit}>发表评论</button>
            </div>
            {this. renderList()}
        </div>
    )
  }
}

export default App
