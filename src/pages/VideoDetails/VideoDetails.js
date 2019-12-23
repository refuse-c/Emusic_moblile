/*
 * @Author: REFUSE_C
 * @Date: 2019-12-11 15:38:04
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-12 17:40:35
 * @Descriptiimrc
 * 
 */
import React, { Component } from 'react';
import './VideoDetails.scss'
import { RAGet } from '../../api/network';
import { mvDetail, search, relatedVideo, videoDetail, mvUrl, videoUrl } from '../../api/api';
import { fomatPlaycount, getSinger, isEmpty, fomatIsNum, fomatDate } from '../../utils/format';
class VideoDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mvData: [],//视频
            powerStatus: true,
            correlationMusic: {},
            correlationVideo: [],

        }
    }
    //获取mv详情
    getMvDetail = (id) => {
        RAGet(mvDetail.api_url, {
            params: {
                mvid: id
            }
        }).then(res => {
            const obj = {}
            const data = res.data
            this.getMvUrl(data.id);

            obj.artistId = data.artistId;//歌手id
            obj.artistName = data.artistName//歌手名字
            obj.cover = data.cover;//视频初始化图
            obj.desc = data.desc;//视频介绍
            obj.duration = data.duration;//视频总时长
            obj.id = data.id;//视频id
            obj.name = data.name;//视频标题
            obj.playCount = data.playCount;//播放量
            obj.publishTime = data.publishTime;//发行时间
            // obj.shareCount = data.shareCount;
            // obj.subCount = data.subCount;
            // obj.likeCount = data.likeCount;
            // obj.artistName = data.artistName;
            // obj.brs = data.brs;
            // obj.commentCount = data.commentCount;
            const keywords = res.data.artistName + '-' + res.data.name
            this.getSearch(keywords);
            this.setState({ mvData: obj })
        })
            .catch(err => {
                console.log(err)
            })
    }
    //获取mvUrl
    getMvUrl = (id) => {
        RAGet(mvUrl.api_url, {
            params: {
                id: id
            }
        }).then(res => {
            const data = this.state.mvData;
            data.url = res.data.url;
            this.setState({ mvData: data })
        }).catch(err => {
            console.log(err)
        })
    }
    //获取相似歌曲
    getSearch = (val) => {
        RAGet(search.api_url, {
            params: {
                keywords: val,
                type: 1
            }
        }).then(res => {
            const data = res.result.songs;
            const { id } = this.props.match.params;
            data.forEach(e => {
                if (e.mvid === Number(id)) {
                    const obj = {}
                    obj.id = e.id//id
                    obj.dt = e.duration / 1000//时长(s)
                    obj.name = e.name//名字
                    obj.alName = e.album.name//专辑名字
                    obj.mvid = e.mvid//video url
                    obj.url = 'https://music.163.com/song/media/outer/url?id=' + obj.id
                    obj.picUrl = e.album.picUrl + '?param=300y300'//专辑图
                    obj.singer = getSinger(e.artists)
                    this.setState({ correlationMusic: obj })
                }
            })

        })
            .catch(err => {
                console.log(err)
            })
    }
    //获取视频详情
    getVideoDetail = (id) => {
        RAGet(videoDetail.api_url, {
            params: {
                id: id
            }
        }).then(res => {
            const obj = {}
            const data = res.data;
            this.getVideoUrl(data.vid);
            // 用户信息
            obj.avatarUrl = data.avatarUrl//用户头像
            obj.nickname = data.nickname//用户名字
            obj.userId = data.userId//用户id

            //歌手信息
            obj.artistId = data.artistId;//歌手id
            obj.artistName = data.artistName//歌手名字

            //视频相关信息
            obj.desc = data.description;//视频介绍
            obj.cover = data.coverUrl;//视频初始化图
            obj.duration = data.durationms;//视频总时长
            obj.id = data.vid;//视频id
            obj.name = data.title;//视频标题
            obj.playCount = data.playTime;//播放量
            obj.publishTime = fomatDate(data.publishTime);//发行时间
            const keywords = res.data.artistName + '-' + res.data.name
            this.getSearch(keywords);
            this.setState({ mvData: obj })
        }).catch(err => {
            console.log(err)
        })
    }
    //获取视频Url
    getVideoUrl = (id) => {
        RAGet(videoUrl.api_url, {
            params: {
                id: id
            }
        }).then(res => {
            const data = this.state.mvData;
            data.url = res.urls[0].url;
            this.setState({ mvData: data })
        }).catch(err => {
            console.log(err)
        })
    }
    //获取相似视频
    getRelatedVideo = (id) => {
        RAGet(relatedVideo.api_url, {
            params: {
                id: id
            }
        }).then(res => {
            this.setState({ correlationVideo: res.data })
        }).catch(err => {
            console.log(err)
        })
    }
    changePower = () => {
        const status = !this.state.powerStatus
        this.setState({ powerStatus: status })
    }
    gotoMv = (id, e) => {
        if (fomatIsNum(id)) {
            this.getMvDetail(id)
        } else {
            this.getVideoDetail(id)
        }
        this.getRelatedVideo(id)
        e.stopPropagation();
    }
    componentDidMount = () => {
        const { id } = this.props.match.params;
        if (fomatIsNum(id)) {
            this.getMvDetail(id)
        } else {
            this.getVideoDetail(id)
        }
        this.getRelatedVideo(id)
    }
    render() {
        const { mvData, powerStatus, correlationMusic, correlationVideo } = this.state
        const mvUrl = !isEmpty(mvData.url) ? mvData.url : ''
        return (
            <div className="VideoDetails">
                <video
                    controls
                    poster={mvData.cover}
                    autoPlay
                    src={mvUrl}
                >
                    <source src={mvUrl} />
                </video>
                <div className="infos">
                    <p>{mvData.name}</p>
                    <p
                        onClick={this.changePower}
                        className="icon"
                    >
                        OFF
                    </p>
                </div>
                <ul>
                    <li>{fomatPlaycount(mvData.playCount) + '次观看'}</li>
                </ul>
                <div className="desc" style={{ display: powerStatus ? 'block' : 'none' }}>
                    <p>{mvData.publishTime + '发布'}</p>
                    <p>{mvData.desc}</p>
                </div>
                <div className="singer">
                    <div>
                        <img src={mvData.cover} alt="" />
                        <p>{mvData.artistName}</p>
                    </div>
                    <p className="collect"> + 收藏</p>
                </div>
                <div className="correlation">
                    <h4>相关音乐</h4>
                    <div
                        className={'item'}
                    // onClick={this.addPlay}
                    >
                        <div className='lfet'>
                            <img src="http://p1.music.126.net/Jrxo7VwF_ac-j87k7fcuwA==/102254581399164.jpg?param=300y300" alt="" />
                            <div>
                                <p>{correlationMusic.name}</p>
                                <p>{correlationMusic.singer && correlationMusic.singer.map(item => item.name + '').join(' - ')}</p>
                            </div>
                        </div>
                        <div className='right'>
                            <div className={Number(correlationMusic.mvid) === 0 ? '' : 'icon icon-mv-sty'}></div>
                            <div className={'icon icon-more'}></div>
                        </div>
                    </div>
                </div>
                <div className="correlation">
                    <h4>相关视频</h4>
                    <ul className="video">
                        {
                            correlationVideo && correlationVideo.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={this.gotoMv.bind(this, item.vid)}
                                    >
                                        <div className="img">
                                            <img src={item.coverUrl} alt="" />
                                            <div className="playcount-bg">
                                                <p>{fomatPlaycount(item.playTime)}</p>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <p>{item.title}</p>
                                            <p>
                                                <span>{item.publishTime}</span>
                                            </p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default VideoDetails;