/*
 * @Author: REFUSE_C
 * @Date: 2019-11-26 12:44:11
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 13:46:44
 * @Description: 
 */
import React, { Component } from 'react';
import { RAGet } from '../../api/network'
import { topList, playlistDetail } from '../../api/api'
import { changeIndex, getPlayerList } from '../../store/actions'
import { fomatDate, fomatPlaycount, isEmpty, getSinger } from '../../utils/format'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import './TopLIst.scss'
class TopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topListDate: []
        }
    }
    //获取所有榜单
    getTopList = () => {
        RAGet(topList.api_url, {
            params: {}
        }).then(res => {
            const data = res.list;
            const reRecommend = /抖音|说唱榜|电音|ACG音乐|欧美新歌/gi;
            const reGlobal = /美国|UK|电子|日本|iTunes|英国/gi;

            const list = {
                official: [],//官方榜
                recommend: [],//推荐榜
                global: [],//全球榜
                rest: [],//其他
            }
            // console.log(data)
            data && data.map((item, index) => {
                const obj = {}
                obj.ToplistType = item.ToplistType
                obj.adType = item.adType
                obj.anonimous = item.anonimous
                obj.cloudTrackCount = item.cloudTrackCount
                obj.coverImgUrl = item.coverImgUrl
                obj.createTime = item.createTime
                obj.creator = item.creator
                obj.description = item.description
                obj.englishTitle = item.englishTitle
                obj.highQuality = item.highQuality
                obj.id = item.id
                obj.name = item.name
                obj.newImported = item.newImported
                obj.opRecommend = item.opRecommend
                obj.ordered = item.ordered
                obj.playCount = fomatPlaycount(item.playCount)
                obj.privacy = item.privacy
                obj.specialType = item.specialType
                obj.subscribedCount = fomatPlaycount(item.subscribedCount)
                obj.trackCount = item.trackCount
                obj.trackNumberUpdateTime = fomatDate(item.trackNumberUpdateTime)
                obj.trackUpdateTime = fomatDate(item.trackUpdateTime)
                obj.updateFrequency = item.updateFrequency
                obj.updateTime = fomatDate(item.updateTime)
                obj.userId = item.userId
                obj.list = []

                if (!isEmpty(item.ToplistType)) {
                    list.official.push(obj)
                } else if (reRecommend.exec(item.name)) {
                    list.recommend.push(obj)
                    reRecommend.lastIndex = 0;
                } else if (reGlobal.test(item.name)) {
                    list.global.push(obj)
                    reGlobal.lastIndex = 0;
                } else {
                    list.rest.push(obj)
                }
                return index.id
            })
            this.setState({ topListDate: list })
            this.state.topListDate.official && this.state.topListDate.official.map((item, index) => {
                this.getPlayDetail_copy(item.id, index)
                return index.id
            })

        }).catch(err => {
            console.log(err)
        })
    }
    getPlayDetail_copy = (id, num) => {
        const { topListDate } = this.state
        RAGet(playlistDetail.api_url, {
            params: {
                id: id
            }
        }).then(res => {
            const data = res.playlist
            // console.log(data)
            const list = {
                list: []
            }
            list.id = data.id
            list.name = data.name
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
                if (index > 2) return false
                const obj = {}
                obj.id = item.id//id
                obj.dt = item.dt / 1000//时长(s)
                obj.name = item.name//名字
                obj.alName = item.al.name//专辑名字
                obj.url = 'https://music.163.com/song/media/outer/url?id=' + obj.id
                obj.picUrl = item.al.picUrl + '?param=300y300'//专辑图
                obj.singer = getSinger(item.ar)
                list.list.push(obj)
                return index.id
            })
            topListDate.official[num].list = list
            this.setState({ topListDate: topListDate })

        }).catch(err => {
            console.log(err)
        })
    }
    getPlayDetail = (id) => {
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
            list.name = data.name
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
    componentDidMount = () => {
        this.getTopList()
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        const { topListDate } = this.state
        return (
            <div className="top-list">
                <header ref="header">
                    <Link to='/index/home/'>
                        <div className="icon icon-search-back"></div>
                    </Link>
                    <div className="title">排行榜</div>
                </header>
                <h3>
                    <div className="left">
                        <p>官方榜</p>
                    </div>
                </h3>
                <ul className="toplist">
                    {
                        topListDate.official && topListDate.official.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={this.getPlayDetail.bind(this, item.id)}
                                >
                                    <div>
                                        <img src={item.coverImgUrl} alt="" />
                                        <p>{item.updateFrequency}</p>
                                    </div>
                                    <ul>
                                        {
                                            item.list.list && item.list.list.map((data, v) => {
                                                return (
                                                    <li key={v}>{data.name} - {data.singer[0].name}</li>
                                                )
                                            })

                                        }
                                    </ul>
                                </li>
                            )
                        })
                    }

                </ul>
                <h3>
                    <div className="left">
                        <p>推荐榜</p>
                    </div>
                </h3>
                <ul className="playlist">
                    {
                        topListDate.recommend && topListDate.recommend.map((item, index) => {
                            // if (index >= 6) return false
                            return (
                                <li
                                    key={index}
                                    onClick={this.getPlayDetail.bind(this, item.id)}
                                >
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="title">
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="playcount-bg">
                                        <p>{item.playCount}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>

                <h3>
                    <div className="left">
                        <p>全球榜</p>
                    </div>
                </h3>
                <ul className="playlist">
                    {
                        topListDate.global && topListDate.global.map((item, index) => {
                            // if (index >= 6) return false
                            return (
                                <li
                                    key={index}
                                    onClick={this.getPlayDetail.bind(this, item.id)}
                                >
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="title">
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="playcount-bg">
                                        <p>{item.playCount}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <h3>
                    <div className="left">
                        <p>更多榜单</p>
                    </div>
                </h3>
                <ul className="playlist">
                    {
                        topListDate.rest && topListDate.rest.map((item, index) => {
                            // if (index >= 6) return false
                            return (
                                <li
                                    key={index}
                                    onClick={this.getPlayDetail.bind(this, item.id)}
                                >
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="title">
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="playcount-bg">
                                        <p>{item.playCount}</p>
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
        playerList: state.playerList,//音乐列表
        index: state.index,//index
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlayerList: bindActionCreators(getPlayerList, dispatch),
        changeIndex: bindActionCreators(changeIndex, dispatch),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopList);