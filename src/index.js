/**
 * 1. 性能监控: preformance
 * 2. 静态资源加载情况: resource
 * 3. ajax监控
 * 4. 错误监控
 * 5. 用户行为
 */
import preformance from './preformance'
import resource from './resource'
function formatObj(obj) {
    const result = []
    for(let key in obj) {
        result.push(`${key}=${obj[key]}`)
    }
    return result.join('&')
}
/**
 * 把监控的数据通过new Image().src这种方式发送给后端，下面这段代码的方式是为了防止浏览器垃圾回收
 */
preformance.init((data) => {
    var n = "log_"+ (new Date()).getTime()
    var c = window[n] = new Image()//把new Image()赋给一个全局变量长期持有
    c.onload = (c.οnerrοr = function(){window[n] = null})
    c.src = `/p.gif?${formatObj(data)}`
    c = null//释放局部变量c
})

resource.init((data) => {
    console.log(data)
})