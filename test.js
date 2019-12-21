function func1() {
    try {
        func2()
    } catch (error) {

    }
}
function func2() {
    try {
        func3()
    } catch (error) {

    }
}
function func3() {
    try {
        1 / a
    } catch (error) {
        throw error
    }
    return 'success'

}

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