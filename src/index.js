/**
 * 1. 性能监控: preformance
 * 2. 静态资源加载情况
 * 3. ajax监控
 * 4. 错误监控
 * 5. 用户行为
 */
import preformance from './preformance'

preformance.init((data) => {
    console.log(data)
})