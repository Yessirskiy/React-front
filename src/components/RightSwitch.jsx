import React from "react"
import { Switch } from "antd"

const RightSwitch = (props) => {
    return (
        <div className='text-right'>
            <Switch {...props}></Switch>
        </div>
    )
}

export default RightSwitch