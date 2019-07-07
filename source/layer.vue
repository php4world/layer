<template>
    <div class="vue-layer" :class="typeClass" :style="layerStyle" :type="types[type]">
        <div class="vue-layer-title" v-if="title !== false && type < 3" :style="Object.prototype.toString.call(title) === '[object Array]' ? title[1] : ''" v-html="Object.prototype.toString.call(title) === '[object Array]' ? title[0] : title"></div>

        <template v-if="type === 0">
            <div
                class="vue-layer-content"
                :class="{'vue-layer-padding': icon > -1}"
                :style="contentStyle"
                v-html="rawContent"
            ></div>
        </template>
        <template v-if="type === 1">
            <div
                class="vue-layer-content"
                :style="contentStyle"
                v-html="content"
            ></div>
        </template>
        <template v-if="type === 2">
            <div class="vue-layer-content">
                <iframe
                    allowtransparency="true"
                    onload="this.className='';"
                    frameborder="0"
                    :scrolling="Object.prototype.toString.call(content) === '[object String]' ? 'auto' : 'no'"
                    :src="Object.prototype.toString.call(content) === '[object String]' ? content : content[0]"
                    :style="iframeStyle"
                ></iframe>
            </div>
        </template>
        <template v-if="type === 3">
            <div class="vue-layer-content" :class="`vue-layer-loading${icon}`"></div>
        </template>

        <span class="vue-layer-winctl">
            <a href="javascript:;" class="vue-layer-min" v-if="minBtn"></a>
            <a href="javascript:;" class="vue-layer-max" v-if="maxBtn"></a>
            <a href="javascript:;" class="vue-layer-close" :class="closeClass" @click="fnClose" v-if="closeBtn > 0 && type < 3"></a>
        </span>

        <div class="vue-layer-btn" :class="{'vue-layer-btn-l': btnAlign === 'l', 'vue-layer-btn-c': btnAlign === 'c'}" v-if="btn && type < 3">
            <template v-if="Object.prototype.toString.call(btn) === '[object String]'">
                <a class="vue-layer-btn0" @click="fnBtn(0)" v-html="btn || '确定'"></a>
            </template>
            <template v-if="Object.prototype.toString.call(btn) === '[object Array]'">
                <a v-for="(button, index) in btn" :key="`btn${index}`" :class="`vue-layer-btn${index}`" @click="fnBtn(index)" v-html="button"></a>
            </template>
        </div>

        <span class="vue-layer-resize" v-if="resize && type < 3"></span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                types: ['dialog', 'page', 'iframe', 'loading']
            };
        },
        computed: {
            typeClass() {
                return `vue-layer-${this.types[this.type]}`;
            },
            layerStyle() {
                let styles = `z-index: ${this.zIndex};`;

                let areaType = Object.prototype.toString.call(this.area) === '[object Array]';

                if (areaType) {
                    styles += `width: ${this.area[0]};height: ${this.area[1]};`;
                } else if (areaType !== 'auto') {
                    styles += `width: ${this.area};`;
                }

                if (!this.fixed) {
                    styles += 'position: absolute';
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
                return (this.icon > -1 ? `<i class="vue-layer-ico vue-layer-ico-${this.icon}"></i>` : '') + this.content;
            },
            iframeStyle() {
                let thatHeight = parseFloat(this.area[1]) - 42 + 'px';

                return `height: ${thatHeight}`;
            },
            closeClass() {
                return 'vue-layer-close' + ((!this.title) ? 2 : this.closeBtn);
            }
        },
        methods: {
            fnBtn(index) {
                this.$emit(`btn${index + 1}`, this.index);
            },
            fnClose() {
                this.$emit('close', this.index);
            }
        }
    };
</script>
