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
                this.$layer.alert({
                    type: 2,
                    content: '<strong>随便一个代码</strong>'
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
