const _ = require('lodash')

module.exports = {
    init: function() {
        if (this.type === 'body') {
            return 0
        }
        this.added_class = _.sample(['blaaargh', 'blaaargh--reverse'])
        this.$wrap.addClass(this.added_class)
        const origin = {
            h: _.sample(['left', 'right', 'center']),
        }
        origin.v = origin.h === 'center' ? '' : _.sample(['top', 'bottom', 'center'])
        this.prev_style = this.$wrap.attr('style')
        this.$wrap.attr('style', `transform-origin: ${origin.h} ${origin.v}; animation-duration: ${_.random(200, 3000)}ms;`)
    },
    start: function() {
    },
    stop: function() {
        this.$wrap.removeClass(this.added_class)
        this.$wrap.attr('style', this.prev_style)
    },
}