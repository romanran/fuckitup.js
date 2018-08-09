const _ = require('lodash')

module.exports = {
    init: function() {
        let f_size = 0
        if (_.random(0, 1)) {
            f_size = _.random(4, 10)
        } else {
            f_size = _.random(30, 60)
        }

        this.$wrap.attr('style', `font-size: ${f_size}px`)
    },
    start: function(e) {

    },
    stop: function() {

    },
}