import React from "react";
import { withRouter } from "react-router";
import './index.css'

function FilerFooter(){
    return (
         <div className='filer_footer'>
             <div className='canel'>取消</div>
             <div className='confirm'>确定</div>
         </div>
    )
}

export default withRouter(FilerFooter)