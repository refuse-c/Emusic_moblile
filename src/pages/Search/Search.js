import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { RAGet } from '../../api/network'
import { search, searchDefault, searchHotDetail, searchSuggest, songDetail } from '../../api/api'

import './Search.scss'
import { fomatStr } from '../../utils/format';
import HotList from './page/hotList'
import Album from '../Search/page/album'//专辑
import Singer from '../Search/page/singer'//歌手
import Single from '../Search/page/single' //单曲
import SongList from '../Search/page/songList'//歌单
import User from '../Search/page/user'//用户
import Video from '../Search/page/video'//视频
import Broadcasting from '../Search/page/broadcasting'
// import Synthesize from '../Search/page/synthesize'//综合


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            HotListData: [],//热搜榜列表
            HotListStatus: true,
            userInfoData: [],//用户
            singleData: [],//单曲            
            singerDta: [],//歌手列表,
            songListData: [],//歌单
            videoListData: [],//视频列表
            albumListData: [],//专辑
            broadcastingData: [],//电台
            synthesizeData: [],//综合



            suggestList: [],//搜索建议列表
            suggestStatus: false,//搜索建议显示状态
            type: 1,// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合,
            meunStatus: 0,
            menu: [
                {
                    type: '1',
                    title: '单曲'
                },
                {
                    type: '100',
                    title: '歌手'
                },
                {
                    type: '1000',
                    title: '歌单'
                },
                {
                    type: '1014',
                    title: '视频'
                },
                {
                    type: '10',
                    title: '专辑'
                },
                {
                    type: '1009',
                    title: '电台'
                },
                {
                    type: '1002',
                    title: '用户'
                },
                // {
                //     type: '1018',
                //     title: '综合'
                // }
            ]
        }
    }
    // 搜索
    getSearch = (str, type) => {
        const { meunStatus } = this.state
        if (fomatStr(str)) {
            return false
        }
        RAGet(search.api_url, {
            params: {
                keywords: str,
                limit: '',
                type: type
            }
        }).then(res => {
            // console.log(res)
            switch (meunStatus) {
                case 0: this.FormatIds(res); break;
                case 1: this.setState({ singerDta: res.result }); break;
                case 2: this.FormatSongList(res); break;
                case 3: this.setState({ videoListData: res.result }); break;
                case 4: this.FormatAlbum(res); break;
                case 5: this.FormatBroadcasting(res); break;
                case 6: this.FormatUserInfo(res); break;
                default: break
            }


        }).catch(err => {
            console.log(err)
        })
    }
    // 默认搜索关键词
    getSearchDefault = () => {
        RAGet(searchDefault.api_url, {
            params: {}
        }).then(res => {
            // console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    // 热搜列表(详细)
    getSearchHotDetail = () => {
        RAGet(searchHotDetail.api_url, {
            params: {}
        }).then(res => {
            this.setState({ HotListData: res.data })

        }).catch(err => {
            console.log(err)
        })
    }
    // 搜索建议
    getSearchSuggest = (v) => {
        RAGet(searchSuggest.api_url, {
            params: {
                keywords: v,
                type: 'mobile'
            }
        }).then(res => {
            // console.log(res)
            this.setState({ suggestList: res.result.allMatch })
        }).catch(err => {
            console.log(err)
        })
    }
    //获取歌曲信息  信息并重组
    GetSongDetail = (ids, count) => {
        RAGet(songDetail.api_url, {
            params: {
                ids: ids
            }
        }).then(res => {
            this.FormatSingle(res, count)
        }).catch(err => {
            console.log(err)
        })
    }
    //组合id
    FormatIds = (res) => {
        const data = res.result
        const count = data.songCount
        const list = data.songs
        var ids = ''
        list && list.forEach(e => {
            ids += e.id + ','
        });
        ids = ids.replace(/(,*$)/g, "");
        this.GetSongDetail(ids, count)
    }
    //格式化单曲数据
    FormatSingle = (res, count) => {
        // console.log(res)
        const list = [];
        const data = res;
        list.songCount = count;
        data.songs && data.songs.map((item, index) => {
            const obj = {}
            obj.id = item.id//id
            obj.dt = item.dt / 1000//时长(s)
            obj.name = item.name//名字
            obj.mvid = item.mv//video url
            obj.singer = item.ar
            obj.url = 'https://music.163.com/song/media/outer/url?id=' + obj.id
            obj.alName = item.al.name//专辑名字
            obj.picUrl = item.al.picUrl + '?param=300y300' || require('../../assets/img/al3.png')//专辑图
            list.push(obj)
            return index.id
        })
        this.setState({ singleData: list, HotListStatus: false })
    }
    //格式化用户数据
    FormatUserInfo = (res) => {
        const list = [];
        const data = res.result;
        list.userprofileCount = data.userprofileCount
        data.userprofiles && data.userprofiles.map((item, index) => {
            const obj = {}
            obj.accountStatus = item.accountStatus;
            obj.alg = item.alg;
            obj.anchor = item.anchor;
            obj.authStatus = item.authStatus;
            obj.authenticationTypes = item.authenticationTypes;
            obj.authority = item.authority;
            obj.avatarUrl = item.avatarUrl + '?param=300y300'//头像;
            obj.backgroundUrl = item.backgroundUrl;
            obj.birthday = item.birthday;
            obj.city = item.city;
            obj.defaultAvatar = item.defaultAvatar;
            obj.description = item.description;
            obj.detailDescription = item.detailDescription;
            obj.djStatus = item.djStatus;
            obj.expertTags = item.expertTags;
            obj.experts = item.experts;
            obj.followed = item.followed;
            obj.gender = item.gender;
            obj.mutual = item.mutual;
            obj.nickname = item.nickname;
            obj.province = item.province;
            obj.remarkName = item.remarkName;
            obj.signature = item.signature;
            obj.userId = item.userId;
            obj.userType = item.userType;
            obj.vipType = item.vipType;
            list.push(obj)
            return index.id
        })
        this.setState({ userInfoData: list, HotListStatus: false })
    }
    //格式化歌单数据
    FormatSongList = (res) => {
        const list = [];
        const data = res.result;
        list.playlistCount = data.playlistCount
        data.playlists && data.playlists.map((item, index) => {
            const obj = {}
            // creator
            obj.authStatus = item.creator.authStatus;
            obj.expertTags = item.creator.expertTags;
            obj.experts = item.creator.experts;
            obj.nickname = item.creator.nickname;
            obj.userId = item.creator.userId;
            obj.userType = item.creator.userType;

            obj.highQuality = item.highQuality;
            obj.id = item.id;
            obj.name = item.name;
            obj.playCount = item.playCount;
            obj.subscribed = item.subscribed;
            obj.trackCount = item.trackCount;
            obj.userId = item.userId;
            obj.coverImgUrl = item.coverImgUrl + '?param=300y300'//专辑图;
            // track
            obj.trackId = item.track.id;
            obj.trackMvid = item.track.mvid;
            obj.trackName = item.track.name;
            list.push(obj)
            return index.id
        })
        this.setState({ songListData: list, HotListStatus: false })
    }
    //格式化专辑数据
    FormatAlbum = (res) => {
        const list = [];
        const data = res.result;
        list.albumCount = data.albumCount
        data.albums && data.albums.map((item, index) => {
            const obj = {}
            obj.artists = item.artists
            obj.blurPicUrl = item.blurPicUrl;
            obj.briefDesc = item.briefDesc;
            obj.company = item.company;
            obj.companyId = item.companyId;
            obj.containedSong = item.containedSong;
            obj.copyrightId = item.copyrightId;
            obj.description = item.description;
            obj.id = item.id;
            obj.mark = item.mark;
            obj.name = item.name;
            obj.onSale = item.onSale;
            obj.picUrl = item.picUrl;
            obj.publishTime = item.publishTime;
            obj.size = item.size;
            obj.songs = item.songs;
            obj.status = item.status;
            obj.tags = item.tags;
            obj.type = item.type;
            list.push(obj)
            return index.id
        })
        this.setState({ albumListData: list, HotListStatus: false })
    }
    //格式化电台
    FormatBroadcasting = (res) => {
        const list = [];
        const data = res.result;
        list.djRadiosCount = data.djRadiosCount
        data.djRadios && data.djRadios.map((item, index) => {
            const obj = {}
            obj.name = item.name;
            obj.picUrl = item.picUrl;
            // dj:
            obj.nickname = item.dj.nickname;
            list.push(obj)
            return index.id
        })
        this.setState({ broadcastingData: list, HotListStatus: false })
    }
    //搜索
    keyPress = (e) => {
        const { menu, meunStatus } = this.state
        let keycode = e.which || e.keyCode
        if (keycode === 13) {
            if (this.input.value === '') {
                this.setState({ keyword: this.input.placeholder }, () => {
                    this.input.value = this.input.placeholder
                    this.getSearch(this.input.value, menu[meunStatus].type)
                })
                e.preventDefault()
            }
            this.setState({ suggestList: [] })
            this.getSearch(this.input.value, menu[meunStatus].type)
            e.preventDefault()
        }
    }
    changeItem = (v) => {
        const { menu, meunStatus } = this.state
        this.getSearch(v, menu[meunStatus].type)
        this.setState({ keyword: v }, () => {
            this.input.value = v
        })
        this.setState({ suggestList: [] })
    }
    //搜索建议
    changeInput = () => {
        this.setState({ keyword: this.input.value })
        if (fomatStr(this.input.value)) {
            this.setState({ suggestStatus: false })
            this.setState({ suggestList: [] })
            return false
        }
        this.setState({ suggestStatus: true })
        this.getSearchSuggest(this.input.value)
    }
    // 聚焦
    focus = () => {
        if (!fomatStr(this.input.value)) {
            this.getSearchSuggest(this.input.value)
        }

    }
    //失焦
    blur = () => {
        // this.setState({ suggestList: [] })
    }
    //切换menu
    menu = (index) => {
        const itemWidth = this.menuItem.offsetWidth;
        const { keyword, menu } = this.state;
        this.menuList.scrollLeft = (index - 2) * itemWidth;
        this.setState({ meunStatus: index }, () => {
            this.getSearch(keyword, menu[index].type);
        })
    }
    //获取子组件传过来的值
    getChildData = (result) => {
        const { menu, meunStatus } = this.state
        this.input.value = result;
        this.setState({ keyword: result })
        this.getSearch(result, menu[meunStatus].type)
    }
    componentDidMount = () => {
        this.getSearchHotDetail()//热搜榜
    }
    render() {
        const { HotListData, HotListStatus, singleData, menu, meunStatus, userInfoData, singerDta, songListData, videoListData, albumListData, broadcastingData, suggestList } = this.state
        return (
            <div className="search">
                <header>
                    <Link to='/index/home/'>
                        <div className="icon icon-search-back"></div>
                    </Link>
                    <div className="title">
                        <input
                            type="text"
                            ref={input => this.input = input}
                            onKeyPress={this.keyPress}
                            onChange={this.changeInput}
                            onFocus={this.focus}
                            onBlur={this.blur}
                            // value={this.state.keyword}
                            placeholder='大田后生仔'
                        />
                    </div>
                    <div className="icon icon-search-singer"></div>
                </header>
                <div className="suggest">
                    <ul>
                        {
                            suggestList && suggestList.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={this.changeItem.bind(this, item.keyword)}
                                    >{item.keyword}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="menuList" style={{ opacity: HotListStatus ? '0' : '1' }}>
                    <ul ref={menuList => this.menuList = menuList}>
                        {
                            menu.map((item, index) => {
                                const menuSty = meunStatus === index ? 'menu-sty' : ' '
                                return (
                                    <li
                                        ref={menuItem => this.menuItem = menuItem}
                                        key={index}
                                        onClick={this.menu.bind(this, index)}
                                    >
                                        <span className={menuSty}>{item.title}</span>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
                <div className="search-box">
                    {HotListStatus ?
                        <HotList
                            news={this}
                            list={HotListData}
                        /> :
                        (meunStatus === 0 ?
                            <Single list={singleData} {...this.props} /> :
                            (meunStatus === 1 ?
                                <Singer list={singerDta} {...this.props} /> :
                                (meunStatus === 2 ?
                                    <SongList list={songListData} {...this.props} /> :
                                    (meunStatus === 3 ?
                                        <Video list={videoListData} {...this.props} /> :
                                        (meunStatus === 4 ?
                                            <Album list={albumListData} {...this.props} /> :
                                            (meunStatus === 5 ?
                                                <Broadcasting list={broadcastingData} /> :
                                                (meunStatus === 6 ?
                                                    <User list={userInfoData} /> : null
                                                    // <Synthesize list={albumListData} />
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}
export default Search;