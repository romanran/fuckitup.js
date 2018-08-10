const _ = require('lodash')

module.exports = {
    init: function() {
        let f_size = 0
        let font_size = window.getComputedStyle(this.wrap, null).getPropertyValue('font-size')
        font_size = parseFloat(font_size)
        const deviation = 4 * this.parent.severity / 2

        f_size = _.random(font_size + deviation, font_size + deviation)
        this.prev_style = this.$wrap.attr('style')
        this.$wrap.attr('style', this.prev_style + `font-size: ${f_size}px`)
    },
    start: function(e) {

    },
    stop: function() {
        this.$wrap.attr('style', this.prev_style)
    },
}