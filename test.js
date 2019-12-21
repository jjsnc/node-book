async function func1() {
    await func2()
}
async function func2() {
    try {
        await func3()
    } catch (error) {
        console.log('11')
    }
}
async function func3() {
    return Promise((resolve, reject) => {
        setTimeout(() => {
            throw new Error('error')
            reject('error')
        }, 1000)
    })

}
func1()
/*
 *  全局异常处理
 */

/*
 * try catch  只能捕获同步代码的异常
*/


/*
 * 没有发生异常
 * 无异常 执行 不需要结果
 * 发生了异常
*/

/*
 * 函数设计
 * 判断发生了异常 return fasle null
 * throw new Error 编程规范 throw
*/