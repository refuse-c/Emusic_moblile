/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 10:01:56
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 11:15:57
 * @Description: 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeIndex, changeStyle, readyCurrentTime, readyDuration } from '../../store/actions'
import { bindActionCreators } from 'redux';
class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    //播放
    songPlay = () => {
        this.refs.myAudio.play();
    }
    //暂停
    songPause = () => {
        this.refs.myAudio.pause();
    }
    ended = () => {
        const { playMode } = this.props;
        const songLength = this.props.playList.length - 1;
        if (playMode === 1) {
            let index = this.props.index;
            let num = ++index % songLength;
            this.props.changeIndex(num);
        } else if (playMode === 2) {
            for (var i = 0; i < songLength; i++) {
                var cd = parseInt(Math.random() * songLength);
            }
            let num = ++cd % songLength;
            this.props.changeIndex(num);
        } else if (playMode === 3) {
            this.refs.myAudio.play()
        }
    }
    timeupdate = () => {
        let currentTime = this.refs.myAudio.currentTime;
        this.props.readyCurrentTime(currentTime)
        let duration = this.refs.myAudio.duration;
        this.props.readyDuration(duration)
    }
    playing = () => {
        this.props.changeStyle(true)
    }
    waiting = () => {
        this.props.changeStyle(false)
        // console.log(this.refs.myAudio)
    }
    canPlay = () => {
        if (this.props.playStatus === true) {
            this.props.changeStyle(this.props.index)
            this.songPlay()
        } else {
            this.songPause()
        }
    }
    componentDidMount = () => {
        // const { playList } = this.props
        // console.log(playList)
    }
    componentDidUpdate() {
        this.canPlay()
    }
    render() {
        const { playList, index } = this.props
        // console.log(playList, index)
        return (
            <div>
                <audio
                    ref='myAudio'
                    className='myAudio'
                    src={playList[0] && playList[index].url}
                    onPlaying={this.playing}
                    onWaiting={this.waiting}
                    onEnded={this.ended}
                    onTimeUpdate={this.timeupdate}
                    onCanPlay={this.canPlay}
                >

                </audio>
            </div>
        );
    }
}

//注册store
const mapStateToProps = (state) => {
    return {
        playList: state.playList,//音乐列表
        index: state.index,//index
        playStatus: state.playStatus,
        userInfo: state.userInfo,
        playMode: state.playMode,
        activeNum: state.active,
        currentTime: state.currentTime,
        duration: state.duration
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeIndex: bindActionCreators(changeIndex, dispatch),
        changeStyle: bindActionCreators(changeStyle, dispatch),
        readyCurrentTime: bindActionCreators(readyCurrentTime, dispatch),
        readyDuration: bindActionCreators(readyDuration, dispatch),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);