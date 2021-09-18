import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router';
import './index.less';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import HeaderTop from '../../components/header';
import BossArea from '../bossArea';
import BossAccount from '../bossAccount';
import BossBill from '../bossBill'
import { menuData } from '../../config/bossConfig';
import { handleInitWs } from '../../api/ws.js'

const { Sider, Content } = Layout;

export default class Boss extends Component {

    state = {
        collapsed: false,
    };

    UNSAFE_componentWillMount = () => {
        handleInitWs()
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        return (
            <Layout className="bossMain">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <LeftNav list={menuData}/>
                </Sider>
                <Layout className="site-layout">
                    <HeaderTop history={this.props.history} collapsed={this.state.collapsed} toggle={() => {this.toggle()}} />
                    <Content className="site-layout-content">
                        <Switch>
                            <Route path='/boss/area' component={BossArea} />
                            <Route path='/boss/account' component={BossAccount} />
                            <Route path='/boss/bill' component={BossBill} />
                            <Redirect from="/boss" to="/boss/area" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
