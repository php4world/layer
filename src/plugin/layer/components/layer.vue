<template>
    <div class="php4world-layer" :class="layerTypeClass" :style="layerTypeStyle">
        <div class="php4world-layer-title" v-if="title !== false" v-html="typeof title === 'object' ? title[0] : title" :style="typeof title === 'object' ? title[1] : ''"></div>
        <template v-if="type !== 2">
            <div class="php4world-layer-content" :style="contentStyle" v-html="content"></div>
        </template>
        <template v-else>
            <div class="php4world-layer-content">
                <iframe :scrolling="typeof content === 'string' ? 'auto' : 'no'" allowtransparency="true" onload="this.className='';" class="" frameborder="0" :src="typeof content === 'string' ? content : content[0]" :style="iframeStyle"></iframe>
            </div>
        </template>
        <span class="php4world-layer-setwin" v-if="closeBtn > 0">
            <a class="php4world-layer-ico php4world-layer-close" :class="closeTypeClass" href="javascript:;" @click="close"></a>
        </span>
        <div class="php4world-layer-btn php4world-layer-btn-" v-if="type === 0">
            <a class="php4world-layer-btn0" @click="yes">确定</a>
            <a class="php4world-layer-btn1" @click="close">取消</a>
        </div>
        <span class="php4world-layer-resize"></span>
    </div>
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
                let styleList = `z-index: ${this.zIndex};`;

                let areaType = typeof this.area === 'object';

                if (areaType) {
                    styleList += `width: ${this.area[0]};height: ${this.area[1]};`;
                } else if (areaType !== 'auto') {
                    styleList += `width: ${this.area};`;
                }

                return styleList;
            },
            contentStyle: function() {
                let thatHeight = parseFloat(this.area[1]) - 43 - 47 + 'px';

                return `height: ${thatHeight}`;
            },
            iframeStyle: function() {
                let thatHeight = parseFloat(this.area[1]) - 43 + 'px';

                return `height: ${thatHeight}`;
            },
            closeTypeClass: function() {
                return `php4world-layer-close${this.closeBtn}`;
            }
        },
        methods: {
            yes() {
                this.$emit('layerBtn1');
            },
            close() {
                this.$emit('layerClose');
            }
        }
    };
</script>
