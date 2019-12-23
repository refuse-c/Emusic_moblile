/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 15:06:41
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 10:56:20
 * @Description: 
 */


// export default (state = defaultState, action) => {

//     // 获取用户数据
//     if (action.type === actionsTypes.GET_USER_INFO) {
//         const newState = JSON.parse(JSON.stringify(state)); // 深度拷贝
//         newState.userInfo = action.data;
//         return newState;
//     }

//     // 改变音乐播放状态
//     if (action.type === actionsTypes.CHANGE_STATUS) {
//         const newState = JSON.parse(JSON.stringify(state)); // 深度拷贝
//         newState.songPlayStatus = action.data;
//         return newState;
//     }

//     // 获取音乐列表
//     if (action.type === actionsTypes.GET_MUSIC_LIST) {
//         const newState = JSON.parse(JSON.stringify(state)); // 深度拷贝
//         newState.musicList = action.data;
//         return newState;
//     }

//     // 获取播放列表
//     if (action.type === actionsTypes.GET_PLAYER_LIST) {
//         const newState = JSON.parse(JSON.stringify(state)); // 深度拷贝
//         newState.playerList = action.data;
//         return newState;
//     }
//     return state;
// }
import { combineReducers } from 'redux'
import * as actionsTypes from './actionTypes'

const defaultState = {
    index: 0,//当前的index
    currentTime: 1,
    duration: 1,
    //避免出现NaN 初始值设置成1
    userInfo: {}, //用户信息
    playList: [
        {
            alName: "We Are (Part 2)",
            dt: 194.062,
            id: 475072054,
            name: "Coming Home",
            picUrl: "http://p2.music.126.net/non-1U_hDCVA42-JU2xZlw==/109951163134773337.jpg?param=300y300",
            singer: [
                { id: 32124, name: "Dash Berlin" },
                { id: 50877, name: "Bo Bruce" }],
            url: "https://music.163.com/song/media/outer/url?id=475072054"
        }
    ],//音乐列表
    playerList: [],// 播放列表
    playStatus: false, //播放状态
    playMode: 1,//1顺序播放 /2随机播放   /3 单曲循环
    activeNum: NaN//样式标识
}

//改变index
const index = (state = defaultState.index, action) => {
    switch (action.type) {
        case actionsTypes.CHANGE_INDEX:
            return action.data;
        default:
            return state;
    }
}

//歌单
const playList = (state = defaultState.playList, action) => {
    switch (action.type) {
        case actionsTypes.GET_MUSIC_LIST:
            return action.data;
        default:
            return state;
    }
}

//歌单
const playerList = (state = defaultState.playerList, action) => {
    switch (action.type) {
        case actionsTypes.GET_PLAYER_LIST:
            return action.data;
        default:
            return state;
    }
}

//用户信息
const userInfo = (state = defaultState.userInfo, action) => {
    switch (action.type) {
        case actionsTypes.GET_USER_INFO:
            return action.data;
        default:
            return state;
    }
}

//播放状态
const playStatus = (state = defaultState.playStatus, action) => {
    switch (action.type) {
        case actionsTypes.CHANGE_STATUS:
            return action.data;
        default:
            return state;
    }
}

//播放模式
const playMode = (state = defaultState.playMode, action) => {
    switch (action.type) {
        case actionsTypes.CHANGE_MODE:
            return action.data;
        default:
            return state;
    }
}

//list style
const activeNum = (state = defaultState.activeNum, action) => {
    switch (action.type) {
        case actionsTypes.CHANGE_STYLE:
            return action.data;
        default:
            return state;
    }
}
//currentime
const currentTime = (state = defaultState.currentTime, action) => {
    switch (action.type) {
        case actionsTypes.READY_CURRENTTIME:
            return action.data;
        default:
            return state;
    }
}


//duration
const duration = (state = defaultState.duration, action) => {
    switch (action.type) {
        case actionsTypes.READY_DURATION:
            return action.data;
        default:
            return state;
    }
}

export default combineReducers({
    index,
    playList,
    playerList,
    userInfo,
    playStatus,
    playMode,
    activeNum,
    currentTime,
    duration
})