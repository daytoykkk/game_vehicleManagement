import React, { Component } from 'react'
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

export default class HeaderTop extends Component {

    toggle = () => {
        this.props.toggle();
    }

    render() {

        const collapsed = this.props.collapsed

        return (
            <div>
                <Header className="site-layout-header">
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </Header>
            </div>
        )
    }
}
