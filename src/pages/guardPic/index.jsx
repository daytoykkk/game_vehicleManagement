import React, { Component } from 'react'
import pic from './a.png'
import { Button } from 'antd'
import './index.less'

export default class GuardPic extends Component {

    state = {
        imgUrl: './a.png'
    }

    render() {
        return (
            <div className="guardPic">
                <img className="pic" src={pic} alt="无法显示" />
                <div className="btnBox">
                    <Button type="primary" style={{'marginTop':'50px'}}>手动抬杠</Button><br />
                    <Button type="primary" style={{'marginTop':'50px'}}>选择车位</Button>
                </div>
            </div>
        )
    }
}
