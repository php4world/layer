<template>
    <div class="php4world-layer" :class="layerTypeClass"></div>

    <!-- <div class="php4world-layer php4world-layer-dialog">
        <div class="php4world-layer-title">{{title}}</div>
        <div class="php4world-layer-content" v-html="content"></div>
        <span class="php4world-layer-setwin">
            <a class="php4world-layer-ico php4world-layer-close php4world-layer-close1" href="javascript:;"></a>
        </span>
        <div class="php4world-layer-btn php4world-layer-btn-">
            <a class="php4world-layer-btn0" @click="yes">确定</a>
            <a class="php4world-layer-btn1">取消</a>
        </div>
    </div> -->
</template>

<script>
    export default {
        data() {
            return {
                title: '&#x4FE1;&#x606F;',
                content: '',
                type: 0
            };
        },
        computed: {
            layerTypeClass: function() {
                console.log(this.type);
                return 'php4world-layer-dialog';
            }
        },
        methods: {
            yes() {
                this.$emit('clickYes');
            }
        }
    };
</script>
