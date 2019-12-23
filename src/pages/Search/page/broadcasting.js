/*
 * @Author: REFUSE_C
 * @Date: 2019-12-06 18:49:07
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-10 11:44:14
 * @Description: 
 */
import React, { Component } from 'react';

class Broadcasting extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log(this.props.list)
        return (
            <div className="broadcasting">
                <ul>
                    {
                        this.props.list && this.props.list.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div className="img">
                                        <img src={item.picUrl} alt="" />
                                    </div>
                                    <div className="info">
                                        <p>{item.name}</p>
                                        <p>{item.nickname}</p>
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

export default Broadcasting;