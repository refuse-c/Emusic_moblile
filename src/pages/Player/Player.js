/*
 * @Author: REFUSE_C
 * @Date: 2019-11-15 11:41:20
 * @LastEditors: RA
 * @LastEditTime: 2020-02-23 14:20:31
 * @Description: 
 */
import React, { Component } from 'react';

import './Player.scss'
import { changeStatus, changeIndex, changeMode } from '../../store/actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { FormatPlayTime, FormatNum } from '../../utils/format'

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cw: 0,
            aw: 0
        }
    }
    refuse = () => {
        const val = !this.props.playStatus
        this.props.changeStatus(val)
    }
    componentDidMount() {
        this.setState({
            aw: this.refs.progress.clientWidth
        })
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        }
    }
    //播放模式切换
    cutMode = () => {
        let mode = this.props.playMode;
        mode = mode === 1 ? 2 : (mode === 2 ? 3 : 1)
        this.props.changeMode(mode)
    }
    // 上一曲
    preSong = () => {
        console.log('dasdsa')
        const songLength = this.props.playList.length - 1;
        let num = this.props.index;
        num === 0 ? this.props.changeIndex(songLength) : this.props.changeIndex(--num)
    }

    //下一曲
    nextSong = () => {
        const { playMode } = this.props;
        const songLength = this.props.playList.length;
        if (playMode === 2) {
            for (var i = 0; i < songLength; i++) {
                var cd = parseInt(Math.random() * songLength);
            }
            let num = ++cd % songLength;
            this.props.changeIndex(num);
        } else {
            let index = this.props.index;
            let num = ++index % songLength;
            this.props.changeIndex(num);
        }
    }
    //播放
    player = (index) => {
        this.props.changeIndex(index)
        this.props.changeStatus(true)
    }
    //显示列表
    showList = (e) => {
        this.refs.playerList.style.display = 'block'
        e.stopPropagation();
    }
    //掩藏列表
    hideList = () => {
        this.refs.playerList.style.display = 'none'
    }

    render() {
        const { aw } = this.state
        const { playStatus, playList, index, playMode, currentTime, duration } = this.props
        const cw = currentTime / duration * aw
        return (
            <div className="player" onClick={this.hideList}>
                <div className="filter"></div>
                <header>
                    <Link to='/index/home/me'>
                        <div className="icon back"></div>
                    </Link>
                    <div className="title">
                        <p>{playList[0] && playList[index].name}</p>
                        <p>{
                            playList[0] && playList[index].singer.map(item => item.name + '').join(' / ')
                        }</p>
                    </div>
                    <div className="icon share"></div>
                </header>
                <main>
                    <div className={playStatus ? 'album rotate' : 'album'} >
                        <div className="circle"></div>
                        <img src={playList[0] && playList[index].picUrl} alt="" />
                    </div>
                </main>
                <footer>
                    <div className="bar">
                        <div className="time left">{FormatPlayTime(currentTime)}</div>
                        <div ref="progress" className="progress">
                            <div className="cache-progress"></div>
                            <div className="current-progress" style={{ width: cw }}></div>
                        </div>
                        <div className="time right">{FormatPlayTime(playList[0] && playList[index].dt)}</div>
                    </div>
                    <ul className="control-list">
                        <li onClick={this.cutMode} className={playMode === 1 ? 'icon icon-order' : (playMode === 2 ? 'icon icon-random' : 'icon icon-only')}></li>
                        <li onClick={this.preSong} className="icon icon-pre"></li>
                        <li onClick={this.refuse} className={playStatus ? 'icon-pause' : 'icon-play'}></li>
                        <li onClick={this.nextSong} className="icon icon-next"></li>
                        <li onClick={this.showList.bind(this)} className="icon icon-list"></li>
                    </ul>
                </footer>
                <div
                    ref='playerList'
                    className="index-list"
                    onClick={this.hideList}
                >
                    <div
                        className="player-list"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3>{FormatNum(index)} / {playList[0] && FormatNum(playList.length - 1)}</h3>
                        <ul className="list">
                            {
                                playList[0] && playList.map((item, indexs) => {
                                    const liClass = index === indexs ? ' liSty' : ''
                                    const numClass = index === indexs ? ' numSty' : ''
                                    const mvClass = index === indexs ? 'icon-mv' : 'icon-mv-sty'
                                    const moreClass = index === indexs ? 'icon-more-sty' : 'icon-more'
                                    return (
                                        <li
                                            className={'item' + liClass}
                                            key={indexs}
                                            onClick={this.player.bind(this, indexs)}
                                        >
                                            <div className='lfet'>
                                                <p className={'num' + numClass}>{FormatNum(indexs)}</p>
                                                <div>
                                                    <p>{item.name}</p>
                                                    <p>{item.singer.map(item => item.name + '').join(' - ')}</p>
                                                </div>
                                            </div>
                                            <div className='right'>
                                                <div className={Number(item.mvid) === 0 ? '' : 'icon ' + mvClass}></div>
                                                <div className={'icon ' + moreClass}></div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div >
        );
    }
}


//注册store
const mapStateToProps = (state) => {
    return {
        playList: state.playList,//音乐列表
        index: state.index,//index
        songUrl: state.songUrl,
        playStatus: state.playStatus,
        userInfo: state.userInfo,
        currentTime: state.currentTime,
        playMode: state.playMode,
        duration: state.duration
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: bindActionCreators(changeStatus, dispatch),
        changeIndex: bindActionCreators(changeIndex, dispatch),
        changeMode: bindActionCreators(changeMode, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);