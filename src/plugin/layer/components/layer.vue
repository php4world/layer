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
        <div class="php4world-layer-btn" v-if="btn">
            <template v-if="typeof btn === 'string'">
                <a class="php4world-layer-btn0" @click="execFun(0)">{{btn || '确定'}}</a>
            </template>
            <template v-if="typeof btn === 'object'">
                <template v-for="(button, index) in btn">
                    <a :class="`php4world-layer-btn${index}`" :key="`btn${index}`" @click="execFun(index)">{{button}}</a>
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
        mounted() {
            let mx, my, rx, ry, rw, rh;
            let canMove = false;
            let canResize = false;

            if (this.move !== false) {
                let moveElem = this.$el.querySelector(this.move);
                moveElem.style.cursor = 'move';

                moveElem.onmousedown = (e) => {
                    e.preventDefault();

                    mx = e.clientX - parseFloat(this.$el.offsetLeft);
                    my = e.clientY - parseFloat(this.$el.offsetTop);

                    canMove = true;
                };
            }
            if (this.resize !== false) {
                let resizeElem = this.$el.querySelector('.php4world-layer-resize');

                resizeElem.onmousedown = (e) => {
                    e.preventDefault();

                    rw = this.$el.offsetWidth;
                    rh = this.$el.offsetHeight;
                    rx = e.clientX;
                    ry = e.clientY;

                    canResize = true;
                };
            }

            document.onmousemove = (e) => {
                if (canMove) {
                    let moveX = e.clientX - mx;
                    let moveY = e.clientY - my;
                    let rPos = document.documentElement.clientWidth - this.$el.offsetWidth;
                    let bPos = document.documentElement.clientHeight - this.$el.offsetHeight;

                    if (!this.moveOut) {
                        if (moveX < 0) {
                            moveX = 0;
                        }
                        if (moveY < 0) {
                            moveY = 0;
                        }
                        if (moveX > rPos) {
                            moveX = rPos;
                        }
                        if (moveY > bPos) {
                            moveY = bPos;
                        }
                    }

                    this.$el.style.left = moveX + 'px';
                    this.$el.style.top = moveY + 'px';
                }

                if (canResize) {
                    // 偏移量
                    let resizeX = rw + (e.clientX - rx);
                    let resizeY = rh + (e.clientY - ry);

                    if (resizeX < 260) {
                        resizeX = 260;
                    }
                    if (resizeY < 148) {
                        resizeY = 148;
                    }

                    this.$el.style.width = resizeX + 'px';
                    this.$el.style.height = resizeY + 'px';

                    this.$el.querySelector('.php4world-layer-content').style.height = resizeY - 42 - 42 + 'px';
                }
            };

            document.onmouseup = () => {
                canMove = false;
                canResize = false;
            };
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
                this.$emit(`layerBtn${index + 1}`);
            },
            close() {
                this.$emit('layerClose');
            }
        }
    };
</script>
