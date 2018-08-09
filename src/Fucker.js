const {u} = require('umbrellajs')
const _ = require('lodash')

class Fucker {
    constructor($wrap, type, fucker_type, parent, fucker) {
        this.$wrap = $wrap
        this.wrap = $wrap.nodes[0]
        this.type = type
        this.active = false
        this.fucker_type = fucker_type
        this.parent = parent
        this.fucker = fucker
    }
    mount() {
        this.addListeners()
    }
    addListeners() {
        this.fucker.init && this.fucker.init.call(this)
        const triggers = {
            load: () => {
                document.addEventListener('DOMContentLoaded', this.fucker.start.bind(this))
            },
            hover: () => {
                this.$wrap.on('mouseover', this.fucker.start.bind(this))
                this.$wrap.on('mouseout', this.fucker.stop.bind(this))
            },
            img_load: () => {
                const start = _.once(this.fucker.start.bind(this))
                if (this.wrap.complete) start()
                this.$wrap.on('load', start)
            },
            mousemove: () => {
                this.$wrap.on('mousemove', _.throttle(this.fucker.start.bind(this), 5))
            },
            frame: () => {
                this.event_frame = function() {
                    this.fucker.start.call(this)
                    requestAnimationFrame(this.event_frame.bind(this))
                }
                this.event_frame()
            }
        }
        triggers[this.fucker_type.trigger]()
    }
}
module.exports = Fucker