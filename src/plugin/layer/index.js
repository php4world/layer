import Mask from './components/mask.vue';
import Layer from './components/layer.vue';
// import Layer from './components/layer.js';

Element.prototype.one = function(type, callback) {
    let handle = function() {
        callback = callback.call(this);
        this.removeEventListener(type, handle);
    };
    this.addEventListener(type, handle);
};

export default {
    install(Vue, options) {
        let layer = {
            version: '0.0.1',
            config: {
                type: 0,
                shade: 0.3,
                fixed: true,
                move: '.layui-layer-title',
                title: '&#x4FE1;&#x606F;',
                offset: 'auto',
                area: 'auto',
                closeBtn: 1,
                time: 0, // 0表示不自动关闭
                zIndex: 200001,
                maxWidth: 360,
                anim: 0,
                isOutAnim: true,
                icon: -1,
                moveType: 1,
                resize: true,
                scrollbar: true, // 是否允许浏览器滚动条
                tips: 2
            }
        };

        Vue.prototype.$layer = {
            open: (settings = {}) => {
                Object.assign(layer.config, settings);

                function execOpenAnim() {
                    layerInstance.$el.one('animationend', () => {
                        layerInstance.$el.classList.remove('layer-anim', 'layer-anim-0' + layer.config.anim);
                    });
                    layerInstance.$el.classList.add('layer-anim', 'layer-anim-0' + layer.config.anim);
                }

                function execCloseAnim() {
                    layerInstance.$el.one('animationend', () => {
                        layerInstance.$el.classList.remove('layer-anim-close');

                        document.body.removeChild(layerInstance.$el);
                    });
                    layerInstance.$el.classList.add('layer-anim-close');

                    document.body.removeChild(maskInstance.$el);
                }

                function setLayerOffset() {
                    let area = [layerInstance.$el.offsetWidth, layerInstance.$el.offsetHeight];
                    let doc = [document.documentElement.clientWidth, document.documentElement.clientHeight];
                    let type = typeof layer.config.offset === 'object';

                    let offsetTop = (doc[1] - area[1]) / 2;
                    let offsetLeft = (doc[0] - area[0]) / 2;

                    if (type) {
                        offsetTop = layer.config.offset[0];
                        offsetLeft = layer.config.offset[1];
                    } else if (layer.config.offset !== 'auto') {
                        if (layer.config.offset === 't') {
                            offsetTop = 0;
                        } else if (layer.config.offset === 'r') {
                            offsetLeft = doc[0] - area[0];
                        } else if (layer.config.offset === 'b') {
                            offsetTop = doc[1] - area[1];
                        } else if (layer.config.offset === 'l') {
                            offsetLeft = 0;
                        } else if (layer.config.offset === 'lt') {
                            offsetTop = 0;
                            offsetLeft = 0;
                        } else if (layer.config.offset === 'lb') {
                            offsetTop = doc[1] - area[1];
                            offsetLeft = 0;
                        } else if (layer.config.offset === 'rt') {
                            offsetTop = 0;
                            offsetLeft = doc[0] - area[0];
                        } else if (layer.config.offset === 'rb') {
                            offsetTop = doc[1] - area[1];
                            offsetLeft = doc[0] - area[0];
                        } else {
                            offsetTop = layer.config.offset;
                        }
                    }

                    if (!layer.config.fixed) {
                        // 非fixed布局
                    }

                    layerInstance.$el.style.top = offsetTop + 'px';
                    layerInstance.$el.style.left = offsetLeft + 'px';
                }

                let LayerConstructor = Vue.extend(Layer);
                let layerInstance = new LayerConstructor({
                    el: document.createElement('div'),
                    data: {
                        title: layer.config.title,
                        content: layer.config.content,
                        type: layer.config.type,
                        closeBtn: layer.config.closeBtn
                    },
                    mixins: [
                        {
                            data() {
                                return layer.config;
                            }
                        }
                    ]
                });

                let MaskConstructor = Vue.extend(Mask);
                let maskInstance = new MaskConstructor({
                    el: document.createElement('div'),
                    data: {
                        shade: layer.config.shade
                    }
                });
                document.body.appendChild(maskInstance.$el);

                execOpenAnim();

                document.body.appendChild(layerInstance.$el);

                setLayerOffset();

                layerInstance.$on('clickYes', () => {
                    layer.config.yes && layer.config.yes();

                    execCloseAnim();
                });
                layerInstance.$on('clickCancel', () => {
                    execCloseAnim();
                });
            }
        };
    }
};
