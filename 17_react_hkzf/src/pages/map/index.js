import React from 'react'
import  './index.css'
//import styles from './index.module.css'
import NavHeader from '../../components/NavHeader/index'
export default class Map extends React.Component{
    componentDidMount(){
        this.initMap();
        
    }
    initMap(){
        const city= window.localStorage.getItem('cur-city');
        var map = new window.BMapGL.Map("container");
        var point = new window.BMapGL.Point(116.404, 39.915);
        map.centerAndZoom(point, 15); 
    }
    render(){
        return (
            <div className='map'>
                <NavHeader>地图</NavHeader>
                <div id="container"></div> 
            </div>
        )
    }
}