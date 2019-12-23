/*
 * @Author: REFUSE_C
 * @Date: 2019-11-12 11:00:00
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-10 20:34:58
 * @Description: 
 */
import React, { Component } from 'react'
import Routers from './router/index'
import { Provider } from 'react-redux'
import store from './store/index';
import Audio from './pages/Audio/Audio'
import Loading from './pages/Loading/Loading'
import { persistor } from './store/index'
import { PersistGate } from 'redux-persist/lib/integration/react';
import './App.scss'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: ''
        }
    }
    componentDidMount = () => {
        global.showLoading = this._showLoading.bind(this)
        global.hideLoading = this._hideLoading.bind(this)
    }

    _showLoading = () => {
        this.loading.show()
    }

    _hideLoading = () => {
        this.loading.hide();
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Loading ref={loading => this.loading = loading} />
                    <div className="app">
                        <Audio />
                        <Routers />
                    </div>
                </PersistGate>
            </Provider>
        )
    }
}

export default App;