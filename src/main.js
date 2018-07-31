const Fucker = require('./Fucker')
const {u} = require('umbrellajs')
const _ = require('lodash')
require('./less/main.less')
const fuckers = require('./fuckers')

window._ = _

const debug = process.env.NODE_ENV === 'development'
window.deb = debug ? console.log : function(){}

class FuckItUp {
    constructor(severity = 3) {
        this.allowed_nodes = ['input', 'button', 'img', 'select', 'textarea']
        this.severities = {
            1: 'lame',
            2: 'fuckit',
            3: 'berserk'
        }
        this.severity = this.filterSeverity(severity)
        this.triggers = ['load', 'click', 'hover', 'onscreen']
        this.fucker_list = _.filter(fuckers, {severity: this.severity})
        this.fuckers = []
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
        u('body').children().each(this.cacheElems.bind(this))

        if (debug) {
            this.elems.forEach(el => {
                el.elem.style.border = '2px solid red'
            })
        }

        this.makeFuckers()
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
                const fucker = new Fucker(el.$elem, el.type, fucker_type)
                this.fuckers.push(fucker)
                fucker.mount() 
            }
        })
    }
}

window.FuckItUp = FuckItUp

module.exports = FuckItUp
