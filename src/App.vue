<template>
    <div id="app">
        <div class="container">
            <h1>vLayer</h1>
            <button class="btn btn-primary" @click="showAlert">测 试</button>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
            <h1>vLayer</h1>
        </div>
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
                    offset: 20,
                    btn: ['按钮1', '按钮2'],
                    btnAlign: 'c',
                    content: '第一个',
                    yes: () => {
                        this.$layer.open({
                            content: '第一个的第二个'
                        });
                    }
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
