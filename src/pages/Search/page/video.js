/*
 * @Author: REFUSE_C
 * @Date: 2019-11-29 16:56:33
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 11:18:43
 * @Description: 
 */
import React, { Component } from 'react';
import { FormatPlayTime, fomatPlaycount } from '../../../utils/format';
class video extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    gotoMv = (id, e) => {
        console.log(id)
        this.props.history.push({ pathname: '/videoDetails' + id });
        e.stopPropagation();
    }
    render() {
        console.log(this.props.list)
        return (
            <div className="sVideo">
                <ul>
                    {
                        this.props.list.videos && this.props.list.videos.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={this.gotoMv.bind(this, item.vid)}
                                >
                                    <div className="img">
                                        <img src={item.coverUrl} alt="" />
                                        <div className="playcount-bg">
                                            <p>{fomatPlaycount(item.playTime)}</p>
                                        </div>
                                    </div>
                                    <div className="info">
                                        <p>{item.title}</p>
                                        <p>
                                            <span>{FormatPlayTime(item.durationms / 1000)}</span>
                                            <span>{'by' + item.creator[0].userName}</span>

                                        </p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default video;