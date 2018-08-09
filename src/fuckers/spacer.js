module.exports = {
    init: function() {
        if (this.type === 'body') {
            return 0
        }
        this.wrap.style.whiteSpace = 'pre-wrap'
    },
    start: function() {
        this.active = true
        if (this.type === 'body') {
            return 0
        }
        const addSpace = () => {
            if (['input', 'textarea'].indexOf(this.type) >= 0) {
                const elem = this.wrap.control ? this.wrap.control : this.wrap
                if (['radio', 'checkbox'].indexOf(elem.type) >= 0) {
                    elem.checked = true
                } else {
                    this.wrap.value = '  ' + this.wrap.value
                }
            } else if (['svg', 'img', 'video', 'audio', 'iframe', 'select'].indexOf(this.type) >= 0) {
                this.$wrap.parent().nodes[0].style.whiteSpace = 'pre-wrap'
                this.$wrap.parent().prepend('  ')
            } else {
                this.$wrap.prepend('  ')
            }
            this.active && requestAnimationFrame(() => addSpace())
        }
        addSpace()
    },
    stop: function() {
        this.active = false
    },
}