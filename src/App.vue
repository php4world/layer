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
                    offset: 20,
                    // btn: '你好',
                    btn: ['按钮1', '按钮2', '按钮2.1'],
                    // area: ['600px', '250px'],
                    content: 'https://www.layui.com',
                    yes() {
                        console.log('click yes');
                    },
                    btn2() {
                        console.log('click btn2');
                    },
                    btn3() {
                        console.log('click btn3');
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
