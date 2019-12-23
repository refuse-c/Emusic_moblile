/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 10:00:34
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 13:53:04
 * @Description: 
 */
import React, { Component } from 'react'
// import { playlistDetail } from '../../api/api'
// import { RAGet } from '../../api/network'
import { FormatNum, isEmpty } from '../../utils/format'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import More from '../../components/More/More'
import { changeStatus, getMusicList, changeIndex } from '../../store/actions'

import './List.scss'
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: NaN,//0 默认第一个li高亮   NaN 默认不高亮
            titleStatus: false,
            listInfoHeight: 0,
            opcityState: 0,
            offsetTopState: 0,
            ra: true,
            title: '歌单',
            moreData: {},
            moreStatue: false,
            moreIndex: 0,
        }
    }
    handleScroll = () => {
        let opcityState = (window.scrollY / this.state.listInfoHeight).toFixed(1)
        this.setState({
            titleStatus: window.scrollY > this.state.listInfoHeight * 0.75 ? true : false,
            opcityState: opcityState
        })
    }
    componentDidMount() {
        // let id = this.props.match.params.id//通过路由传递过来的id
        const listInfoHeight = this.refs.listInfo.clientHeight
        this.setState({
            listInfoHeight: listInfoHeight * 0.75
        })
        window.addEventListener('scroll', this.handleScroll);
        // 加载光标
        this.equal()
    }
    equal = () => {
        const { playList, index, playerList } = this.props
        var showStyStatus = true;
        if (!isEmpty(playList) && !isEmpty(playerList.list)) {
            playerList.list.forEach((e, i) => {
                if (e.id === playList[index].id) {
                    showStyStatus = false;
                    this.setState({ active: i })
                    return false;
                }
                if (showStyStatus) {
                    this.setState({ active: NaN })
                }
            });
        }
    }
    componentWillReceiveProps = () => {
        this.equal();
    }
    //播放全部
    allPlay = () => {
        const { playerList } = this.props
        this.props.getMusicList(playerList.list)
        this.props.changeIndex(0)
        this.setState({ active: 0 })
        this.props.changeStatus(true)
    }
    addPlay = (index) => {
        var ra = true
        const { playList, playerList } = this.props
        const musicId = playerList.list[index].id
        playList.forEach((e, i) => {
            if (e.id === musicId) {
                ra = false
                this.props.changeIndex(i)
                return false
            }
        })
        if (ra) {
            const newPlayList = JSON.parse(JSON.stringify(playList))
            newPlayList.unshift(playerList.list[index])
            this.props.getMusicList(newPlayList)
            this.props.changeIndex(0)
        }
        this.setState({ active: index })
        this.props.changeStatus(true)
    }
    gotoMv = (id, e) => {
        this.props.history.push({ pathname: '/videoDetails' + id });
        e.stopPropagation();
    }
    openMore = (item, index, e) => {
        this.setState({ moreData: item, moreStatue: true, moreIndex: index })
        e.stopPropagation();
    }
    childStatue = (data) => {
        this.setState({ moreStatue: data })
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        }
        const { playerList } = this.props
        if (!isEmpty(playerList.type)) {
            this.setState({ title: '专辑' })
        } else {
            this.setState({ title: '歌单' })
        }
    }
    render() {
        const { title, titleStatus, opcityState, active , moreData, moreStatue, moreIndex} = this.state
        const { playerList } = this.props
        return (
            <div className="list-content">
                {moreStatue ? <More list={moreData} getStatue={this.childStatue} moreIndex={moreIndex} {...this.props} /> : null}

                <header ref="header" style={{ backgroundColor: 'rgba(22, 31, 38,' + opcityState + ')' }}>
                    <Link to='/index/home/'>
                        <div className="icon back"></div>
                    </Link>
                    <div className="title">{titleStatus ? playerList.name : title}</div>
                    <div className="icon share"></div>
                </header>
                <div className="list-info" ref="listInfo">
                    <img src={playerList.coverImgUrl} alt="" />
                    <div className="user">
                        <div>
                            <h2>{playerList.name}</h2>
                            <div className="user-info" style={{ display: isEmpty(playerList.type) ? 'block' : 'none' }}>
                                <img src={playerList.avatarUrl} alt="" />
                                <p>{playerList.nickname}</p>
                            </div>
                            <p style={{ display: isEmpty(playerList.type) ? 'none' : 'block' }}>歌手:{playerList.alName}</p>
                        </div>
                        <p className="desc">{playerList.description}</p>
                    </div>
                </div>
                <div
                    onClick={this.allPlay}
                    className="icon ply-all"
                >
                    播放全部
                </div>
                <ul className="list">
                    {
                        playerList.list && playerList.list.map((item, index) => {
                            const liClass = active === index ? ' liSty' : ''
                            const numClass = active === index ? ' numSty' : ''
                            const mvClass = active === index ? 'icon-mv' : 'icon-mv-sty'
                            const moreClass = active === index ? 'icon-more-sty' : 'icon-more'
                            return (
                                <li
                                    className={'item' + liClass}
                                    key={index}
                                    onClick={this.addPlay.bind(this, index)}
                                >
                                    <div className='lfet'>
                                        <p className={'num' + numClass}>{FormatNum(index)}</p>
                                        <div>
                                            <p>{item.name}</p>
                                            <p>{item.singer.map(item => item.name + '').join(' - ')}</p>
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div
                                            onClick={this.gotoMv.bind(this, item.mvid)}
                                            className={Number(item.mvid) === 0 ? '' : 'icon ' + mvClass}></div>
                                        <div
                                            onClick={this.openMore.bind(this, item, index)}
                                            className={'icon ' + moreClass}></div>
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

//注册store
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
export default connect(mapStateToProps, mapDispatchToProps)(List);