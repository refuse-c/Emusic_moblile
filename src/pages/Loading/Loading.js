/*
 * @Author: REFUSE_C
 * @Date: 2019-11-25 16:58:25
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-11-29 15:39:43
 * @Description: 
 */

import React, { Component } from 'react';
import './Loading.scss'
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTrue: false
        }
    }

    show = () => {
        this.setState({
            isTrue: true
        })
    }

    hide = () => {
        this.setState({
            isTrue: false
        })
    }
    render() {

        const { isTrue } = this.state
        return (
            <div style={{ display: isTrue === false ? 'none' : 'block' }} className="loading">
                <div>
                    <span></span>
                    <p>努力加载中...</p>
                </div>
            </div>
        );
    }
}

export default Loading;
