/*
 * @Author: REFUSE_C
 * @Date: 2019-12-13 14:23:19
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 18:01:41
 * @Description: 
 */
import React, { Component } from 'react';
import './More.scss'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeStatus, getMusicList, changeIndex } from '../../store/actions'
class More extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                alName: "讨厌你",
                dt: 253.064,
                id: 533017741,
                mvid: 0,
                name: "讨厌你",
                picUrl: "http://p1.music.126.net/L0RwRkHFQNT-CmwOulUR_w==/109951163118614079.jpg?param=300y300",
                singer: [
                    {
                        id: 12292708,
                        name: "周思涵",
                    }, {
                        id: 12302029,
                        name: "王冕",
                    }
                ],
                url: "https://music.163.com/song/media/outer/url?id=533017741",
            }
        }
    }


    nextPlay = () => {
        var ra = true;
        const { playList, index, list } = this.props;
        const musicId = list.id;
        console.log(musicId)
        playList.forEach((e, i) => {
            if (e.id === musicId) {
                ra = false;
                return false;
            }
        })
        if (ra) {
            const newPlayList = JSON.parse(JSON.stringify(playList))
            newPlayList.splice(index + 1, 0, list)
            this.props.getMusicList(newPlayList);

        }
        this.props.getStatue(false)//掩藏
    }
    collect = () => {
        console.log('11111')
    }
    down = () => {
        console.log('11111')
    }
    comment = () => {
        console.log('11111')
    }
    share = () => {
        console.log('11111')
    }
    singer = () => {
        console.log('11111')
    }
    album = () => {
        console.log('11111')
    }
    video = () => {
        const id = this.props.list.mvid;
        this.props.history.push({ pathname: '/videoDetails' + id });
    }
    del = () => {
        this.props.getStatue(false)//掩藏
    }

    render() {
        const { list } = this.props;
        return (
            <div className="More" onClick={this.del}>
                <div className="info" onClick={(e) => { e.stopPropagation(); }}>
                    <div className="singer">
                        <img src={list.picUrl} alt="" />
                        <div>
                            <p>{list.name}</p>
                            <p>
                                {list.singer.map(item => item.name + '').join(' / ')}
                            </p>
                        </div>
                    </div>
                    <ul>
                        <li
                            onClick={this.nextPlay}
                        >
                            <span className="icon icon-nextPlay"></span>
                            <span>下一首播放</span>
                        </li>
                        <li
                            onClick={this.collect}
                        >
                            <span className="icon icon-collect"></span>
                            <span>收藏到歌单</span>
                        </li>
                        <li
                            onClick={this.down}
                        >
                            <span className="icon icon-down"></span>
                            <span>下载</span>
                        </li>
                        <li
                            onClick={this.comment}
                        >
                            <span className="icon icon-comment"></span>
                            <span>评论(1000)</span>
                        </li>
                        <li
                            onClick={this.share}
                        >
                            <span className="icon icon-share"></span>
                            <span>分享</span>
                        </li>
                        <li
                            onClick={this.singer}
                        >
                            <span className="icon icon-singer"></span>
                            <span>歌手</span>
                        </li>
                        <li
                            onClick={this.album}
                        >
                            <span className="icon icon-album"></span>
                            <span>专辑</span>
                        </li>
                        <li
                            style={{ display: list.mvid === 0 ? 'none' : 'flex' }}
                            onClick={this.video}
                        >
                            <span className="icon icon-video"></span>
                            <span>查看视频</span>
                        </li>
                    </ul>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(More);