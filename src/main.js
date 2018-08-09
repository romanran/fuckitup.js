const Fucker = require('./Fucker')
const {u} = require('umbrellajs')
const _ = require('lodash')
require('./less/main.less')
const fuckers = require('./fuckers')

const debug = process.env.NODE_ENV === 'development'
window.deb = debug ? console.log : function(){}

const fuckers = {
    spacer: require('./fuckers/spacer'),
    img_fucker: require('./fuckers/img_fucker'),
    img_joker: require('./fuckers/img_joker'),
    drunk_cursor: require('./fuckers/drunk_cursor'),
    spinner: require('./fuckers/spinner'),
    font_fucker: require('./fuckers/font_fucker'),
}

class FuckItUp {
    constructor(severity = 3) {
        this.allowed_nodes = ['input', 'button', 'img', 'select', 'textarea', 'body', 'video', 'audio']
        this.severities = {
            1: 'kitten',
            2: 'spaghetti',
            3: 'berserk'
        }
        this.severity = this.filterSeverity(severity)
        this.fucker_list = _.filter(fuckers, o => o.severity <= this.severity)
        this.fuckers = []
        this.utils = {
            mouse_pos: {
                x: 0,
                y: 0
            }
        }
    }

    filterSeverity(severity) {
        let result = 3
        if (_.isString(severity)) {
            const find = _.findKey(this.severities, (v, k) => v === severity )
            if (find) {
                result = find
            }
        }
        if (_.isNumber(severity)) {
            result = severity < 1 || severity > 3 ? result : severity
        }
        
        return result 
    }

    fuckItUp() {
        this.init()
    }
    
    init() {
        this.elems = []
        this.cacheElems(u('body').nodes[0])

        if (debug) {
            this.elems.forEach(el => {
                el.elem.style.border = '2px solid red'
            })
        }

        this.makeFuckers()
        u('body').on('mousemove', _.throttle(e =>{ 
            this.utils.mouse_pos = {x: e.x, y: e.y}
        }, 5))
    }
    
    cacheElems(elem) {
        const $elem = u(elem)
        const has_text = elem.childNodes.length === 1 && elem.childNodes[0].nodeName === '#text' 
        
        const is_allowed = _.some(this.allowed_nodes, t => $elem.is(t))
        // deb($elem, elem, has_text, elem.nodeName, 'isallowed', is_allowed)
        if (has_text || is_allowed) {
            this.elems.push({
                type: _.lowerCase(elem.nodeName),
                $elem: $elem,
                elem: elem
            })
        }
        $elem.children().each(this.cacheElems.bind(this))
    }

    makeFuckers() {
        this.elems.forEach(el => {
            let fucker_list = _.filter(this.fucker_list, {type: el.type})
            fucker_list = _.union(fucker_list, _.filter(this.fucker_list, {type: 'all'}))
            const fucker_type = _.sample(fucker_list)
            if (fucker_type) {
                const fucker = new Fucker(el.$elem, el.type, fucker_type, fuckers[fucker_type.module])
                this.fuckers.push(fucker)
                fucker.mount() 
            }
        })
    }
}

window.FuckItUp = FuckItUp

module.exports = FuckItUp
