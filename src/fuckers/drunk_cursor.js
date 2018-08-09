const _ = require('lodash')

module.exports = {
    init: function() {
        this.$wrap.addClass('fuck-cursor')
        this.$cursor = u('<div class="drunk-cursor"></div>')
        this.$wrap.append(this.$cursor)
        const {x, y} = this.parent.utils.mouse_pos
        this.prev_time = Date.now()
        this.fake_pos = {
            x: x || 0,
            y: y || 0
        }
        this.calcPos = function(pos, target) {
            const prop =(Date.now() - this.prev_time) / 200
            pos += (target - pos) * prop
            return pos
        }
        this.random_x = 0
        this.random_y = 0
        this.last_random_x = Date.now()
        this.last_random_y = Date.now()
    },
    start: function(e) {
        if (Date.now() - this.last_random_x > _.random(1000, 4000)) {
            this.random_x = _.random(-50, 50)
            this.last_random_x = Date.now()
        }
        if (Date.now() - this.last_random_y > _.random(1000, 4000)) {
            this.random_y = _.random(-50, 50)
            this.last_random_y = Date.now()
        }
        const target_x = this.parent.utils.mouse_pos.x + this.random_x
        const target_y = this.parent.utils.mouse_pos.y + this.random_y
        this.fake_pos.x = this.calcPos(this.fake_pos.x, target_x)
        this.fake_pos.y = this.calcPos(this.fake_pos.y, target_y)
        this.$cursor.attr('style', `left: ${_.toSafeInteger(this.fake_pos.x)}px; top: ${_.toSafeInteger(this.fake_pos.y)}px;`)
        this.prev_time = Date.now()
    },
    stop: function() {

    },
}