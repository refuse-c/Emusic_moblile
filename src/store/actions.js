/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 15:06:04
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-11-25 17:43:57
 * @Description: 
 */
import * as actionsTypes from './actionTypes';

// 获取用户数据
export const getUserInfo = (data) => {
    return {
        type: actionsTypes.GET_USER_INFO,
        data
    }
}
// 改变音乐播放状态
export const changeStatus = (data) => {
    return {
        type: actionsTypes.CHANGE_STATUS,
        data
    }
}
// 获取音乐列表
export const getMusicList = (data) => {
    return {
        type: actionsTypes.GET_MUSIC_LIST,
        data
    }
}
// 获取播放列表
export const getPlayerList = (data) => {
    return {
        type: actionsTypes.GET_PLAYER_LIST,
        data
    }
}
// 改变index
export const changeIndex = (data) => {
    return {
        type: actionsTypes.CHANGE_INDEX,
        data
    }
}
// 改变播放模式
export const changeMode = (data) => {
    return {
        type: actionsTypes.CHANGE_MODE,
        data
    }
}

//改变list style
export const changeStyle = (data) => {
    return {
        type: actionsTypes.CHANGE_STYLE,
        data
    }
}

//currentTime
export const readyCurrentTime = (data) => {
    return {
        type: actionsTypes.READY_CURRENTTIME,
        data
    }
}

//duration
export const readyDuration = (data) => {
    return {
        type: actionsTypes.READY_DURATION,
        data
    }
}