const Fuckers = require('./Fuckers')
const {u} = require('umbrellajs')
const _ = require('lodash')

const logger = console.log
window.deb = logger || function(){}
const debug = true

class Fucker {
    constructor(severity = 4) {
        this.allowed_nodes = ['input', 'button', 'img', 'select', 'textarea']
    }

    fuckItUp() {
        this.init()
    }
    
    init() {
        deb(u)
        this.elems = []
        u('body').children().each(this.cacheElems.bind(this))

        if (debug) {
            this.elems.forEach(el => {
                el.elem.attr('style', 'border: 2px solid red')
            })
        }
    }
    
    cacheElems(elem) {
        const $elem = u(elem)
        const has_text = elem.childNodes.length === 1 && elem.childNodes[0].nodeName === '#text' 
        
        const is_allowed = _.some(this.allowed_nodes, t => $elem.is(t))
        deb($elem, elem, has_text, elem.nodeType, 'isallowed', is_allowed)
        if (has_text || is_allowed) {
            this.elems.push({
                elem: $elem
            })
        }
        u($elem).children().each(this.cacheElems.bind(this))
    }
}

window.FuckItUp = Fucker

module.exports = Fucker
