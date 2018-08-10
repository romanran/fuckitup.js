const _ = require('lodash')

module.exports = {
    init: function() {
        this.active = false
    },
    start: function() {
        if (this.type === 'body' || this.active) {
            return 0
        }
        this.active = true
        this.added_class = _.sample(['blaaargh', 'blaaargh--reverse'])
        this.$wrap.addClass(this.added_class)
        const origin = {
            h: _.sample(['left', 'right', 'center']),
        }
        origin.v = origin.h === 'center' ? '' : _.sample(['top', 'bottom', 'center'])
        this.prev_style = this.$wrap.attr('style')
        this.$wrap.attr('style', `transform-origin: ${origin.h} ${origin.v}; animation-duration: ${_.random(200, 3000)}ms;`)
    },
    stop: function() {

    },
    destroy: function() {
        this.active = false
        this.$wrap.removeClass(this.added_class)
        this.$wrap.attr('style', this.prev_style)
    }
}