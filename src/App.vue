<template>
    <div id="app">
        <div class="container">
            <h1>vLayer</h1>
        </div>
        <button class="btn btn-primary" @click="showAlert">测 试</button>
    </div>
</template>

<script>
    import './plugin/layer/components/default.scss';

    export default {
        name: 'app',
        mounted() {},
        methods: {
            showAlert() {
                this.$layer.open({
                    type: 0,
                    area: ['640px', '480px'],
                    offset: 20,
                    content: 'https://www.layui.com'
                });
            }
        }
    };
</script>

<style lang="scss">
    body {
        font-size: 14px;
    }
    #app {
        text-align: center;
    }
</style>
