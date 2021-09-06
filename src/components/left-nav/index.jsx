// 左侧导航

import React, { Component } from 'react'
import './index.less'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export default class LeftNav extends Component {

    menuData = this.props.list;

    render() {

        return (
            <div className="leftNav">
                <div className="logo" />
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    {
                        this.menuData.map((item) => {
                            return <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={item.path}>
                                    {item.name}
                                </Link>
                            </Menu.Item>
                        })
                    }
                </Menu>
            </div>
        )
    }
}
