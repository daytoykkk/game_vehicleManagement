import React, { Component } from 'react'
import { Table } from 'antd'
import './index.less'
import { guardComplaintColumns } from '../../config/guardConfig'
import { resGetComplaint } from '../../api'

export default class GuardComplaint extends Component {

    state  = {
        current: 1,
        total: 0,
        defaultPageSize: 10,
        pageSize: 10,
        tableData: []
    }

    UNSAFE_componentWillMount = () => {
        this.handlePageChange()
    }

    // 分页
    handlePageChange = async (page=1, pageSize=this.state.pageSize) => {
        const data = {
            page: page,
            size: pageSize
        }
        let res = await resGetComplaint(data)
        this.setState({
            total:res.data.total,
            tableData: res.data.data,
            current:page
        })
    }


    render() {
        return (
            <div className="guardComplaint">
                 <Table
                    className="table"
                    size="middle"
                    columns={guardComplaintColumns}
                    dataSource={this.state.tableData}
                    rowKey={columns => columns.complaintId} 
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
