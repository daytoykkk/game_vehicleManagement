import React, { Component } from 'react'
import './index.less';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class Login extends Component {

    handleLogin = (values) => {
        console.log('数据: ', values);
      };

    render() {
        return (
            <div className="login">
                <div className="header">
                    车辆管理平台
                </div>
                <div className="content">
                    <h2>管理员登陆</h2>
                    <Form
                        name="login_form"
                        className="login-form"
                        initialValues={{ remember: false }}
                        onFinish={this.handleLogin}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名！' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码！' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                       
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
