const util = require('util')
const axios = require('axios')

const {User} = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WXManager {

    static async codeToToken(code) {
       /*
        * 小程序登陆是不需要账号密码的
        * 小程序用户只需要code   然后调用微信的服务
        * 如果此用户合法 微信的服务会返回openid （小程序用户唯一标识）
        * 小程序登陆没有显示注册过程
        * code    appsecret appID
       */

        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)

        const result = await axios.get(url)
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if (errcode){
            throw new global.errs.AuthFailed('openid获取失败:'+errmsg)
        }
        // openid
        // 档案 user uid openid 长
        // openid 

        let user = await User.getUserByOpenid(result.data.openid)
        if(!user){
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }

}

module.exports = {
    WXManager
}