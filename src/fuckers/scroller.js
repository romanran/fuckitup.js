const _ = require('lodash')
const zenscroll = require('zenscroll')

module.exports = {
    init: function() {
        deb('scroll')
        this.last_time = Date.now()
        this.next_trigger_delay = _.random(3000, 10000)
        this.active = 1
    },
    start: function() {
        if (Date.now() - this.last_time > this.next_trigger_delay && this.active) {
            zenscroll.toY(document.documentElement.scrollTop + _.random(-2000, 2000), _.random(100, 3000))
            this.last_time = Date.now()
            this.next_trigger_delay = _.random(3000, 30000) 
        }
    },
    stop: function() {
        this.active = 0
    },
}