import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './index.less';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import HeaderTop from '../../components/header';
import GuardStall from '../guardStall';
import GuardLog from '../guardLog';
import GuardComplaint from '../guardComplaint';
import GuardPic from '../guardPic'
import { menuData } from '../../config/guardConfig';
import { handleInitWs } from '../../api/ws.js'

const { Sider, Content } = Layout;

export default class Guard extends Component {

    state = {
        collapsed: false,
        
    }

    UNSAFE_componentWillMount = () => {
       handleInitWs()
    }

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
                                <Route path='/guard/complaint' component={GuardComplaint} />
                                <Route path='/guard/parks' component={GuardPic} />
                                <Redirect from="/guard" to="/guard/stall" />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
