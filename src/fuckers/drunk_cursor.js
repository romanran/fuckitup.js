const _ = require('lodash')
const {u} = require('umbrellajs')

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
        this.next_trigger_delay = {
            x: 0,
            y: 0
        }
        this.active = 1
    },
    start: function(e) {
        if (!this.active) return 0
        if (Date.now() - this.last_random_x > this.next_trigger_delay.x) {
            this.random_x = _.random(-50, 50)
            this.last_random_x = Date.now()
            this.next_trigger_delay.x = _.random(200, 2000)
        }
        if (Date.now() - this.last_random_y > this.next_trigger_delay.y) {
            this.random_y = _.random(-50, 50)
            this.last_random_y = Date.now()
            this.next_trigger_delay.y = _.random(200, 2000)

        }
        const target_x = this.parent.utils.mouse_pos.x + this.random_x
        const target_y = this.parent.utils.mouse_pos.y + this.random_y
        this.fake_pos.x = this.calcPos(this.fake_pos.x, target_x)
        this.fake_pos.y = this.calcPos(this.fake_pos.y, target_y)
        this.$cursor.attr('style', `left: ${_.toSafeInteger(this.fake_pos.x)}px; top: ${_.toSafeInteger(this.fake_pos.y)}px;`)
        this.prev_time = Date.now()
    },
    stop: function() {
        this.active = 0
        this.$wrap.removeClass('fuck-cursor')
        this.$cursor.remove()
    },
}