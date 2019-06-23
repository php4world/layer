<template>
    <div id="app">
        vLayer
        <button @click="showAlert">show</button>
    </div>
</template>

<script>
    import './plugin/test/vlayer.css';

    export default {
        name: 'app',
        mounted() {},
        methods: {
            showAlert() {
                this.$layer.alert({
                    title: '提示',
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
