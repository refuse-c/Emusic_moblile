/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 09:54:45
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-27 20:21:03
 * @Description: 
 */
import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://164.155.70.80:3000',
    withCredentials: true,
    headers: {
        // "Content-Type": "application/json"
    },
});


// 请求拦截器
Axios.interceptors.request.use((res) => {
    global.showLoading()
    return res
}, (err) => {
    global.hideLoading()
    console.log(err)
})

//添加响应拦截器
Axios.interceptors.response.use(
    (res) => {
        global.hideLoading()
        return res
    }, err => {
        global.hideLoading()
        console.log(err)
    }
);
export const RAPost = (path, params) => {
    return new Promise((resolve, reject) => {
        Axios.post(path, params).then(res => {
            if (res.status === 200) {
                resolve(res.data);
            }
        }).catch(err => {
            console.error(err);
            reject(err);
        });
    });
};

export const RAGet = (path, params) => {
    return new Promise((resolve, reject) => {
        Axios.get(path, params).then(res => {
            // console.log(res)
            resolve(res.data)
        }).catch(err => {
            console.error(err);
            reject(err);
        });
    });
};