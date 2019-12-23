/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 10:00:20
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-11 11:30:45
 * @Description: 
 */
import React, { Component } from 'react';

import './Cloud.scss'
import { RAGet } from '../../api/network';
import { hotwallList } from '../../api/api';
// import { returnIndex } from '../../utils/format'

class Cloud extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    getHotwallList = () => {
        RAGet(hotwallList.api_url, {
            param: {}
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount = () => {
        this.getHotwallList()
    }
    render() {


        return (
            <div className="Cloud">
                <div className="buzz">
                    <p>云村热评墙 <span> > </span></p>
                </div>
            </div>
        );
    }
}

export default Cloud;