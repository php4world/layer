<template>
    <transition name="bounce">
        <div class="php4world-layer" :class="layerTypeClass" :style="layerTypeStyle">
            <div class="php4world-layer-title" v-if="title !== false" v-html="title"></div>
            <template v-if="type !== 2">
                <div class="php4world-layer-content" v-html="content"></div>
            </template>
            <template v-else>
                <div class="php4world-layer-content">
                    <iframe :scrolling="typeof content === 'string' ? 'auto' : 'no'" allowtransparency="true" onload="this.className='';" class="" frameborder="0" :src="typeof content === 'string' ? content : content[0]"></iframe>
                </div>
            </template>
            <span class="php4world-layer-setwin" v-if="closeBtn > 0">
                <a class="php4world-layer-ico php4world-layer-close" :class="closeTypeClass" href="javascript:;" @click="cancel"></a>
            </span>
            <div class="php4world-layer-btn php4world-layer-btn-" v-if="type === 0">
                <a class="php4world-layer-btn0" @click="yes">确定</a>
                <a class="php4world-layer-btn1" @click="cancel">取消</a>
            </div>
        </div>
    </transition>
</template>

<script>
    const typeList = ['dialog', 'page', 'iframe', 'loading', 'tips'];
    export default {
        data() {
            return {};
        },
        computed: {
            layerTypeClass: function() {
                let classList = `php4world-layer-${typeList[this.type]}`;

                return classList;
            },
            layerTypeStyle: function() {
                let styleList = `z-index: ${this.zIndex}`;

                return styleList;
            },
            closeTypeClass: function() {
                return `php4world-layer-close${this.closeBtn}`;
            }
        },
        methods: {
            yes() {
                this.$emit('clickYes');
            },
            cancel() {
                this.$emit('clickCancel');
            }
        }
    };
</script>
