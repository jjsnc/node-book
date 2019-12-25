const bcrypt = require('bcryptjs')

const {
    sequelize
} = require('../../core/db')


const {
    Sequelize,
    Model
} = require('sequelize')

// define
class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            } 
        })
        if (!user) {
            throw new global.errs.AuthFailed('账号不存在')
        }
        // user.password === plainPassword
        const correct = bcrypt.compareSync(
            plainPassword, user.password)  
        if(!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }

    // static async getUserByOpenid(openid){
    //     const user = await User.findOne({
    //         where:{
    //             openid
    //         }
    //     })
    //     return user
    // }

    // static async registerByOpenid(openid) {
    //     return await User.create({
    //         openid
    //     })
    // }
}

User.init({
    /*
     * 主键 关系型数据库
     * 主键：不能重复 不能为空
     * 自动增长 autoIncrement
    */
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        //扩展 设计模式 观察者模式
        //ES6 Reflect Vue3.0 
        /*
         *  存入数据库密码不能是明文 
         *  而且相同的密码不能相同的密文 
         *  彩虹攻击
        */
        
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
}, {
    sequelize,
    tableName: 'user'
})

module.exports = {
    User
}

// 数据迁移 SQL 更新 风险