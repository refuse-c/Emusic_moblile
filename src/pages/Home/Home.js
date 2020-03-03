/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 10:00:01
 * @LastEditors: RA
 * @LastEditTime: 2020-03-03 21:43:36
 * @Description: 
 */
import React, { Component } from 'react';

import './Home.scss'
import * as actions from '../../store/actions'
import store from '../../store'
import { Route, NavLink, Link } from 'react-router-dom';

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
                {/* <Prompt
                    // when={formIsHalfFilledOut}
                    message="你确定要离开当前页面吗？"
                /> */}
                <header>
                    <Icon
                        icon='icon-setting'
                        clickEven={this.clickEven}
                    />
                    {/* <div className="icon icon-setting"></div> */}
                    <ul>
                        <NavLink to='/index/home/me'><li>我的</li></NavLink >
                        <NavLink to='/index/home/' exact activeClassName="active"><li>发现</li></NavLink >
                        <NavLink to='/index/home/cloud'><li>云村</li></NavLink >
                        <NavLink to='/index/home/vidoe'><li>视频</li></NavLink >
                    </ul>
                    <Link to='/index/search'>
                        {/* <div className="icon icon-search"></div> */}
                        <Icon
                            icon='icon-search'
                        // clickEven={this.clickEven}
                        />
                    </Link>

                </header>
                <main>
                    <Route path='/index/home/me' component={Me} />
                    <Route path='/index/home/' exact component={Find} />
                    <Route path='/index/home/cloud' component={Cloud} />
                    <Route path='/index/home/vidoe' component={Video} />


                    {/* <Redirect to='/index/home/me' /> */}
                </main>
            </div>
        );
    }
}

export default Index;