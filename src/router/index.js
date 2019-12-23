/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 10:30:34
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 14:25:54
 * @Description: 
 */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login/Login'
import Index from '../pages/Index/Index'
import Player from '../pages/Player/Player'
import More from '../components/More/More'
import VideoDetails from '../pages/VideoDetails/VideoDetails'


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/index' component={Index} />
                <Route path='/player' component={Player} />
                <Route path='/more' component={More} />
                <Route path='/videoDetails:id' component={VideoDetails} />
                <Redirect to='/login' />
            </Switch>
        </Router>
    )
}
export default Routes;