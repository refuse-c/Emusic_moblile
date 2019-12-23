/*
 * @Author: REFUSE_C
 * @Date: 2019-11-29 17:00:33
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-10 11:45:53
 * @Description: 
 */
import React, { Component } from 'react';

class user extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="userInfo">
                <ul>
                    {
                        this.props.list && this.props.list.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div>
                                        <img src={item.avatarUrl} alt="" />
                                        <div>
                                            <p>{item.nickname}</p>
                                            <p>{item.signature}</p>
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
export default user;