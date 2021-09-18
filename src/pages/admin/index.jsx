import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router';
import './index.less';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import HeaderTop from '../../components/header';
import AdminParking from '../adminParking';
import AdminAccount from '../adminAccount';
import AdminBill from '../adminBill';
import { menuData } from '../../config/adminConfig';
import { handleInitWs } from '../../api/ws.js'

const { Sider, Content } = Layout;

export default class Admin extends Component {

    state = {
        collapsed: false,
    };

    UNSAFE_componentWillMount = () => {
        handleInitWs()
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }



    render() {
        return (
            <div className="adminMain">
                <Layout className="bossMain">
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <LeftNav list={menuData} />
                    </Sider>
                    <Layout className="site-layout">
                        <HeaderTop history={this.props.history} collapsed={this.state.collapsed} toggle={() => { this.toggle() }} />
                        <Content className="site-layout-content">
                            <Switch>
                                <Route path='/admin/parking' component={AdminParking} />
                                <Route path='/admin/account' component={AdminAccount} />
                                <Route path='/admin/bill' component={AdminBill} />
                                <Redirect from="/admin" to="/admin/parking" />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
