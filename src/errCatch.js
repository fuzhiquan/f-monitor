/**
 * 注意：我们的js文件一般都是和承载页不同域的，所以以下两点缺一不可
 * 1. 相关的js文件上加上Access-Control-Allow-Origin:*的response header
 * 2. 引用相关的js文件时加上crossorigin属性
 */
export default {
    init(cb) {
        window.onerror = function(message, source, lineno, colno, error) {
            const info = {
                message: error.message,
                name: error.name
            }
            cb(info)
        }
    }
}