const _ = require('lodash')

module.exports = {
    init: function() {
        let f_size = 0
        let font_size = window.getComputedStyle(this.wrap, null).getPropertyValue('font-size')
        font_size = parseFloat(font_size)
        f_size = _.random(font_size-4, font_size+4)
        this.prev_style = this.$wrap.attr('style')
        this.$wrap.attr('style', `font-size: ${f_size}px`)
    },
    start: function(e) {

    },
    stop: function() {
        this.$wrap.attr('style', this.prev_style)
    },
}