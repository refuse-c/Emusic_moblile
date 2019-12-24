/*
 * @Author: REFUSE_C
 * @Date: 2019-11-25 13:21:38
 * @LastEditors  : refuse_c
 * @LastEditTime : 2019-12-24 15:28:05
 * @Description: 
 */
import React, { Component } from 'react';
import { RAGet } from '../../api/network';
import { playlistCatlist, playlistTop, playlistDetail } from '../../api/api'
import { fomatDate, fomatPlaycount, getSinger } from '../../utils/format'
import { getPlayerList, changeIndex } from '../../store/actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import './SongList.scss'
class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catlistData: [],
            fomatData: [],
            playlistData: [],
            active: 0,
            optionValue: 'all',
            listId: '',
            listTotal: 30,//歌单总数
            moreTitle: true
        }
    }
    getPlaylistCatlist = () => {
        RAGet(playlistCatlist.api_url, {
            params: {}
        }).then(res => {
            const data = res.sub;
            this.setState({ catlistData: data, fomatData: data })
            this.getplaylistTop(data[0].name)
        }).catch(err => {
            console.log(err)
        })
    }
    getplaylistTop = (id, num) => {
        RAGet(playlistTop.api_url, {
            params: {
                cat: id,
                limit: num
            }
        }).then(res => {
            this.setState({ listTotal: res.total, listId: id })
            const data = res.playlists
            const list = []
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
                obj.name = item.name
                obj.playCount = fomatPlaycount(item.playCount)
                list.push(obj)
                return index.id
            })
            this.setState({
                playlistData: list
            })
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
            list.backgroundUrl = data.creator.backgroundUrl + '?param=500y200' //用户背景图
            data.tracks.map((item, index) => {
                const obj = {}
                obj.id = item.id//id
                obj.dt = item.dt / 1000//时长(s)
                obj.name = item.name//名字
                obj.alName = item.al.name//专辑名字
                obj.url = 'https://music.163.com/song/media/outer/url?id=' + obj.id
                obj.picUrl = item.al.picUrl + '?param=300y300'//专辑图
                obj.mvid = item.mv
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
    componentDidMount() {
        this.getPlaylistCatlist()
    }
    changeStyle = (index) => {
        const { fomatData } = this.state
        const name = fomatData && fomatData[index].name
        this.getplaylistTop(name)
        this.setState({ active: index, moreTitle: true })
    }
    changeOptionVal = (e) => {
        const optionValue = e.target.value
        const { catlistData } = this.state
        var cc = []
        catlistData && catlistData.map((item, index) => {
            if (item.category.toString().indexOf(optionValue) > -1) {
                cc.push(item)
            } else if (optionValue === 'all') {
                cc = catlistData
            }
            return index.id
        })
        this.setState({ fomatData: cc }, () => {
            const name = cc[0].name
            this.getplaylistTop(name)
        })
    }
    loadMore = () => {
        const { listId, listTotal } = this.state
        this.getplaylistTop(listId, listTotal)
        this.setState({ moreTitle: false })
    }
    render() {
        const { fomatData, active, playlistData } = this.state
        return (
            <div className="song-list">
                <header ref="header">
                    <Link to='/index/home/'>
                        <div className="icon icon-search-back"></div>
                    </Link>
                    <div className="title">歌单广场</div>
                </header>
                <div className="song-list-top">
                    <select onChange={this.changeOptionVal} name="" id="">
                        <option value='all'>全部</option>
                        <option value='0'>语种</option>
                        <option value='1'>风格</option>
                        <option value='2'>场景</option>
                        <option value='3'>情感</option>
                        <option value='4'>主题</option>
                    </select>
                    <ul>
                        {
                            fomatData && fomatData.map((item, index) => {
                                const xbh = active === index ? 'actives' : ''
                                return (
                                    <li
                                        key={index}
                                        className={xbh}
                                        onClick={this.changeStyle.bind(this, index)}
                                    >{item.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <ul className="playlist">
                    {
                        playlistData && playlistData.map((item, index) => {
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
                <div
                    style={{ display: this.state.moreTitle ? 'block' : 'none' }}
                    onClick={this.loadMore}
                    className="loadMore"
                >加载更多···</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(SongList);