/*
 * @Author: REFUSE_C
 * @Date: 2019-11-29 16:59:52
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 10:12:00
 * @Description: 
 */
import React, { Component } from 'react';
import './Album.scss'
import { fomatDate, getSinger } from '../../utils/format';
import { RAGet } from '../../api/network';
import { album } from '../../api/api';
import { changeStatus, getMusicList, changeIndex, getPlayerList } from '../../store/actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    changeItem = (id) => {
        this.getAlbum(id);
    }

    getAlbum = (id) => {
        RAGet(album.api_url, {
            params: {
                id: id,
            }
        }).then(res => {
            console.log(res)
            const data = res;
            const list = {
                list: []
            }
            list.id = data.album.id
            list.name = data.album.name
            list.type = '专辑';
            list.alName = data.album.artists[0].name;
            list.alId = data.album.artists[0].id;

            // list.playCount = data.playCount//播放次数
            list.description = data.album.description
            list.coverImgUrl = data.album.picUrl//歌单封面
            data.songs.map((item, index) => {
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
            // this.props.changeIndex(0)
            console.log(list)
            this.props.history.push('/index/list');
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const data = this.props.list
        return (
            <ul className="album">
                {
                    data && data.map((item, index) => {
                        return (
                            <li key={index}
                                onClick={this.changeItem.bind(this, item.id)}
                            >

                                <div className="img">
                                    <img src={item.picUrl} alt="" />
                                </div>
                                <div className="info">
                                    <p>{item.name}</p>
                                    <p>
                                        <span>{item.name}</span>
                                        <span>{fomatDate(item.publishTime)}</span>
                                    </p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        musicList: state.musicList,//音乐列表
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
export default connect(mapStateToProps, mapDispatchToProps)(Album);