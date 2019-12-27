const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')


class Flow extends Model{

}
/*
 * type 决定数据库中的那张表   
 * type: 100 Movie
 * type: 200 Music
 * type: 300 Sentence
 * art_id 决定表中的哪一行唯一的数据
 * 表关联
*/



Flow.init({
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
},{
    sequelize,
    tableName:'flow'
})

module.exports = {
    Flow
}