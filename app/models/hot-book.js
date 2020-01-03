const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const { Favor } = require('./favor')

class HotBook extends Model {
    static async getAll() {
        const books = await HotBook.findAll({
            order: [
                'index'
            ]
        })
        const ids = []
        books.forEach((book) => {
            ids.push(book.id)
        })
        // 并发 单线程 同时执行
        // 并发 并行
        // 高并发
        // conncurrency
        // parallelism
        // python 并行 单线程 Thread
        // javaScript 并发
        // 宏任务
        // 微任务
        // 多线程 多进程
        // CPU 密集型 资源密集型
        // java c# 多线程 线程同步 lock




        const favors = await Favor.findAll({
            where: {
                art_id: {
                    [Op.in]: ids,
                },
                type: 400
                // 国画
                // 漫画
            },
            group: ['art_id'],
            attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
        })
        books.forEach(book => {
            HotBook._getEachBookStatus(book, favors)
        })
        //python 二维矩阵
        return books
    }

    static _getEachBookStatus(book, favors) {
        let count = 0
        favors.forEach(favor => {
            if (book.id === favor.art_id) {
                count = favor.get('count')
            }
        })
        book.setDataValue('fav_nums', count)
        return book
    }
}

HotBook.init({
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
}, {
    sequelize,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}
// 排序 重要