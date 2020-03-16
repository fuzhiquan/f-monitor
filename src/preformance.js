function _processData(p) {
    const result = {
        prevPage: p.fetchStart - p.navigationStart,// 上一个页面到这个页面的时常
        redirect: p.redirectEnd - p.redirectStart,// 重定向时常
        dns: p.domainLookupEnd - p.domainLookupStart,// dns解析时常
        connect: p.connectEnd - p.connectStart,// tcp连接时常

        //【重要】内容加载完成的时间
        //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
        send: p.responseEnd - p.requestStart,
        //【重要】读取页面第一个字节的时间
        //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
        // TTFB 即 Time To First Byte 的意思
        // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
        ttfb: p.responseStart - p.navigationStart,
        //【重要】dom tree创建时常
        //【原因】dom是否嵌套太多
        domReady: p.domInteractive - p.domLoading,
        //【重要】白屏时间
        //【原因】决定了用户体验
        whiteScreen: p.domLoading - p.navigationStart,
        //【重要】dom解析时间
        //【原因】
        dom: p.domComplete - p.domLoading,
        //【重要】onload执行时间
        //【原因】
        load: p.loadEventEnd - p.loadEventStart,
        //【重要】页面加载完成的时间
        //【原因】这几乎代表了用户等待页面可用的时间
        loadPage: p.loadEventEnd - p.navigationStart
    }
    
    return result
}
/**
 * 这个函数的目的是为了能够获取正确的loadEventEnd时间，
 * 因为监控代码在window.onload执行的过程中，所以必须等到loadEventEnd有值的时候在计算
 * @param {*} cb 
 */
function _load(cb) {
    let timer;
    const check = function() {
        if(performance.timing.loadEventEnd) {
            clearTimeout(timer)
            cb()
        }else {
            timer = setTimeout(check, 100)
        }
    }     
    window.addEventListener('load', check, false)
}
/**
 * 这个函数的目的是为了计算页面dom加载完后就把页面关闭的情况
 * @param {*} cb 
 */
function _domReady(cb) {
    let timer;
    const check = function() {
        if(performance.timing.domInteractive) {
            clearTimeout(timer)
            cb()
        }else {
            timer = setTimeout(check, 100)
        }
    }     
    window.addEventListener('DOMContentLoaded', check, false)
}
export default {
    init(cb) {
        if(performance) {
            _domReady(() => {
                const timing = performance.timing
                const result = _processData(timing)
                result.type = 'domReady'
                cb(result)
            })
            _load(() => {
                const timing = performance.timing
                const result = _processData(timing)
                result.type = 'loaded'
                cb(result)
            })
        }
    }
}