export default {
    init(cb) {
        window.onload = function() {
            // PerformanceObserver高级api，可以获取资源的相关信息，但不包含自己(经测试结果不准确,所以if条件内给了一个false)
            if(window.performance && window.PerformanceObserver && false) {
                const observer = new PerformanceObserver((list) => {
                    const data = list.getEntries()
                    cb(data[0])
                })
                observer.observe({entryTypes: ['resource']})
            }else if(window.performance) {
                const resourceData = performance.getEntriesByType('resource')
                cb(resourceData)
            }else {
                cb(null)
            }
        }
    }
}