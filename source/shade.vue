<template>
    <div class="vue-layer-shade" :style="shadeStyle" @click="close"></div>
</template>

<script>
    export default {
        computed: {
            shadeStyle() {
                let bgc = '#000000';
                let opc = 0.3;

                if (Object.prototype.toString.call(this.shade) === '[object Number]') {
                    opc = this.shade;
                } else if (Object.prototype.toString.call(this.shade) === '[object Array]') {
                    opc = this.shade[0];
                    bgc = this.shade[1];
                }

                return `background-color: ${bgc}; opacity: ${opc}; z-index: ${this.zIndex - 1};`;
            }
        },
        methods: {
            close() {
                if (this.shadeClose) {
                    this.$emit('close');
                }
            }
        }
    };
</script>
