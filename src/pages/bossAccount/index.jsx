import React, { Component } from 'react'
import './index.less'
import { Button, Input, Form, Modal, message } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import {
    reqGetAreaPage,
    reqCreateAreaAdmin,
    reqGetAreaAdmin
} from '../../api/index'

export default class BossAccount extends Component {

    state = {
        areaId: "0",
        areaName: "",
        visible: false,
        isLoading: false,
        areaList: [],
        adminList: []
    }

    // 获取区域列表
    UNSAFE_componentWillMount = async () => {
        return new Promise(async resolve=>{
            let res = await reqGetAreaPage({ 'page': 1, 'size': 1000 });
            let list = await reqGetAreaAdmin({ 'areaId': res.data.data[0].areaId })
            this.setState({
                areaList: res.data.data,
                areaId: res.data.data[0].areaId,
                adminList: list.data
            })
        })
    }
    getArea = async () => {
        let res = await reqGetAreaPage({ 'page': 1, 'size': 1000 });
        this.setState({
            areaList: res.data.data,
            areaId: res.data.data[0].areaId
        })
    }

    // 获取区域管理员
    getAreaAdmin = async () => {
        let res = await reqGetAreaAdmin({ 'areaId': this.state.areaId })
        console.log(JSON.stringify(res))
    }

    // 选择区域
    handleChangeArea = (item) => {
        this.setState({
            areaId:item.areaId
        })
        this.getAreaAdmin()
    }

    // 添加区域管理员
    showModal = () => {
        this.setState({
            visible:true
        })
    }

    handleOk = async  (values) => {
        this.setState({ isLoading: true})
        let res = await reqCreateAreaAdmin(values)
        if(res.msg === 'success') {
            this.setState({
                isLoading: false,
                visible: false
            })
            message.success('添加管理员成功！')
            this.getAreaAdmin();
        }else{
            this.setState({
                isLoading: false
            })
            message.warn(res.msg)
        }
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            isLoading: false
        })
        message.info('取消添加。')
    }

    render() {

        for(let i=0;i<20;i++) {
            this.mockList.push({
                username: "hhhhhhhhhhhhhhhh" + i,
                status: i%2
            })
        }

        return (
            <div className="bossAccount">
                <div className="itemBox leftBox">
                    {
                        this.state.areaList.map((item,index) => {
                            return <div onClick={this.handleChangeArea.bind(this, item)} key={index} className={item.areaId === this.state.areaId ? "areaItem areaItemClick" : "areaItem"}>
                                <p>区域名称：{item.areaName}</p>
                                <p>区域编号：{item.areaId}</p>
                            </div>
                        }, this)
                    }
                </div>
                <div className="itemBox rightBox">
                    <Button onClick={this.showModal} className="addBtn" icon={<PlusOutlined />}>添加区域管理员</Button>
                    <Modal
                        title="添加区域管理员"
                        visible={this.state.visible}
                        centered={true}
                        footer={null}
                        closable={false}
                    >
                        <Form
                            name="areaAdminForm"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: false }}
                            onFinish={this.handleOk}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="区域编号"
                                name="areaId"
                                rules={[{ required: true, message: '请输入区域编号！' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="管理员名称"
                                name="username"
                                rules={[{ required: true, message: '请输入用户名！' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{ required: true, message: '请输入初始密码！' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button onClick={this.handleCancel}>
                                    取消
                                </Button>
                                <Button type="primary" loading={this.state.isLoading} htmlType="submit" style={{ marginLeft: '20px' }}>
                                    添加
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <div className="adminBox">
                        {
                            this.state.adminList.map((item,index) => {
                                return <div className="adminItem" key={index}>
                                    <span className="adminSpan">管理员：{item.username}</span>
                                    <span style={{color: item.status===0?'#ff4e50':'#648cb9'}}>{item.status===0? '已冻结':'正常'}</span>
                                    <Button shape="circle" danger size="small" icon={<MinusOutlined />} />
                                </div>
                            },this)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
