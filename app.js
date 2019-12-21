const Koa = require('koa')

const Router = require('koa-router')

const app = new Koa()

var requireDirectory = require('require-directory');

requireDirectory(module, "./api",{
    visit: whenLoadModule
});  

function whenLoadModule(obj){
    if(obj instanceof Router){
       app.use(obj.routes())
    }
}



/*
 * 客户端兼容
*/
/*
* api 版本
*/
/*
 * v1 v2 v3 支持3个版本
 */
/*
 * api 携带版本号 
 * 方式一 路径
 * 方式二 查询参数
 * 方式三 header
*/

/*
 * 开闭原则  修改关闭 扩展开放
*/


app.listen(3000)








