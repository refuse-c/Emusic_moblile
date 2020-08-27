/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 10:00:01
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-27 21:10:13
 * @Description: 
 */
import React, { Component } from 'react';

import './Home.scss'
import * as actions from '../../store/actions'
import store from '../../store'
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom';

import Me from '../Me/Me'
import Find from '../Find/Find'
import Cloud from '../Cloud/Cloud'
import Video from '../Video/Video'
import Icon from '../../components/Icon/Icon'
// import Setting from '../Setting/Setting'
// import { Prompt } from 'react-router-dom';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        store.subscribe(this.handleStoreChange);
    }
    handleStoreChange = () => {
        this.setState(
            store.getState()
        )
    }
    refuse = () => {
        const val = !this.state.songPlayStatus
        const action = actions.changeStatus(val)
        store.dispatch(action)//store 接收action的值
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        }
    }
    clickEven = () => {

    }



    render() {
        return (
            <div className="home">
                <header>
                    <Icon
                        icon='icon-setting'
                        clickEven={this.clickEven}
                    />
                    <ul>
                        <NavLink key={`me`} to='/index/home/me'><li>我的</li></NavLink >
                        <NavLink key={`find`} to='/index/home/find' activeClassName="active"><li>发现</li></NavLink >
                        <NavLink key={`cloud`} to='/index/home/cloud'><li>云村</li></NavLink >
                        <NavLink key={`vidoe`} to='/index/home/vidoe'><li>视频</li></NavLink >
                    </ul>
                    <Link to='/index/search'>
                        <Icon
                            icon='icon-search'
                        />
                    </Link>

                </header>
                <main>
                    <Switch>
                        <Route path='/index/home/me' component={Me} />
                        <Route path='/index/home/find' exact component={Find} />
                        <Route path='/index/home/cloud' component={Cloud} />
                        <Route path='/index/home/vidoe' component={Video} />
                    </Switch>

                    {/* <Redirect to='/index/home/me' /> */}
                </main>
            </div>
        );
    }
}

export default Index;