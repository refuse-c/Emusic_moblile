/*
 * @Author: REFUSE_C
 * @Date: 2019-12-12 14:22:33
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-12 16:16:29
 * @Description: 添加按钮效果
 */
import React, { Component } from 'react';
import './Icon.scss'
import { isEmpty } from '../../utils/format';
class Icon extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    jump = () => {
        if (!isEmpty(this.props.clickEven)) { this.props.clickEven() };

    }
    touchStrt = () => {
        this.icon.style.backgroundColor = 'rgba(184,184,184,0.5)';
    }
    touchend = () => {
        this.icon.style.backgroundColor = '#fff';
    }
    render() {
        const { icon } = this.props
        return (
            <div
                className={"icons " + icon}
                onClick={this.jump}
                onTouchStart={this.touchStrt}
                onTouchEnd={this.touchend}
                ref={icon => this.icon = icon}
            ></div>
        );
    }
}

export default Icon;