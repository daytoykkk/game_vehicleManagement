// 应用的根组件
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from './pages/login'
import Boss from './pages/boss'
import Admin from './pages/admin'
import Guard from './pages/guard'

export default class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/boss' component={Boss} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/guard' component={Guard} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </BrowserRouter>
        )
    }
}
