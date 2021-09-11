import React, { Component } from 'react'
import './index.less'
import { Table, DatePicker } from 'antd';
import { guardLogColumns } from '../../config/guardConfig'
import { reqGetDayRecords } from '../../api'
import { getDay } from '../../config/publicConfig'
import moment from 'moment';

export default class GuardLog extends Component {

    state = {
        current: 1,
        total: 0,
        defaultPageSize: 9,
        pageSize: 9,
        date: "",
        tableData: []
    }

    //todo 开始
    UNSAFE_componentWillMount = () => {
        this.setState({
            date: getDay(0) + " 00:00:00"
        }, () => this.handlePageChange())
       
    }

    // 选择日期
    handleDateChange = (date,dateString) => {
        this.setState({
            date: dateString + " 00:00:00"
        }, () => this.handlePageChange())
    }

    //todo 分页
    handlePageChange = async (page=1, pageSize=this.state.pageSize) => {
        const data = {
            page: page,
            size: pageSize,
            date: this.state.date
        }
        let res = await reqGetDayRecords(data)
        this.setState({
            current:page,
            tableData: res.data.data,
            total:res.data.total
        })
    }

    render() {

        let day = getDay(0)

        return (
            <div className="guardLog">
                <DatePicker defaultValue={moment(day,'YYYY-MM-DD')} onChange={this.handleDateChange} />
                <Table
                    className="table"
                    size="middle"
                    columns={guardLogColumns}
                    dataSource={this.state.tableData}
                    rowKey={columns => columns.openId} 
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
