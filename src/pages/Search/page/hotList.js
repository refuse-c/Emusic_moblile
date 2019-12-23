/*
 * @Author: REFUSE_C
 * @Date: 2019-12-05 09:18:07
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-05 13:07:29
 * @Description: 
 */
import React, { Component } from 'react';
import './gather.scss'
import { FormatNum } from '../../../utils/format'
class HotList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        // console.log(this.props.list)
        return (
            <div className="hotList">
                <h4>热搜榜</h4>
                <ul>
                    {
                        this.props.list && this.props.list.map((item, index) => {
                            const color = index < 3 ? 'color-F04849' : 'color-ACACAC'
                            return (
                                <li key={index}
                                    onClick={this.props.news.getChildData.bind(this, item.searchWord)}
                                >
                                    <span className={color}>{FormatNum(index)}</span>
                                    <div>
                                        <div>
                                            <p>{item.searchWord}</p>
                                            <p>{item.content}</p>
                                        </div>
                                        <label>{item.score}</label>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div >
        );
    }
}

export default HotList;