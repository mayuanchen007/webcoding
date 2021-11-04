import React,{Component,createRef} from "react";
import './index.css'

export default class Stick extends Component {

    content=React.createRef();

    placeHolder=createRef();

    componentDidMount(){
        window.addEventListener('scroll',this.handleScroll);
    }


    handleScroll=()=>{
        const contentEl=this.content.current;
        const placeHolderEl=this.placeHolder.current;

        const {top}=placeHolderEl.getBoundingClientRect();
        if(top<0)
        {
            contentEl.classList.add('fix');
            placeHolderEl.style.height=`${this.props.height}px`
        }else if(top>=0)
        {
            contentEl.classList.remove('fix');
            placeHolderEl.style.height='0px'
        }
    }

    componentWillUnmount(){
        window.removeEventListener('scroll');
    }

    render()
    {
        return (
            <div className='stick'>
                <div ref={this.placeHolder}></div>
                <div ref={this.content}>{this.props.children}</div>
            </div>
        )
    }
}