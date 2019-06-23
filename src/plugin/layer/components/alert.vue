<template>
    <div class="layui-layer layui-layer-dialog" id="layui-layer0">
        <div class="layui-layer-title">{{title}}</div>
        <div class="layui-layer-content" v-html="content"></div>
        <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
        </span>
        <div class="layui-layer-btn layui-layer-btn-">
            <a class="layui-layer-btn0" @click="yes">确定</a>
            <a class="layui-layer-btn1">取消</a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '信息'
            },
            content: {
                type: String,
                default: 'Hello World'
            }
        },
        data() {
            return {};
        },
        methods: {
            yes() {
                this.$emit('clickYes');
            }
        }
    };
</script>
