module.exports = {
    init: function() {
        this.img_src = this.$wrap.attr('src')
    },
    start: function() {
        this.img_h = this.wrap.offsetHeight
        this.img_w = this.wrap.offsetWidth
        this.wrap.style.height = `${this.img_h}px`
        this.wrap.style.width = `${this.img_w}px`
        this.wrap.style.display = this.wrap.style.display ? this.wrap.style.display : `block`
        this.$wrap.attr('src', '#f-up')
    },
    stop: function() {
        this.img_src = this.$wrap.attr('src', this.img_src)
    },
}