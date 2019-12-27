const {
    sequelize
} = require('../../core/db')

const {
    Sequelize,
    Model
} = require('sequelize')


/*
 * art  classic book 是 music sentence movie 的抽象词 
 * 
 * 
 * 
 * 一些贴切的单词   命名 /变量/类 名字
 * 共同字段/属性
 * image title pubdate content fav_nums
 * type  代号 那个类型
*/

const classicFields = {
    image: {
        type:Sequelize.STRING,
    },
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: {
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    title: Sequelize.STRING,
    type: Sequelize.TINYINT,
}


class Movie extends Model {

}

class Sentence extends Model{
    
} 


class Music extends Model {

}

Movie.init(classicFields,{
  sequelize,
    tableName: 'movie'
})

Sentence.init(classicFields,{
    sequelize,
    tableName: 'sentence'
})

const musicFields = Object.assign({
    url:Sequelize.STRING
}, classicFields)

Music.init(musicFields,{
    sequelize,
    tableName: 'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}