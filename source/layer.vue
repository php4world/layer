<template>
    <div class="vue-layer" :class="typeClass" :style="layerStyle" data-type="dialog">
        <div class="vue-layer-title" v-html="title"></div>

        <template v-if="type !== 2">
            <div
                class="vue-layer-content"
                :class="{'vue-layer-padding': icon !== ''}"
                :style="contentStyle"
                v-html="rawContent"
            ></div>
        </template>
        <template v-else>
            <div class="vue-layer-content">
                <iframe :scrolling="typeof content === 'string' ? 'auto' : 'no'" allowtransparency="true" onload="this.className='';" class="" frameborder="0" :src="typeof content === 'string' ? content : content[0]" :style="iframeStyle"></iframe>
            </div>
        </template>

        <span class="vue-layer-winctl">
            <a href="javascript:;" class="vue-layer-min" v-if="minBtn"></a>
            <a href="javascript:;" class="vue-layer-max" v-if="maxBtn"></a>
            <a class="vue-layer-close" :class="closeClass" href="javascript:;" @click="fnClose" v-if="closeBtn > 0"></a>
        </span>
        <div class="vue-layer-btn"></div>
        <span class="vue-layer-resize" v-if="resize"></span>
    </div>
</template>

<script>
    export default {
        computed: {
            typeClass() {
                return `vue-layer-${['dialog', 'page', 'iframe', 'loading', 'tips'][this.type]}`;
            },
            layerStyle() {
                let styles = `z-index: ${this.zIndex};`;

                let areaType = Object.prototype.toString.call(this.area) === '[object Array]';

                if (areaType) {
                    styles += `width: ${this.area[0]};height: ${this.area[1]};`;
                } else if (areaType !== 'auto') {
                    styles += `width: ${this.area};`;
                }

                return styles;
            },
            contentStyle() {
                let areaType = Object.prototype.toString.call(this.area) === '[object Array]';

                if (areaType && this.area[1]) {
                    let thatHeight = parseFloat(this.area[1]) - 42 - 42 + 'px';
                    return `height: ${thatHeight}`;
                } else {
                    return false;
                }
            },
            rawContent() {
                return (this.icon !== '' ? `<i class="vue-layer-ico vue-layer-ico-${this.icon}"></i>` : '') + this.content;
            },
            iframeStyle() {
                let thatHeight = parseFloat(this.area[1]) - 42 + 'px';

                return `height: ${thatHeight}`;
            },
            closeClass() {
                return `vue-layer-close${this.closeBtn}`;
            }
        },
        methods: {
            fnClose() {
                this.$emit('close', this.index);
            }
        }
    };
</script>
