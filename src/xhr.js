export default {
    init(cb) {
        const xhr = window.XMLHttpRequest

        const oldOpen = xhr.prototype.open
        xhr.prototype.open = function(method, url) {
            this.info = {
                method,
                url
            }
            return oldOpen.apply(this, arguments)
        }

        const oldSend = xhr.prototype.send
        xhr.prototype.send = function(value) {
            const startTime = Date.now()
            const fn = (type) => () => {
                this.info.type = type
                this.info.time = date.now() - startTime
                this.info.requestSize = value ? value.length : 0
                this.info.responseSize = this.responseText.length
                cb(this.info)
            }
            this.addEventListener('load', fn('load'), false)
            this.addEventListener('error', fn('error'), false)
            this.addEventListener('abort', fn('abort'), false)
            return oldSend.apply(this, arguments)
        }
    }
}