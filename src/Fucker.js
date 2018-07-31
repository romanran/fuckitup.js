const {u} = require('umbrellajs')
const _ = require('lodash')
const fuckers = {
    spacer: require('./fuckers/spacer'),
    img_fucker: require('./fuckers/img_fucker'),
    img_joker: require('./fuckers/img_joker')
}

class Fucker {
    constructor($wrap, type, fucker) {
        this.$wrap = $wrap
        this.wrap = $wrap.nodes[0]
        this.type = type
        this.active = false
        this.fucker = fucker
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
            }
        }
        triggers[this.fucker.trigger]()
    }
}
module.exports = Fucker