<template>
    <div id="app">
        <div class="container">
            <h1>Layer</h1>
            <button class="btn btn-primary" @click="showAlert">测 试</button>
            <h1><a href="javascript:;">Layer</a></h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1 ref="a">Layer Tips</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
            <h1>Layer</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted() {
            this.$layer.msg('你好', function() {
                console.log('end');
            });
            // this.$layer.open({
            //     type: 0,
            //     content: '你好'
            // });
        },
        methods: {
            showAlert() {
                this.$layer.open({
                    content: '你好',
                    shade: false
                });
                // this.$layer.open({content: '你好'});
                // this.$layer.open({
                //     offset: 20,
                //     btn: ['按钮1', '按钮2'],
                //     content: '第一个',
                //     yes: () => {
                //         this.$layer.open({
                //             content: '第一个的第二个'
                //         });
                //     }
                // });
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
