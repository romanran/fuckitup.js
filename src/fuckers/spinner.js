const _ = require('lodash')

module.exports = {
    init: function() {
        if (this.type === 'body') {
            return 0
        }
        this.$wrap.addClass(_.sample(['blaaargh', 'blaaargh--reverse']))
        const origin = {
            h: _.sample(['left', 'right', 'center']),
        }
        origin.v = origin.h === 'center' ? '' : _.sample(['top', 'bottom', 'center'])

        this.$wrap.attr('style', `transform-origin: ${origin.h} ${origin.v}; animation-duration: ${_.random(200, 3000)}ms;`)
    },
    start: function() {
    },
    stop: function() {

    },
}