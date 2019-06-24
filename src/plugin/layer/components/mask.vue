<template>
    <div class="layui-layer-shade" :style="shadeStyle"></div>
</template>

<script>
    export default {
        data() {
            return {
                shade: [0.3, '#000']
            };
        },
        computed: {
            shadeStyle: function() {
                return `background-color: ${this.shade[1]}; opacity: ${this.shade[0]};`;
            }
        }
    };
</script>
