/*
 * @Author: REFUSE_C
 * @Date: 2019-11-29 16:56:33
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-10 16:47:51
 * @Description: 
 */
import React, { Component } from 'react';
import './Video.scss'
import { fomatPlaycount } from '../../utils/format';
class video extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { list } = this.props;
        return (
            <ul className="video">
                {
                    list && list.map((item, index) => {
                        return (
                            <li key={index}>
                                <div className="img">
                                    <img src={item.imgurl} alt="" />
                                    <div className="playcount-bg">
                                        <p>{fomatPlaycount(item.playCount)}</p>
                                    </div>
                                </div>
                                <div className="info">
                                    <p>{item.name}</p>
                                    <p>
                                        <span>{item.publishTime}</span>
                                    </p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

export default video;