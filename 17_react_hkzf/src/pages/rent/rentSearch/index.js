import React from "react";
import {SearchBar, List} from 'antd-mobile'
import {API} from '../../../utils/api'
const cityid='';
const Item = List.Item;
export default class RentSearch extends React.Component{
    state={
        value:'',
        areas:[]
    }
    onHandleSearch=(value)=>{
        const city=JSON.parse( window.localStorage.getItem('cur-city'))[1];
        if(value!==''){
            this.setState({
                value
            })
           
        }
        else{
            return
        }
        clearTimeout(cityid);
        cityid=setTimeout( async ()=>{
            const {data}=await API.get('/area/community',{params:{
                id:city,
                name:value
            }});
            console.log(data)
            if(data.status===200){
                this.setState({
                    areas:data.body
                })
            }
        },50);
    }

    renderAreaList=()=>{
      return (
            <List>
                { 
                    this.state.areas.map(i=>{
                    return ( 
                       <Item arrow="horizontal" key={i.community} onClick={()=>{this.onTipsClick(i)}}>{i.communityName}</Item>
                    )
                    })
                }
            </List>
      ) 
    }

    onTipsClick=(item)=>{
        console.log(this);
        this.props.history.replace('/rent/add', {
            name: item.communityName,
            id: item.community
          })
    }

    render(){
        return (
            <div>
                   <SearchBar
                        value={this.state.value}
                        placeholder="搜索小区"
                       
                        showCancelButton
                        onChange={this.onHandleSearch}
                    />
                    <div>
                     {this.renderAreaList()}
                    </div> 
                    
            </div>
        )
    }
}