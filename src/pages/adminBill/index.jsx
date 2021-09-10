import React, { Component } from 'react'
import './index.less'
import Chart from '../../components/chart'
import { Pagination } from 'antd';
import {
    reqGetParkDayAmount,
    reqGetAreaParkPage
} from '../../api/index'
import { getSevenDay } from '../../config/publicConfig'

export default class BossBill extends Component {

    state = {
        parkId: "",
        total: "",
        current: 1,
        parkList: [],
        xData: [],
        yData: []
    }

    // 初始化 获取区域列表
    UNSAFE_componentWillMount = async () => {
        return new Promise(async resolve => {
            let res = await reqGetAreaParkPage({ 'page': 1, 'size': 5 });

            if (res.code === 1) {
                this.setState({
                    parkList: res.data.data,
                    parkId: res.data.data[0].parkId,
                    total: res.data.total
                })
                resolve(res.data.data[0].parkId)
            }
        }).then((id) => this.getParkDayAmount(id))
    }

    // 选择区域
    handleChangeArea = (item) => {
        this.setState({ parkId: item.parkId })
        this.getParkDayAmount(item.parkId)
    }

    // 获取该区域流水
    getParkDayAmount = async (id) => {
        let array = getSevenDay()
        const data = {
            parkId: id,
            dates: array
        }
        let res = await reqGetParkDayAmount(data)
        if (res.code === 1) {
            this.handleBillList(res.data)
        }
    }

    // 处理流水数组
    handleBillList = (list) => {
        let x = new Array(7)
        let y = new Array(7)
        if (list.length === 0) return;
        for (let i = 0; i < 7; i++) {
            x[i] = list[i].dayTime.slice(5, 10)
            y[i] = list[i].amount
        }
        this.setState({
            xData: x,
            yData: y
        })
    }

    // 分页
    handlePageChange = async (page, size) => {
        const data = {
            page: page,
            size: size
        }

        let res = await reqGetAreaParkPage(data)
        this.setState({
            current: page,
            parkList: res.data.data,
            total: res.data.total
        })
    }



    render() {
        return (
            <div className="adminBill">
                <div className="topBox">
                    <p>停车场选择</p>
                    <div className="parkBox">
                        {
                            this.state.parkList.map((item, index) => {
                                return <div onClick={this.handleChangeArea.bind(this, item)} key={index} className={item.parkId === this.state.parkId ? "parkItem parkItemClick" : "parkItem"}>
                                    <span>名称：{item.parkName}</span>
                                    <span>停车场编号：{item.parkId}</span>
                                </div>
                            }, this)
                        }
                    </div>
                    <Pagination
                        className="pagination"
                        current={this.state.current}
                        total={this.state.total}
                        defaultCurrent={1}
                        defaultPageSize={5}
                        pageSize={5}
                        onChange={this.handlePageChange}
                    />
                </div>
                <Chart className="bottomBox" xData={this.state.xData} yData={this.state.yData}></Chart>
            </div>
        )
    }
}
