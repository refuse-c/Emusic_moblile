/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 10:00:01
 * @LastEditors: RA
 * @LastEditTime: 2020-02-23 14:28:01
 * @Description: 
 */
import React, { Component } from 'react';

import './index.scss'
import { changeStatus, changeIndex } from '../../store/actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Link } from 'react-router-dom';
import { FormatNum } from '../../utils/format'
import Home from '../Home/Home'
import List from '../List/List'
import RecommendSongs from '../List/RecommendSong'
import SongList from '../../pages/SongList/SongList'
import TopList from '../../pages/TopList/TopList'
import Search from '../../pages/Search/Search'
import Setting from '../../pages/Setting/Setting'
import Singer from '../../pages/Singer/Singer'



class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    refuse = () => {
        const val = !this.props.playStatus
        this.props.changeStatus(val)
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
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
        const { playStatus, playList, index } = this.props
        // console.log(playList)
        return (
            <div className="index">
                <div className="top">
                    <Route path='/index/home' component={Home} />
                    <Route path='/index/list' component={List} />
                    <Route path='/index/recommendsongs' component={RecommendSongs} />
                    <Route path='/index/songlist' component={SongList} />
                    <Route path='/index/toplist' component={TopList} />
                    <Route path='/index/search' component={Search} />
                    <Route path='/index/setting' component={Setting} />
                    <Route path='/index/singer:id' component={Singer} />
                    {/* <Redirect to='/index/home' /> */}
                    {/* <Redirect to='/index/singer5781' /> */}

                </div>
                <div className="bottom">
                    <Link to="/player">
                        <div className="img">
                            <img src={playList[0] && playList[index].picUrl} alt="" />
                        </div>
                        <div className="info">
                            <p>{playList[0] && playList[index].name}</p>
                            <p>{
                                playList[0] && playList[index].singer.map(item => item.name + '').join('/')
                            }</p>
                        </div>
                    </Link>
                    <div onClick={this.refuse} className={(playStatus ? ' pause' : 'play') + ' ply'}></div>
                    <div onClick={this.showList} className="icon icon-list-f"></div>
                </div>
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
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: bindActionCreators(changeStatus, dispatch),
        changeIndex: bindActionCreators(changeIndex, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
// export default Index;