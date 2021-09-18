import React, { Component } from 'react'
import { Layout, Modal, Message } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import './index.less'

const { Header } = Layout;
const { confirm } = Modal;


export default class HeaderTop extends Component {

    state = {
        isModalVisible: false
    }

    showConfirm = () => {
        confirm({
            title: '您确定要登出吗？',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.props.history.push('/login')
                sessionStorage.removeItem('token')
                Message.success('登出成功！')
            },
            onCancel() {
                Message.warning('取消登出');
            },
        });
    }

    toggle = () => {
        this.props.toggle();
    }

    render() {

        const collapsed = this.props.collapsed

        return (
            <Header className="site-layout-header">
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                })}
                <LogoutOutlined onClick={this.showConfirm} style={{ 'cursor': 'pointer' }} />
            </Header>

        )
    }
}
