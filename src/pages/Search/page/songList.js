/*
 * @Author: REFUSE_C
 * @Date: 2019-11-29 16:56:33
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 11:21:34
 * @Description: 
 */
import React, { Component } from 'react';
import './gather.scss'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Link } from 'react-router-dom'
import { playlistDetail } from '../../../api/api'
import { RAGet } from '../../../api/network'
import { changeStatus, getMusicList, changeIndex, getPlayerList } from '../../../store/actions'
import { fomatDate, fomatPlaycount } from '../../../utils/format'
class songList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: NaN
        }
    }
    //获取歌单详情
    getPlayDetail = (id) => {
        console.log(id)
        const { nickname } = this.props.userInfo
        RAGet(playlistDetail.api_url, {
            params: {
                id: id
            }
        }).then(res => {
            const data = res
            const list = {
                list: []
            }
            list.id = data.playlist.id
            list.name = data.playlist.name.replace(nickname, '我')
            list.playCount = data.playlist.playCount//播放次数
            list.description = data.playlist.description
            list.coverImgUrl = data.playlist.coverImgUrl//歌单封面
            list.createTime = fomatDate(data.playlist.createTime)
            list.updateTime = fomatDate(data.playlist.updateTime)
            list.birthday = fomatDate(data.playlist.creator.birthday)
            list.nickname = data.playlist.creator.nickname
            list.signature = data.playlist.creator.signature
            list.avatarUrl = data.playlist.creator.avatarUrl//用户头像
            list.backgroundUrl = data.playlist.creator.backgroundUrl + '?param=500y200'//用户背景图
            data.playlist.tracks.map((item, index) => {
                const obj = {}
                obj.id = item.id//id
                obj.dt = item.dt / 1000//时长(s)
                obj.name = item.name//名字
                obj.alName = item.al.name//专辑名字
                obj.url = 'https://music.163.com/song/media/outer/url?id=' + obj.id
                obj.picUrl = item.al.picUrl + '?param=300y300'//专辑图
                obj.singer = item.ar
                obj.mvid = item.mv
                list.list.push(obj)
                return index.id
            })
            this.props.getPlayerList(list)
            this.props.history.push('/index/list/')
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="songList">
                <ul className="me-list">
                    {
                        this.props.list && this.props.list.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={this.getPlayDetail.bind(this, item.id)}
                                >
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="list-info">
                                        <p>{item.name}</p>
                                        <p>
                                            <span>{item.trackCount + ' 首'}</span>
                                            <span>{'by ' + item.nickname}</span>
                                            <span>{'播放' + fomatPlaycount(item.playCount) + '次'}</span>
                                        </p>
                                    </div>
                                    {/* <span className="icon icon-more"></span> */}
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
        userInfo: state.userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: bindActionCreators(changeStatus, dispatch),
        getMusicList: bindActionCreators(getMusicList, dispatch),
        changeIndex: bindActionCreators(changeIndex, dispatch),
        getPlayerList: bindActionCreators(getPlayerList, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(songList);