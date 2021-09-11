import React, { Component } from 'react'
import './index.less'
import { Button, message, Modal, Form, Input, Pagination } from 'antd';
import { PlusOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import {
    reqFreezePark,
    reqUnfreezePark,
    reqCreatePlace,
    reqGetPlacePage
} from '../../api/index'

const { Search } = Input;

export default class GuardStall extends Component {

    state = {
        visible: false,
        isLoading: false,
        current: 1,
        total: "60",
        placeList: []
    }

    //todo 获取信息
    UNSAFE_componentWillMount = () => {
       this.handlePageChange()
    }

    // 冻结停车场
    freezePark = async () => {
        let res = await reqFreezePark();
        if(res.code === 1) {
            message.success('冻结停车场成功！')
        }else {
            message.warn('冻结失败，请稍后重试。')
        }
    }

    // 解冻停车场
    unfreezePark = async () => {
        let res = await reqUnfreezePark();
        if(res.code === 1) {
            message.success('解冻停车场成功！')
        }else {
            message.warn('解冻失败，请稍后重试。')
        }
    }


    //todo 添加停车位
    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = async (values) => {
        this.setState({
            isLoading: true
        })

        let res = await reqCreatePlace(values);
        if(res.msg === 'success') {
            this.setState({
                isLoading: false,
                visible: false
            })
            message.success('添加成功！')
            this.handlePageChange()
        }else {
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

    //todo 搜索
    onSearch = async (value) => {
        // console.log(value)
    }

    // 分页
    handlePageChange = async (page = 1, pageSize = 10) => {
        const data = {
            page: page,
            size: pageSize
        }
        let res = await reqGetPlacePage(data);
        this.setState({
            current: page,
            placeList: res.data.data,
            total: res.data.total
        })
    }

    render() {
        

        return (
            <div className="guardStall">
                <div className="topBox">
                    <div className="topLeftBox">
                        <Button onClick={this.freezePark} danger type="primary" icon={<LockOutlined />}>冻结停车场</Button>
                        <Button onClick={this.unfreezePark} type="primary" icon={<UnlockOutlined />} style={{marginLeft:'20px'}}>解冻停车场</Button>
                    </div>
                    <div className="topRightBox">
                        <Button onClick={this.showModal} icon={<PlusOutlined />} style={{marginRight:'20px'}}>添加停车位</Button>
                        <Search placeholder="请输入停车位编号或者经纬度" onSearch={this.onSearch} style={{ width: 200 }} />
                        <Modal
                            title="添加停车位"
                            visible={this.state.visible}
                            centered={true}
                            footer={null}
                            closable={false}
                        >
                            <Form
                                name="placeForm"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: false }}
                                onFinish={this.handleOk}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="停车位编号"
                                    name="placeNumber"
                                    rules={[{ required: true, message: '请输入停车位编号！' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="经度"
                                    name="lng"
                                    rules={[{ required: true, message: '请输入经度！' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="纬度"
                                    name="lat"
                                    rules={[{ required: true, message: '请输入纬度！' }]}
                                >
                                    <Input />
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
                    </div>
                </div>

                <div className="bottomBox">
                    <div className="listBox">
                        {
                            this.state.placeList.map((item,index) => {
                                return <div className="itemBox" key={index}>
                                    <p>车位号：{item.placeNumber}</p>
                                    <p>经度：{item.lng}</p>
                                    <p>纬度：{item.lat}</p>
                                    <p>状态：{item.isOccupied===0? "空闲":"使用中"}</p>
                                </div>
                            })
                        }
                    </div>
                    <Pagination
                        className="pagination"
                        current={this.state.current}
                        total={this.state.total}
                        defaultCurrent={1}
                        defaultPageSize={10}
                        pageSize={10}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        )
    }
}
