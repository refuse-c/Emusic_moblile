/*
 * @Author: REFUSE_C
 * @Date: 2019-12-10 09:22:01
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 13:55:12
 * @Description: 
 */
import React, { Component } from 'react';
import './Single.scss'

import { FormatNum, isEmpty } from '../../utils/format'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Link } from 'react-router-dom'
import { changeStatus, getMusicList, changeIndex } from '../../store/actions'
class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: NaN
        }
    }
    componentDidMount = () => {
        this.equal()
    }
    equal = () => {
        const { playList, index, list } = this.props
        var showStyStatus = true;
        if (!isEmpty(playList) && !isEmpty(list)) {
            list.forEach((e, i) => {
                if (e.id === playList[index].id) {
                    showStyStatus = false;
                    this.setState({ active: i })
                }
                if (showStyStatus) {
                    this.setState({ active: NaN })
                }
            });
        }
    }
    componentWillReceiveProps = () => {
        this.equal();
    }
    //播放全部
    allPlay = () => {
        const { list } = this.props
        this.props.getMusicList(list)
        this.props.changeIndex(0)
        this.setState({ active: 0 })
        this.props.changeStatus(true)
    }
    addPlay = (index) => {
        var ra = true
        const { playList } = this.props
        const playerList = this.props.list
        console.log(playerList.list)
        const musicId = playerList.list[index].id
        playList.forEach((e, i) => {
            if (e.id === musicId) {
                ra = false
                this.props.changeIndex(i)
                return false
            }
        })
        if (ra) {
            const newPlayList = JSON.parse(JSON.stringify(playList))
            newPlayList.unshift(playerList.list[index])
            console.log(newPlayList)
            this.props.getMusicList(newPlayList)
            this.props.changeIndex(0)
        }
        this.setState({ active: index })
        this.props.changeStatus(true)
    }
    gotoMv = (id, e) => {
        console.log(id)
        this.props.history.push({ pathname: '/videoDetails' + id });
        e.stopPropagation();
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        const { list } = this.props
        const { active } = this.state
        return (
            <ul className="module-list">
                {
                    list.list && list.list.map((item, index) => {
                        const liClass = active === index ? ' liSty' : ''
                        const numClass = active === index ? ' numSty' : ''
                        const mvClass = active === index ? 'icon-mv' : 'icon-mv-sty'
                        const moreClass = active === index ? 'icon-more-sty' : 'icon-more'
                        return (
                            <li
                                className={'item' + liClass}
                                key={index}
                                onClick={this.addPlay.bind(this, index)}
                            >
                                <div className='lfet'>
                                    <p className={'num' + numClass}>{FormatNum(index)}</p>
                                    <div>
                                        <p>{item.name}</p>
                                        <p>{item.singer.map(item => item.name + '').join(' - ')}</p>
                                    </div>
                                </div>
                                <div className='right'>
                                    <div
                                        onClick={this.gotoMv.bind(this, item.mvid)}
                                        className={Number(item.mvid) === 0 ? '' : 'icon ' + mvClass}></div>
                                    <div className={'icon ' + moreClass}></div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

//注册store
const mapStateToProps = (state) => {
    return {
        playList: state.playList,//音乐列表
        playerList: state.playerList,//音乐列表
        index: state.index,//index
        playStatus: state.playStatus,
        userInfo: state.userInfo,
        activeNum: state.activeNum
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: bindActionCreators(changeStatus, dispatch),
        getMusicList: bindActionCreators(getMusicList, dispatch),
        changeIndex: bindActionCreators(changeIndex, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Single);