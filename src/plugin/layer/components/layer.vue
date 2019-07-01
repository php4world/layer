<template>
    <div class="php4world-layer" :class="layerTypeClass" :style="layerTypeStyle">
        <div class="php4world-layer-title" v-if="title !== false" v-html="typeof title === 'object' ? title[0] : title" :style="typeof title === 'object' ? title[1] : ''"></div>
        <template v-if="type !== 2">
            <div class="php4world-layer-content" :class="{'php4world-layer-padding': icon > -1}" :style="contentStyle" v-html="rContent"></div>
        </template>
        <template v-else>
            <div class="php4world-layer-content">
                <iframe :scrolling="typeof content === 'string' ? 'auto' : 'no'" allowtransparency="true" onload="this.className='';" class="" frameborder="0" :src="typeof content === 'string' ? content : content[0]" :style="iframeStyle"></iframe>
            </div>
        </template>
        <span class="php4world-layer-setwin" v-if="closeBtn > 0">
            <a class="php4world-layer-ico php4world-layer-close" :class="closeTypeClass" href="javascript:;" @click="cancelFun"></a>
        </span>
        <div class="php4world-layer-btn" :class="{'php4world-layer-btn-l': btnAlign === 'l', 'php4world-layer-btn-c': btnAlign === 'c'}" v-if="btn">
            <template v-if="typeof btn === 'string'">
                <a class="php4world-layer-btn0" @click="execFun(0)" v-html="btn || '确定'"></a>
            </template>
            <template v-if="typeof btn === 'object'">
                <template v-for="(button, index) in btn">
                    <a :class="`php4world-layer-btn${index}`" :key="`btn${index}`" @click="execFun(index)" v-html="button"></a>
                </template>
            </template>
        </div>
        <span class="php4world-layer-resize" v-if="resize"></span>
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
                let areaType = typeof this.area === 'object';

                if (areaType && this.area[1]) {
                    let thatHeight = parseFloat(this.area[1]) - 42 - 42 + 'px';
                    return `height: ${thatHeight}`;
                } else {
                    return false;
                }
            },
            rContent: function() {
                let c = this.icon > -1 ? `<i class="php4world-layer-ico php4world-layer-ico${this.icon}"></i>` : '';
                return c + this.content;
            },
            iframeStyle: function() {
                let thatHeight = parseFloat(this.area[1]) - 42 + 'px';

                return `height: ${thatHeight}`;
            },
            closeTypeClass: function() {
                return `php4world-layer-close${this.closeBtn}`;
            }
        },
        methods: {
            execFun(index) {
                this.$emit(`emitLayerBtn${index + 1}`, this.index);
            },
            cancelFun() {
                this.$emit('emitLayerCancel', this.index);
            }
        }
    };
</script>
