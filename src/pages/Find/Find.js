/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 10:00:13
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 13:58:44
 * @Description: 
 */
import React, { Component } from 'react';
import { RAGet } from '../../api/network'
import { getBanner, recommendList, recommendSongs, playlistDetail, personalized } from '../../api/api'
import { changeStatus, getMusicList, changeIndex, getPlayerList } from '../../store/actions'
import { getDevice, fomatDate, fomatPlaycount, getSinger } from '../../utils/format'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Lodash from 'lodash'
import Swiper from 'swiper';
import './swiper.min.css';
import './Find.scss'
class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: '',
            device: '',
            bannerData: [],
            recommendData: [],
            personalizedData: []
        }
    }
    //获取轮播图
    getBannerData = (id) => {
        RAGet(getBanner.api_url, {
            params: {
                type: id
            }
        }).then(res => {
            const data = res.banners;
            this.setState({ bannerData: data })
            this.runSwiper()
        }).catch(err => {
            console.log(err)
        })
    }
    //获取推荐列表
    getRecommendList = () => {
        RAGet(recommendList.api_url, {
            params: {}
        }).then(res => {
            const data = res.recommend
            const list = []
            data.map((item, index) => {
                const obj = {}
                obj.id = item.id
                obj.userName = item.creator.nickname
                obj.trackCount = item.trackCount//播放量
                obj.createTime = fomatDate(item.createTime)
                obj.birthday = fomatDate(item.creator.birthday)
                obj.signature = item.creator.signature
                obj.playcount = fomatPlaycount(item.playcount)
                obj.city = item.creator.city
                obj.coverImgUrl = item.picUrl + '?param=300y300' //歌单封面
                obj.avatarUrl = item.creator.avatarUrl + '?param=300y300' //用户头像
                obj.backgroundUrl = item.creator.backgroundUrl + '?param=500y200' //用户背景图
                obj.description = item.description || ''
                obj.userId = item.userId
                obj.name = item.name
                list.push(obj)
                return index.id
            })
            this.setState({
                recommendData: Lodash.shuffle(list)
            })
        }).catch(err => {
            console.log(err)
        })
    }
    //获取每日推荐歌曲
    getRecommendSongData = () => {
        RAGet(recommendSongs.api_url, {
            params: {}
        }).then(res => {
            const list = [];
            const data = res.data.dailySongs;
            list.name = '每日推荐'
            data.map((item, index) => {
                const obj = {}
                obj.id = item.id//id
                obj.dt = item.duration / 1000//时长(s)
                obj.name = item.name//名字
                obj.alName = item.album.name//专辑名字
                obj.mvid = item.mvid//video url
                obj.url = 'https://music.163.com/song/media/outer/url?id=' + obj.id
                obj.picUrl = item.album.picUrl + '?param=300y300'//专辑图
                obj.singer = getSinger(item.artists)
                list.push(obj)
                return index.id
            })
            this.props.getPlayerList(list)
            this.props.history.push('/index/recommendsongs');
        }).catch(err => {
            console.log(err)
        })
    }
    //获取官方推荐歌单
    getPersonalized = () => {
        RAGet(personalized.api_url, {
            params: {}
        }).then(res => {

            const data = res.result
            // console.info(res)
            const list = []
            data.map((item, index) => {
                const obj = {}
                obj.alg = item.alg
                obj.canDislike = item.canDislike
                obj.copywriter = item.copywriter
                obj.highQuality = item.highQuality
                obj.id = item.id
                obj.name = item.name
                obj.coverImgUrl = item.picUrl + '?param=300y300' //歌单封面
                obj.playcount = fomatPlaycount(item.playCount)
                obj.trackCount = fomatPlaycount(item.trackCount)
                obj.trackNumberUpdateTime = fomatDate(item.trackNumberUpdateTime)
                obj.type = item.type
                list.push(obj)
                return index.id
            })
            this.setState({
                personalizedData: Lodash.shuffle(list)
            })
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
                obj.mvid = item.mv
                obj.singer = getSinger(item.ar)
                list.list.push(obj)
                return index.id
            })
            this.props.getPlayerList(list)
            // this.props.changeIndex(0)
            this.props.history.push('/index/list');
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        let date = new Date();
        let day = date.getDate();
        day = day < 10 ? '0' + day : day
        // console.log(day)
        this.setState({ day: day })
        const device = getDevice().device.id;
        this.setState({ device });
        this.getBannerData(device);
        this.getRecommendList();
        this.getPersonalized()
    }
    runSwiper = () => {
        new Swiper('.swiper-container', {
            direction: 'horizontal',//横向轮播
            loop: true,//无缝轮播
            effect: 'coverflow',
            autoplay: {
                delay: 2500,
            },
            pagination: {//小圆点分页
                el: '.swiper-pagination',
            }
        })
    }
    render() {
        const { device, bannerData, recommendData, day, personalizedData } = this.state
        return (
            <div className="find">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {/* + '?param=500y200' */}
                        {
                            bannerData && bannerData.map((item, index) => {
                                const imgUrl = Number(device) === 0 ? item.imageUrl : item.pic
                                return (
                                    <div
                                        key={index}
                                        style={{ backgroundImage: 'url(' + imgUrl + ')' }}
                                        className="swiper-slide">
                                        <span style={{ backgroundColor: item.titleColor }}>{item.typeTitle}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <ul className="menu">
                    <li>
                        <p onClick={this.getRecommendSongData} className="icon-p1">{day}</p>
                        <span >每日推荐</span>
                    </li>
                    <li>
                        <Link to="/index/songlist">
                            <p className="icon-p2"></p>
                        </Link>
                        <span>歌单</span>
                    </li>
                    <li>
                        <Link to="/index/toplist">
                            <p className="icon-p3"></p>
                        </Link>
                        <span>排行榜</span>
                    </li>
                    <li>
                        <p className="icon-p4"></p>
                        <span>电台</span>
                    </li>
                    <li>
                        <p className="icon-p5"></p>
                        <span>ACG</span>
                    </li>
                </ul>
                <h3>
                    <div className="left">
                        <p>推荐歌单</p>
                    </div>
                </h3>
                <ul className="recommend-list">
                    {
                        personalizedData && (personalizedData).map((item, index) => {
                            if (index >= 6) return false
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
                                        <p>{item.playcount}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <h3>
                    <div className="left">
                        <p>每日推荐</p>
                    </div>
                </h3>
                <ul className="recommend-list">
                    {
                        recommendData && (recommendData).map((item, index) => {
                            if (index >= 6) return false
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
                                        <p>{item.playcount}</p>
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
        musicList: state.musicList,//音乐列表
        playerList: state.playerList,//音乐列表
        index: state.index,//index
        // playStatus: state.playStatus,
        userInfo: state.userInfo,
        // activeNum: state.activeNum
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
export default connect(mapStateToProps, mapDispatchToProps)(Find);