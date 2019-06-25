<template>
    <div class="php4world-layer-shade" :style="shadeStyle"></div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        computed: {
            shadeStyle: function() {
                let bgc = '#000000';
                let opc = '0.3';
                if (typeof this.shade === 'number') {
                    opc = this.shade;
                } else if (typeof this.shade === 'object') {
                    opc = this.shade[0];
                    bgc = this.shade[1];
                }

                return `background-color: ${bgc}; opacity: ${opc};z-index: ${this.zIndex};`;
            }
        }
    };
</script>
