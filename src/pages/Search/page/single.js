/*
 * @Author: REFUSE_C
 * @Date: 2019-11-29 16:56:33
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 13:56:32
 * @Description: 
 */
import React, { Component } from 'react';
import './gather.scss'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeStatus, getMusicList, changeIndex } from '../../../store/actions'
import { FormatNum, isEmpty } from '../../../utils/format'
class single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: NaN,
            songDetailData: [],
        }
    }
    equal = () => {
        const { playList, index } = this.props
        const playerList = this.props.list
        var showStyStatus = true;
        if (!isEmpty(playList) && (playerList)) {
            playerList.forEach((e, i) => {
                if (e.id === playList[index].id) {
                    showStyStatus = false
                    this.setState({ active: i })
                }
                if (showStyStatus) {
                    this.setState({ active: NaN })
                }
            });
        }
    }
    //播放全部
    allPlay = () => {
        const playerList = this.props.list
        this.props.getMusicList(playerList)
        this.props.changeIndex(0)
        this.setState({ active: 0 })
        this.props.changeStatus(true)
    }
    addPlay = (index) => {
        var ra = true
        const { playList } = this.props
        const playerList = this.props.list
        const musicId = playerList[index].id
        playList.forEach((e, i) => {
            if (e.id === musicId) {
                ra = false
                this.props.changeIndex(i)
                return false
            }
        })
        if (ra) {
            const newPlayList = JSON.parse(JSON.stringify(playList))
            newPlayList.unshift(playerList[index])
            this.props.getMusicList(newPlayList)
            this.props.changeIndex(0)
        }
        this.setState({ active: index })
        this.props.changeStatus(true)
    }
    gotoMv = (id, e) => {
        this.props.history.push({ pathname: '/videoDetails' + id });
        e.stopPropagation();
    }
    componentWillReceiveProps = () => {
        this.equal();
    }
    render() {
        const { active } = this.state
        return (
            <div className="single">
                <div
                    onClick={this.allPlay}
                    className="icon ply-all"
                >
                    播放全部
                </div>
                <ul>
                    {
                        this.props.list && this.props.list.map((item, index) => {
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
            </div>
        );
    }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(single);