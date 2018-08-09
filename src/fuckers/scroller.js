const _ = require('lodash')
const zenscroll = require('zenscroll')

module.exports = {
    init: function() {
        this.last_time = Date.now()
    },
    start: function() {
        if (Date.now() - this.last_random_x > _.random(3000, 30000)) {
            zenscroll.toY(document.documentElement.scrollTop + _.random(-1000, 1000), _.random(100, 3000))
            this.last_time = Date.now()
        }
    },
    stop: function() {

    },
}