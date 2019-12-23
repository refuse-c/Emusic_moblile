/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 10:35:10
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-13 14:26:54
 * @Description: 
 */
import React, { Component } from 'react';
import { loginTel } from '../../api/api'
import { RAGet } from '../../api/network'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfo } from '../../store/actions'
import './Login.scss'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '13272946536',
            password: 'wangyi0.0',
            labelT: true,
            labelP: true,
            // userInfo: {}
        }
    }
    componentDidMount() { }
    //登录获取用户数据
    loginTel = () => {
        const { phone, password } = this.state
        RAGet(loginTel.api_url, {
            params: {
                phone: phone,//手机号码
                password: password//密码
            }

        }).then(res => {
            const list = {}
            //account
            list.createTime = res.account.createTime
            list.donateVersion = res.account.donateVersion
            list.id = res.account.id
            list.salt = res.account.salt
            list.status = res.account.status
            list.tokenVersion = res.account.tokenVersion
            list.type = res.account.type
            list.userName = res.account.userName
            list.vipType = res.account.vipType
            list.viptypeVersion = res.account.viptypeVersion
            list.whitelistAuthority = res.account.whitelistAuthority
            //profile
            list.avatarUrl = res.profile.avatarUrl
            list.backgroundUrl = res.profile.backgroundUrl + '?param=500y200' //用户背景图
            list.birthday = res.profile.birthday
            list.city = res.profile.city
            list.nickname = res.profile.nickname
            list.playlistBeSubscribedCount = res.profile.playlistBeSubscribedCount
            list.playlistCount = res.profile.playlistCount
            list.province = res.profile.province
            list.remarkName = res.profile.remarkName
            list.signature = res.profile.signature
            list.userId = res.profile.userId
            this.props.getUserInfo(list)
            this.props.history.push('/index/home');
        }).catch(err => {
            console.log(err)
        })
    }
    //输入账号/密码
    inputTel = (e) => {
        this.setState({ phone: e.target.value })
    }
    inputPwd = (e) => {
        this.setState({ password: e.target.value })
    }
    inputFocusT = () => {
        this.setState({ labelT: false })
    }
    inputBlurT = () => {
        this.setState({ labelT: true })
    }
    inputFocusP = () => {
        this.setState({ labelP: false })
    }
    inputBlurP = () => {
        this.setState({ labelP: true })
    }
    render() {
        const { phone, password, labelT, labelP } = this.state
        return (
            <div className="login">
                <h1>Love Music</h1>
                <ul className="login-box">
                    <li>
                        <label
                            className={labelT ? 'label-show' : 'label-hide'}
                        >
                            手机号码
                        </label>
                        <input
                            onFocus={this.inputFocusT}
                            onBlur={this.inputBlurT}
                            onChange={this.inputTel}
                            type="text"
                            value={phone}
                            placeholder="请输入手机号"
                            className={labelT ? 'border-efefef' : 'border-0071fb'}
                        />
                    </li>
                    <li>
                        <label
                            className={labelP ? 'label-show' : 'label-hide'}
                        >
                            登录密码
                        </label>
                        <input
                            onFocus={this.inputFocusP}
                            onBlur={this.inputBlurP}
                            onChange={this.inputPwd}
                            type="password"
                            value={password}
                            placeholder="请输入登录密码"
                            className={labelP ? 'border-efefef' : 'border-0071fb'}

                        />
                    </li>
                    <li>
                        <input
                            type="submit"
                            value="登录"
                            onClick={this.loginTel}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}
//注册store
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo//用户信息

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: bindActionCreators(getUserInfo, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
