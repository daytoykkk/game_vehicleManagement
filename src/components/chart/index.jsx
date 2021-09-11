import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts';

export default class Chart extends Component {

    

    option = {
        title: {
            text: '区域近七日流水'
        },
        xAxis: {
            type: 'category',
            data: this.props.xData
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: this.props.yData,
            type: 'bar'
        }]
    };

    render() {

        let option = {
            title: {
                text: '区域近七日流水'
            },
            xAxis: {
                type: 'category',
                data: this.props.xData
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.props.yData,
                type: 'bar'
            }]
        };

        return (
            <div id="chart">
                <ReactEcharts
                    className="box"
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                />
            </div>
        )
    }
}
