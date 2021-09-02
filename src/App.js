// 应用的根组件
import React, { Component } from 'react'
import { Button, message } from 'antd';
import './App.less';

export default class App extends Component {

    handleClick = () => {
        message.success("哈哈哈哈哈")
    }

    render() {
        return (
            <div>
               <Button type="primary" onClick={this.handleClick}>Button</Button>
            </div>
        )
    }
}
