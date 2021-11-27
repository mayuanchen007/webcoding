import React from "react";
import { NavBar, Icon , List, InputItem, WhiteSpace,Picker,TextareaItem,ImagePicker,Toast} from 'antd-mobile';
import HousePackage from '../../../components/HousePackage/index'
import FilerFooter from '../../../components/FilerFooter/index'
import {API} from '../../../utils/api'
const Item=List.Item;
const Brief = Item.Brief;

// 房屋类型
const roomTypeData = [
    { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
    { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
    { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
    { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
    { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
  ]
  
  // 朝向：
  const orientedData = [
    { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
    { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
    { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
    { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
    { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
    { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
    { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
    { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
  ]
  
  // 楼层
  const floorData = [
    { label: '高楼层', value: 'FLOOR|1' },
    { label: '中楼层', value: 'FLOOR|2' },
    { label: '低楼层', value: 'FLOOR|3' }
  ]
  
export default class RentAdd extends React.Component{
    constructor(props) {
        super(props)
    
        // console.log(props)
        const { state } = props.location
        const community = {
          name: '',
          id: ''
        }
    
        if (state) {
          // 有小区信息数据，存储到状态中
          community.name = state.name
          community.id = state.id
        }
    
        this.state = {
          // 临时图片地址
          tempSlides: [],
    
          // 小区的名称和id
          community,
          // 价格
          price: '',
          // 面积
          size: '',
          // 房屋类型
          roomType: '',
          // 楼层
          floor: '',
          // 朝向：
          oriented: '',
          // 房屋标题
          title: '',
          // 房屋图片
          houseImg: '',
          // 房屋配套：
          supporting: '',
          // 房屋描述
          description: ''
        }
      }
    getValue=(name,value)=>{
        this.setState({
            [name]:value
        })
    }
    handleSelect=(selected)=>{
        console.log(selected)
        this.setState({
            supporting:selected.join('|')
        })
    }
    handleImage=(file,operationType,index)=>{
        this.setState({
            tempSlides:file
        })
    }

    onConfrim=async ()=>{
        const { price,community,
            roomType,
            floor,
            oriented,
            description,
            tempSlides,
            title,
            size,houseImg,supporting}=this.state;
        let img=''
        if(tempSlides.length>0)
        {
            const form =new FormData();
            console.log(form)
            tempSlides.forEach(item=>form.append('file',item.file));
            const {data}= await API.post('/houses/image',form,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
           if(data.status===200)
           {
                img=data.body.join('|')
                this.setState(
                    {
                        houseImg:data.body.join('|')
                    }
                )
           }
           console.log(111,this.state.houseImg)
        }
        const {data:res}= await API.post('/user/houses',{
            title,description,houseImg:img,oriented,supporting,price,roomType,size,floor,community:community.id
        });
        console.log(res)
        if(res.status ===200)
        {
            Toast.success('房屋发布成功', 3)
            this.props.history.push('/rent')
        }
    }
    render(){
        const {
            community,
            price,
            roomType,
            floor,
            oriented,
            description,
            tempSlides,
            title,
            size
          } = this.state
        return (
            <div className='rentadd'>
                  <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => {this.props.history.go(-1)}}
                    >发布房源</NavBar>
                    <form>
                    <List renderHeader={() => '房源信息'}>
                        <Item arrow="horizontal" extra={this.state.community?this.state.community.name:'请选择小区'} multipleLine onClick={() => {this.props.history.push('/rent/search')}}>
                            小区名称 
                        </Item>
                        <InputItem  extra="¥/月"  placeholder="请输入租金/月" value={price} onChange={(val)=>this.getValue('price',val)}
                        >租金</InputItem>
                        <InputItem  extra="m²"  placeholder="请输入建筑面积" value={size} onChange={(val)=>this.getValue('size',val)}
                        >建筑面积</InputItem>
                        <Picker cols={1} data={roomTypeData} value={[roomType]} className="forss"  onChange={(val)=>this.getValue('roomType',val[0])}>
                            <List.Item arrow="horizontal">户型</List.Item>
                        </Picker>
                        <Picker cols={1} data={floorData} value={[floor]} className="forss" onChange={(val)=>this.getValue('floor',val[0])}>
                            <List.Item arrow="horizontal">所在楼层</List.Item>
                        </Picker>
                        <Picker cols={1} data={orientedData} value={[oriented]} className="forss" onChange={(val)=>this.getValue('oriented',val[0])}>
                            <List.Item arrow="horizontal">朝向</List.Item>
                        </Picker>
                    </List>
                    <List renderHeader={() => '房屋标题'}>
                    <TextareaItem
                            placeholder="请输入标题(例如：整租，小区名 2室 5000元)"
                            autoHeight
                            labelNumber={5} value={title} onChange={(val)=>this.getValue('title',val)}
                        />
                    </List>
                    <List renderHeader={() => '房屋图像'}>
                    <ImagePicker
                            onChange={this.handleImage}
                            files={tempSlides}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={tempSlides.length < 7}
                            multiple={this.state.multiple}
                            />
                    </List>
                    <List renderHeader={() => '房屋配置'}>
                        <HousePackage select onSelect={this.handleSelect} />
                    </List>
                    <List renderHeader={() => '房屋描述'}>
                        <TextareaItem 
                            placeholder="请输入房屋描述信息"
                            autoHeight
                            labelNumber={5} value={description} onChange={(val)=>this.getValue('description',val)}
                        />
                    </List>
                    </form>
                    <FilerFooter canelText='取消' classname='filer_footer' onConfrim={this.onConfrim}></FilerFooter>
            </div>
        )
    }
}