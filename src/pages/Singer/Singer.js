/*
 * @Author: REFUSE_C
 * @Date: 2019-12-09 13:59:36
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 13:39:01
 * @Description: 
 */
import React, { Component } from 'react';
import './Singer.scss'
import { RAGet } from '../../api/network';
import { artists, artistAlbum, artistMv } from '../../api/api';
import { Link } from 'react-router-dom';
// import { FormatNum } from '../../utils/format';
import Single from '../../components/Single/Single'
import Album from '../../components/Album/Album'
import Video from '../../components/Video/Video'

class Singer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleData: [],//单曲
            albumData: [],//专辑
            videoData: [],//视频
            menuData: [
                { title: '单曲' },
                { title: '专辑' },
                { title: '视频' }
            ],
            menyStatus: 0,
            active: NaN,//0 默认第一个li高亮   NaN 默认不高亮
            opcityState: 0,
            listInfoHeight: 0,
            //滑动起点
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
        }
    }
    //获取单曲
    getArtists = (id) => {
        RAGet(artists.api_url, {
            params: {
                id: id,
            }
        }).then(res => {
            const list = {
                list: []
            }
            list.id = res.artist.id
            list.name = res.artist.name
            list.followed = res.artist.followed
            list.img1v1Url = res.artist.img1v1Url
            list.musicSize = res.artist.musicSize
            list.mvSize = res.artist.mvSize
            list.picUrl = res.artist.picUrl
            list.publishTime = res.artist.publishTime
            list.topicPerson = res.artist.topicPerson
            list.trans = res.artist.trans

            res.hotSongs && res.hotSongs.map((item, index) => {
                const obj = {}
                obj.id = item.id//id
                obj.dt = item.dt / 1000//时长(s)
                obj.name = item.name//名字
                obj.mvid = item.mv//video url
                obj.singer = item.ar
                obj.url = 'https://music.163.com/song/media/outer/url?id=' + obj.id
                obj.alName = item.al.name//专辑名字
                obj.picUrl = item.al.picUrl + '?param=300y300' || require('../../assets/img/al3.png')//专辑图
                list.list.push(obj)
                return index.id
            })
            this.setState({ singleData: list })
        }).catch(err => {
            console.log(err)
        })
    }
    //获取专辑
    getArtistAlbum = (id) => {
        RAGet(artistAlbum.api_url, {
            params: {
                id: id,
            }
        }).then(res => {
            // console.log(res)
            const list = []
            list.albumSize = res.artist.albumSize
            list.briefDesc = res.artist.briefDesc
            list.id = res.artist.id
            list.img1v1Url = res.artist.img1v1Url
            list.musicSize = res.artist.musicSize
            list.name = res.artist.name
            list.picUrl = res.artist.picUrl
            list.topicPerson = res.artist.topicPerson
            list.trans = res.artist.trans

            res.hotAlbums && res.hotAlbums.map((item, index) => {
                const obj = []
                obj.name = item.name;
                obj.size = item.size;
                obj.id = item.id;
                obj.publishTime = item.publishTime;
                obj.picUrl = item.picUrl + '?param=300y300' || require('../../assets/img/al3.png')//专辑图
                list.push(obj)
                return index.id
            })
            this.setState({ albumData: list })
        }).catch(err => {
            console.log(err)
        })
    }
    //获取Mv
    getArtistMv = (id) => {
        RAGet(artistMv.api_url, {
            params: {
                id: id,
                limit: 50
            }
        }).then(res => {
            // console.log(res)
            this.setState({ videoData: res.mvs })
        }).catch(err => {
            console.log(err)
        })
    }
    changeItem = (index) => {
        // const singerId = this.props.match.params.id;
        // switch (index) {
        //     case 0: this.getArtists(singerId); break;
        //     case 1: this.getArtistAlbum(singerId); break;

        //     default: break;
        // }
        this.setState({ menyStatus: index })
    }
    handleScroll = () => {
        let opcityState = (window.scrollY / this.state.listInfoHeight).toFixed(1)
        this.setState({
            title: window.scrollY > this.state.listInfoHeight * 0.75 ? true : false,
            opcityState: opcityState
        })
    }
    touchStart = (e) => {
        const touch = e.targetTouches[0];
        //滑动起点的坐标
        this.setState({
            startX: touch.pageX,
            startY: touch.pageY
        })
    }
    touchMove = (e) => {
        const touch = e.targetTouches[0]
        this.setState({
            endX: touch.pageX,
            endY: touch.pageY
        })
    }
    touchEnd = (e) => {
        const { startX, startY, endX, endY, menyStatus } = this.state;
        const updateWidth = endX - startX;
        const updateHeight = endY - startY;
        const num = menyStatus;

        if (updateWidth > 80 && updateHeight < 20) {
            if (num === 0) {
                return
            }
            this.setState({ menyStatus: num - 1 })
        } else if (updateWidth < -80 && updateHeight > -20) {
            if (num === 2) {
                return
            }
            this.setState({ menyStatus: num + 1 })
        }
    }
    componentDidMount = () => {
        const singerId = this.props.match.params.id;
        this.getArtists(singerId);//单曲
        this.getArtistAlbum(singerId);//专辑
        this.getArtistMv(singerId);//视频
        const listInfoHeight = this.listInfo.clientHeight
        this.setState({
            listInfoHeight: listInfoHeight * 0.8
        })
        window.addEventListener('scroll', this.handleScroll);
    }
    render() {
        const { singleData, menuData, menyStatus, opcityState, albumData, videoData } = this.state
        return (
            <div className="Singer">
                <header ref="header">
                    <Link to='/index/home/'>
                        <div className="icon back"></div>
                    </Link>
                    <div className="title">{opcityState >= 1 ? singleData.name : null}</div>
                    <div className="icon share"></div>
                </header>
                <div
                    className="list-info"
                    ref={listInfo => this.listInfo = listInfo}
                    style={{ backgroundImage: 'url(' + singleData.picUrl + ')' }}
                >
                    <div className="left">
                        <p>{singleData.name}</p>
                        <p>歌手榜华语地区NO.16</p>
                        <p>关注 | 粉丝</p>
                        <p>网易音乐人</p>
                    </div>
                    <div className="right">
                        <p> + 关注</p>
                        <p> + 发私信</p>
                    </div>
                    <div className="layer" style={{ backgroundColor: 'rgba(22, 31, 38,' + opcityState + ')' }}></div>
                </div>
                <div className="menu">
                    {/* <div className="play-all">播放全部</div> */}
                    <ul>
                        {
                            menuData.map((item, index) => {
                                const sty = menyStatus === index ? 'actives' : ' '
                                return (
                                    <li
                                        key={index}
                                        onClick={this.changeItem.bind(this, index)}
                                    >
                                        <span className={sty}>{item.title}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div
                    ref={mores => this.mores = mores}
                    className="mores"
                    onTouchStart={this.touchStart}
                    onTouchMove={this.touchMove}
                    onTouchEnd={this.touchEnd}
                >
                    {
                        menyStatus === 0 ?
                            <Single list={singleData} {...this.props} /> :
                            (menyStatus === 1 ?
                                <Album list={albumData} {...this.props} /> :
                                <Video list={videoData} {...this.props} />
                            )
                    }
                </div>
            </div>
        );
    }
}

export default Singer;