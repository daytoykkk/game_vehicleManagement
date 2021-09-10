import React, { Component } from 'react'
import './index.less'
import { Table, Input, Button, Modal, message, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
    reqCreatePark,
    reqGetAreaParkPage,
} from '../../api/index'

import { adminParkColumns } from '../../config/adminConfig'

const { Search } = Input;

export default class AdminParking extends Component {

    state = {
        current: 1,
        defaultPageSize: 7,
        pageSize: 7,
        visible: false,
        isLoading: false,
        tableData: [],
        total: 0
    }

    // 获取区域列表
    UNSAFE_componentWillMount = () => {
        this.handlePageChange()
        
    }

    //todo 解决bug的 不需要就删掉
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        }
    }

    //todo 搜索
    onSearch = async (value) => {
        // console.log(value)
       
    }

    // 添加区域
    showModal = () => {
        this.setState({
            visible: true
        })
    }
 
    handleOk = async (values) => {
        this.setState({
            isLoading: true
        })

        let res = await reqCreatePark(values);
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

    // 分页
    handlePageChange = async (page=1, pageSize=7) => {
        const data = {
            page: page,
            size: pageSize
        }
        let res = await reqGetAreaParkPage(data);
        this.setState({
            current: page,
            tableData: res.data.data,
            total: res.data.total
        })
    }

    render() {

        return (
            <div className="adminArea">
                <div className="topBox">
                    <Button onClick={this.showModal} icon={<PlusOutlined />}>添加停车场</Button>
                    <Search placeholder="请输入停车场名称或者ID" onSearch={this.onSearch} style={{ width: 200 }} />
                    <Modal
                        title="添加停车场"
                        visible={this.state.visible}
                        centered={true}
                        footer={null}
                        closable={false}
                    >
                        <Form
                            name="parkForm"
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
                                label="停车场名称"
                                name="parkName"
                                rules={[{ required: true, message: '请输入停车场名称！' }]}
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
                                rules={[{ required: true, message: '请输入纬度称！' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button onClick={this.handleCancel}>
                                    取消
                                </Button>
                                <Button type="primary" loading={this.state.isLoading} htmlType="submit" style={{marginLeft: '20px'}}>
                                    添加
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <Table
                    columns={adminParkColumns}
                    dataSource={this.state.tableData}
                    rowKey={columns => columns.arrayId} 
                    pagination={{
                        current: this.state.current,
                        total: this.state.total,
                        defaultCurrent: 1,
                        defaultPageSize: this.state.defaultPageSize,
                        pageSize: this.state.pageSize,
                        onChange: this.handlePageChange
                    }}
                />
            </div>
        )
    }
}
