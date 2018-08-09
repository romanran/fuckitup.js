module.exports = {
    init: function() {
        this.$wrap.addClass('blaaargh')
        const origin = {
            h: _.sample(['left', 'right', 'center']),
            v: _.sample(['top', 'bottom', 'center'])
        }

        this.$wrap.attr('style', `transform-origin: ${origin.h} ${origin.v}`)
    },
    start: function() {
    },
    stop: function() {

    },
}