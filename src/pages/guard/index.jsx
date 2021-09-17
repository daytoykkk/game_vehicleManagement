import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './index.less';
import { Layout, message } from 'antd';
import LeftNav from '../../components/left-nav';
import HeaderTop from '../../components/header';
import GuardStall from '../guardStall';
import GuardLog from '../guardLog';
import { menuData } from '../../config/guardConfig';

const { Sider, Content } = Layout;

export default class Guard extends Component {

    state = {
        collapsed: false,
        
    }

    ws = null
    token = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ''
    url = "ws://z3773e6368.qicp.vip/socket/"
    connected = false
    connectRetryCount = 0
    connectCount = 0
    
    UNSAFE_componentWillMount = () => {
        this.handleInitWs()
    }

    // 连接ws
    handleInitWs = () => {
        this.ws = new WebSocket(this.url + this.token);
        this.ws.onopen = () => {
          console.log("连接服务端成功了");
          this.connected = true;
          this.connectRetryCount = 0;
        };
        this.ws.onclose = () => {
          message.error("连接服务端失败");
          this.connected = false;
          this.connectRetryCount++;
          setTimeout(() => {
            this.handleInitWs();
          }, 500 * this.connectRetryCount);
        };
        this.ws.onmessage = (res) => {
            message.success(res.data)
        };
      };

    // 菜单伸缩
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        return (
            <div className="guardMain">
                <Layout className="bossMain">
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <LeftNav list={menuData} />
                    </Sider>
                    <Layout className="site-layout">
                        <HeaderTop history={this.props.history} collapsed={this.state.collapsed} toggle={() => { this.toggle() }} />
                        <Content className="site-layout-content">
                            <Switch>
                                <Route path='/guard/stall' component={GuardStall} />
                                <Route path='/guard/log' component={GuardLog} />
                                <Redirect from="/guard" to="/guard/stall" />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
