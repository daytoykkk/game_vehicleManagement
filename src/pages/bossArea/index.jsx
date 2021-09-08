import React, { Component } from 'react'
import './index.less'
import { Table, Input, Button, Modal, message, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
    reqCreateArea,
    reqGetAreaPage,
    reqGetTime,
} from '../../api/index'

import { bossAreaColumns } from '../../config/bossConfig'

const { Search } = Input;

export default class BossArea extends Component {

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

    //todo 搜索
    onSearch = async (value) => {
        // console.log(value)
        let array = ["2021-09-08 0:0:0","2021-09-09 0:0:0","2021-09-06 0:0:0","2021-09-07 0:0:0","2021-09-10 0:0:0","2021-09-11 0:0:0"]
        const data = {
            arrayId: 1,
            dates:array
        }
        let res = await reqGetTime(data)
        console.log(JSON.stringify(res))
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

        let res = await reqCreateArea(values);
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
            visible: false
        })
        message.info('取消添加。')
    }

    // 分页
    handlePageChange = async (page=1, pageSize=7) => {
        const data = {
            page: page,
            size: pageSize
        }
        let res = await reqGetAreaPage(data);
        this.setState({
            current: page,
            tableData: res.data.data,
            total: res.data.total
        })
    }

    render() {

        return (
            <div className="bossArea">
                <div className="topBox">
                    <Button onClick={this.showModal} icon={<PlusOutlined />}>添加区域</Button>
                    <Search placeholder="请输入区域名或者ID" onSearch={this.onSearch} style={{ width: 200 }} />
                    <Modal
                        title="添加区域"
                        visible={this.state.visible}
                        centered={true}
                        footer={null}
                        closable={false}
                    >
                        <Form
                            name="areaForm"
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
                                label="区域名称"
                                name="areaName"
                                rules={[{ required: true, message: '请输入区域名称！' }]}
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
                    columns={bossAreaColumns}
                    dataSource={this.state.tableData}
                    key={'areaId'}
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
