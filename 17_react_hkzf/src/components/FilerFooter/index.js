import React from "react";
import { withRouter } from "react-router";
import PropsTypes  from 'prop-types'
import './index.css'

function FilerFooter({onCanel,onConfrim,classname}){
    return (
         <div className={classname}>
             <div className='canel' onClick={onCanel}>取消</div>
             <div className='confirm' onClick={onConfrim}>确定</div>
         </div>
    )
}

FilerFooter.prototype={
    onCanel:PropsTypes.func,
    onConfrim:PropsTypes.func
}


export default withRouter(FilerFooter)