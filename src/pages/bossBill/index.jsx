import React, { Component } from 'react'
import './index.less'
import Chart from '../../components/chart'
import { Pagination } from 'antd';
import {
    reqGetAreaDayAmount,
    reqGetAreaPage
} from '../../api/index'
import { getSevenDay } from '../../config/publicConfig'

export default class BossBill extends Component {

    state = {
        areaId: "",
        total: "",
        current: 1,
        areaList: [],
        xData: [],
        yData: []
    }

    // 初始化 获取区域列表
    UNSAFE_componentWillMount = async () => {
        return new Promise(async resolve => {
            let res = await reqGetAreaPage({ 'page': 1, 'size': 5 });
            this.setState({
                areaList: res.data.data,
                areaId: res.data.data[0].areaId,
                total: res.data.total
            })
            if(res.code===1) resolve(res.data.data[0].areaId)
        }).then((id)=>this.getAreaDayAmount(id))
    }

    // 选择区域
    handleChangeArea = (item) => {
        this.setState({ areaId: item.areaId })
        this.getAreaDayAmount(item.areaId)
    }

    // 获取该区域流水
    getAreaDayAmount = async (id) => {
        let array = getSevenDay()
        const data = {
            areaId: id,
            dates: array
        }
        let res = await reqGetAreaDayAmount(data)
        if (res.code === 1) {
            this.handleBillList(res.data)
        }
    }

    // 处理流水数组
    handleBillList = (list) => {
        let x = new Array(7)
        let y = new Array(7)
        if(list.length===0) return;
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

        let res = await reqGetAreaPage(data)
        this.setState({
            current: page,
            areaList: res.data.data,
            total: res.data.total
        })
    }



    render() {
        return (
            <div className="bossBill">
                <div className="topBox">
                    <p>区域选择</p>
                    <div className="areaBox">
                        {
                            this.state.areaList.map((item, index) => {
                                return <div onClick={this.handleChangeArea.bind(this, item)} key={index} className={item.areaId === this.state.areaId ? "areaItem areaItemClick" : "areaItem"}>
                                    <span>区域名称：{item.areaName}</span><br />
                                    <span>区域编号：{item.areaId}</span>
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
