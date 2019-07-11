<template>
    <button @click="run">运行代码</button>
</template>

<script>
    import Vue from 'vue';
    export default {
        mounted() {
            import('@php4world/layer/dist/layer.umd.js').then(module => {
                Vue.use(module.default);
            });
        },
        methods: {
            run() {
                this.$layer.alert('111');
            }
        }
    };
</script>
