/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 10:00:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 09:39:04
 * @Description: 
 */
import React, { Component } from 'react';
import { changeStatus, changeIndex, getPlayerList, getMusicList } from '../../store/actions'
import { userPlaylist, playlistDetail, userRecord } from '../../api/api'
import { RAGet } from '../../api/network'
import { fomatDate, getSinger } from '../../utils/format'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Me.scss'
class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: 'REFUSE_C',
            musicList: {},
            userId: 287070050
        }
    }
    componentDidMount() {
        this.getPlayList()
        this.getUserRecord()
    }
    getPlayList = () => {
        // const { userId, nickname } = this.props.userInfo
        const { userId, nickname } = this.state
        RAGet(userPlaylist.api_url, {
            params: {
                uid: userId
            }
        }).then(res => {
            const data = res.playlist
            const list = {
                own: [],
                collect: []
            }
            data.map((item, index) => {
                const obj = {}
                obj.id = item.id
                obj.userName = item.creator.nickname
                obj.ordered = item.ordered
                obj.trackCount = item.trackCount//播放量
                obj.coverImgUrl = item.coverImgUrl + '?param=300y300' //歌单封面
                obj.createTime = fomatDate(item.createTime)
                obj.updateTime = fomatDate(item.updateTime)
                obj.avatarUrl = item.creator.avatarUrl + '?param=300y300' //用户头像
                obj.backgroundUrl = item.creator.backgroundUrl + '?param=500y200' //用户背景图
                obj.privacy = item.privacy
                obj.description = item.description || ''
                obj.userId = item.userId
                if (obj.userName === nickname) {
                    obj.name = item.name.replace(nickname, '我')
                } else {
                    obj.name = item.name
                }
                if (obj.privacy !== 10) {
                    // if (obj.trackCount !== 0 && obj.privacy !== 10) {
                    if (obj.userId === Number(userId)) {
                        list.own.push(obj)
                    }
                    if (obj.userId !== Number(userId)) {
                        list.collect.push(obj)
                    }
                }
                return index.id
            })
            this.setState({ musicList: list })
        })
    }
    //获取用户播放记录
    getUserRecord = (id) => {
        const list = []
        const { userId } = this.state
        RAGet(userRecord.api_url, {
            params: {
                uid: userId,
                type: 1
            }
        }).then(res => {
            // console.log(res)
            const data = res.weekData
            data.map((item, index) => {
                const obj = {}
                obj.playCount = item.playCount;
                obj.score = item.score;
                obj.dt = item.song.dt / 1000//时长(s)
                obj.mv = item.song.mv
                obj.name = item.song.name

                //al
                obj.alId = item.song.al.id
                obj.alName = item.song.al.name
                obj.alPic = item.song.al.pic
                obj.picUrl = item.song.al.picUrl + '?param=300y300'//专辑图//专辑图
                obj.alPic_str = item.song.al.pic_str
                obj.singer = getSinger(item.song.ar)

                obj.cd = item.song.cd
                obj.cf = item.song.cf
                obj.copyright = item.song.copyright
                obj.cp = item.song.cp
                obj.crbt = item.song.crbt
                obj.djId = item.song.djId
                obj.fee = item.song.fee
                obj.ftype = item.song.ftype
                list.push(obj)
                return index.id
            })
            // console.log(list)
        }).catch(err => {
            console.log(err)
        })
    }
    //获取歌单详情
    getPlayDetail = (id) => {
        const { nickname } = this.props.userInfo
        RAGet(playlistDetail.api_url, {
            params: {
                id: id
            }
        }).then(res => {
            const data = res.playlist
            const list = {
                list: []
            }
            list.id = data.id
            list.name = data.name.replace(nickname, '我')
            list.playCount = data.playCount//播放次数
            list.description = data.description
            list.coverImgUrl = data.coverImgUrl//歌单封面
            list.createTime = fomatDate(data.createTime)
            list.updateTime = fomatDate(data.updateTime)
            list.birthday = fomatDate(data.creator.birthday)
            list.nickname = data.creator.nickname
            list.signature = data.creator.signature
            list.avatarUrl = data.creator.avatarUrl//用户头像
            list.backgroundUrl = data.creator.backgroundUrl + '?param=500y200'//用户背景图
            data.tracks.map((item, index) => {
                const obj = {}
                obj.id = item.id//id
                obj.dt = item.dt / 1000//时长(s)
                obj.name = item.name//名字
                obj.alName = item.al.name//专辑名字
                obj.url = 'https://music.163.com/song/media/outer/url?id=' + obj.id
                obj.picUrl = item.al.picUrl + '?param=300y300'//专辑图
                obj.mvid = item.mv;
                obj.singer = getSinger(item.ar)
                list.list.push(obj)
                return index.id
            })
            this.props.getPlayerList(list)
            this.props.history.push('/index/list');
        }).catch(err => {
            console.log(err)
        })
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        const { musicList } = this.state
        return (
            <div className="me">
                <ul className="me-menu">
                    <li>
                        <span className="icon icon-locality"></span>
                        <p>本地音乐</p>
                    </li>
                    <li>
                        <span className="icon iocn-recently"></span>
                        <p>最近播放</p>
                    </li>
                    <li>
                        <span className="icon icon-download"></span>
                        <p>下载管理</p>
                    </li>
                    <li>
                        <span className="icon icon-station"></span>
                        <p>我的电台</p>
                    </li>
                    <li>
                        <span className="icon icon-collect"></span>
                        <p>我的收藏</p>
                    </li>
                </ul>
                <h3>
                    <div className="left">
                        <p>创建的歌单</p>
                        <span>（{musicList.own && musicList.own.length}）</span>
                    </div>
                    <div className="right">
                        <div className="icon add"></div>
                        <div className="icon more"></div>
                    </div>
                </h3>
                <ul className="me-list">
                    {
                        musicList.own && musicList.own.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={this.getPlayDetail.bind(this, item.id)}
                                >
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="list-info">
                                        <p>{item.name}</p>
                                        <p>{item.trackCount}</p>
                                    </div>
                                    <span className="icon icon-more"></span>
                                </li>
                            )
                        })
                    }
                </ul>
                <h3>
                    <div className="left">
                        <p>收藏的歌单</p>
                        <span>（{musicList.collect && musicList.collect.length}）</span>
                    </div>
                    <div className="right">
                        <div className="icon more"></div>
                    </div>
                </h3>
                <ul className="me-list">
                    {
                        musicList.collect && musicList.collect.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={this.getPlayDetail.bind(this, item.id)}
                                >
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="list-info">
                                        <p>{item.name}</p>
                                        <p>{item.trackCount}</p>
                                    </div>
                                    <span className="icon icon-more"></span>
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
        musicList: state.musicList,//音乐列表
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
        changeIndex: bindActionCreators(changeIndex, dispatch),
        getPlayerList: bindActionCreators(getPlayerList, dispatch),
        getMusicList: bindActionCreators(getMusicList, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Me);