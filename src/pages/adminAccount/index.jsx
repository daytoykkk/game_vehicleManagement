import React, { Component } from 'react'
import './index.less'
import { Button, Input, Form, Modal, message } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import {
    reqGetAreaParkPage,
    reqCreateParkAdmin,
    reqGetParkAdmin
} from '../../api/index'

export default class BossAccount extends Component {

    state = {
        parkId: "0",
        parkName: "",
        visible: false,
        isLoading: false,
        parkList: [],
        guardList: []
    }

    // 获取区域列表
    UNSAFE_componentWillMount = async () => {
        return new Promise(async resolve=>{
            let res = await reqGetAreaParkPage({ 'page': 1, 'size': 1000 });
            let list = await reqGetParkAdmin({ 'parkId': res.data.data[0].parkId })
            this.setState({
                parkList: res.data.data,
                parkId: res.data.data[0].parkId,
                guardList: list.data
            })
        })
    }
   
    // 获取区域管理员
    getAreaAdmin = async () => {
        let res = await reqGetParkAdmin({ 'parkId': this.state.parkId })
        this.setState({
            guardList: res.data
        })
    }

    //todo 选择区域
    handleChangeArea = (item) => {
        this.setState({
            parkId:item.parkId
        }, () => {
            this.getAreaAdmin()
        })
    }

    // 添加区域管理员
    showModal = () => {
        this.setState({
            visible:true
        })
    }
//todo
    handleOk = async  (values) => {
        console.log(values);
        this.setState({ isLoading: true})
        let res = await reqCreateParkAdmin(values)
        if(res.msg === 'success') {
            this.setState({
                isLoading: false,
                visible: false
            })
            message.success('添加保安成功！')
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
        return (
            <div className="adminAccount">
                <div className="itemBox leftBox">
                    {
                        this.state.parkList.map((item,index) => {
                            return <div onClick={this.handleChangeArea.bind(this, item)} key={index} className={item.parkId === this.state.parkId ? "areaItem areaItemClick" : "areaItem"}>
                                <p>停车场名称：{item.parkName}</p>
                                <p>停车场编号：{item.parkId}</p>
                            </div>
                        }, this)
                    }
                </div>
                <div className="itemBox rightBox">
                    <Button onClick={this.showModal} className="addBtn" icon={<PlusOutlined />}>添加保安</Button>
                    <Modal
                        title="添加保安"
                        visible={this.state.visible}
                        centered={true}
                        footer={null}
                        closable={false}
                    >
                        <Form
                            name="guardForm"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: false }}
                            onFinish={this.handleOk}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="停车场编号"
                                name="parkId"
                                rules={[{ required: true, message: '请输入停车场编号！' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="保安姓名"
                                name="username"
                                rules={[{ required: true, message: '请输入姓名！' }]}
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
                    <div className="guardBox">
                        {
                            this.state.guardList.map((item,index) => {
                                return <div className="guardItem" key={index}>
                                    <span className="guardSpan">管理员：{item.username}</span>
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
