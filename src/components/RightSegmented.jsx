import React from "react"
import { Segmented } from "antd"

const RightSegmented = (props) => {
    return (
        <div className='text-right'>
            <Segmented {...props}/>
        </div>
    )
}

export default RightSegmented;