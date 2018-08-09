const {u} = require('umbrellajs')
const _ = require('lodash')
const fuckers = {
    spacer: require('./fuckers/spacer'),
    img_fucker: require('./fuckers/img_fucker'),
    img_joker: require('./fuckers/img_joker'),
    drunk_cursor: require('./fuckers/drunk_cursor'),
    spinner: require('./fuckers/spinner'),
}

class Fucker {
    constructor($wrap, type, fucker, parent) {
        this.$wrap = $wrap
        this.wrap = $wrap.nodes[0]
        this.type = type
        this.active = false
        this.fucker = fucker
        this.parent = parent
    }
    mount() {
        this.addListeners()
    }
    addListeners() {
        fuckers[this.fucker.module].init && fuckers[this.fucker.module].init.call(this)
        const triggers = {
            load: () => {
                document.addEventListener('DOMContentLoaded', fuckers[this.fucker.module].start.bind(this))
            },
            hover: () => {
                this.$wrap.on('mouseover', fuckers[this.fucker.module].start.bind(this))
                this.$wrap.on('mouseout', fuckers[this.fucker.module].stop.bind(this))
            },
            img_load: () => {
                const start = _.once(fuckers[this.fucker.module].start.bind(this))
                if (this.wrap.complete) start()
                this.$wrap.on('load', start)
            },
            mousemove: () => {
                this.$wrap.on('mousemove', _.throttle(fuckers[this.fucker.module].start.bind(this), 5))
            },
            frame: () => {
                this.event_frame = function() {
                    fuckers[this.fucker.module].start.call(this)
                    requestAnimationFrame(this.event_frame.bind(this))
                }
                this.event_frame()
            }
        }
        triggers[this.fucker.trigger]()
    }
}
module.exports = Fucker