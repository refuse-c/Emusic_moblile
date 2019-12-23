/*
 * @Author: REFUSE_C
 * @Date: 2019-11-29 16:56:33
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-11 10:20:15
 * @Description: 
 */
import React, { Component } from 'react';
import { isEmpty } from '../../../utils/format';
// import { Link } from 'react-router-dom';
class singer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getArtist = (id) => {
        this.props.history.push('/index/singer' + id);
    }
    render() {
        return (
            <div className="singer">
                <ul>
                    {
                        this.props.list.artists && this.props.list.artists.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={this.getArtist.bind(this, item.id)}
                                >
                                    <div>
                                        <img src={item.picUrl + '?param=300y300'} alt="" />
                                        < div >
                                            <p>{item.name}</p>
                                            <p>{!isEmpty(item.alia) ? '(' + item.alia[0] + ')' : ''}</p>
                                        </div>
                                    </div>
                                    <span>关注</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default singer;