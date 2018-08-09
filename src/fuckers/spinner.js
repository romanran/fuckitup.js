module.exports = {
    init: function() {
        this.$wrap.addClass(_.sample(['blaaargh', 'blaaargh--reverse']))
        const origin = {
            h: _.sample(['left', 'right', 'center']),
            v: _.sample(['top', 'bottom', 'center'])
        }

        this.$wrap.attr('style', `transform-origin: ${origin.h} ${origin.v}; 
            animation-duration: ${_.random(200, 3000)}ms;`)
    },
    start: function() {
    },
    stop: function() {

    },
}