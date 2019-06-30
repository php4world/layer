import Mask from './components/mask.vue';
import Layer from './components/layer.vue';

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
                shadeClose: false,
                fixed: true,
                move: '.php4world-layer-title',
                title: '&#x4FE1;&#x606F;',
                offset: 'auto',
                area: 'auto',
                btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
                btnAlign: 'r',
                closeBtn: 1,
                time: 0, // 0表示不自动关闭
                zIndex: 19920215,
                maxWidth: 360,
                anim: 0,
                isOutAnim: true,
                icon: -1,
                moveType: 1,
                moveOut: false,
                resize: true,
                scrollbar: true, // 是否允许浏览器滚动条
                tips: 2
            }
        };

        let openTimes = 0;
        let openedLayers = [];

        Vue.prototype.$layer = {
            open: (settings = {}) => {
                if (openedLayers.length > 0) {
                    for (var i = 0; i < openedLayers.length; i++) {
                        if (openedLayers[i].maskInstance) {
                            document.body.removeChild(openedLayers[i].maskInstance.$el);
                        }
                        document.body.removeChild(openedLayers[i].layerInstance.$el);
                    }

                    openedLayers = [];
                }

                layer.config.zIndex += openTimes;

                let configs = Object.assign({}, layer.config, settings);

                let LayerConstructor, layerInstance, MaskConstructor, maskInstance;

                function execOpenAnim() {
                    layerInstance.$el.one('animationend', () => {
                        layerInstance.$el.classList.remove('layer-anim', 'layer-anim-0' + configs.anim);
                    });
                    layerInstance.$el.classList.add('layer-anim', 'layer-anim-0' + configs.anim);
                }

                function execCloseAnim() {
                    layerInstance.$el.one('animationend', () => {
                        layerInstance.$el.classList.remove('layer-anim-close');

                        document.body.removeChild(layerInstance.$el);
                    });
                    layerInstance.$el.classList.add('layer-anim-close');

                    if (configs.shade) {
                        document.body.removeChild(maskInstance.$el);
                    }

                    if (configs.scrollbar === false) {
                        document.documentElement.style.overflow = '';
                    }

                    configs.end && configs.end();

                    openedLayers = [];
                }

                function setLayerOffset() {
                    let area = [layerInstance.$el.offsetWidth, layerInstance.$el.offsetHeight];
                    let doc = [document.documentElement.clientWidth, document.documentElement.clientHeight];
                    let type = typeof configs.offset === 'object';

                    let offsetTop = (doc[1] - area[1]) / 2;
                    let offsetLeft = (doc[0] - area[0]) / 2;

                    if (type) {
                        offsetTop = configs.offset[0];
                        offsetLeft = configs.offset[1];
                    } else if (configs.offset !== 'auto') {
                        if (configs.offset === 't') {
                            offsetTop = 0;
                        } else if (configs.offset === 'r') {
                            offsetLeft = doc[0] - area[0];
                        } else if (configs.offset === 'b') {
                            offsetTop = doc[1] - area[1];
                        } else if (configs.offset === 'l') {
                            offsetLeft = 0;
                        } else if (configs.offset === 'lt') {
                            offsetTop = 0;
                            offsetLeft = 0;
                        } else if (configs.offset === 'lb') {
                            offsetTop = doc[1] - area[1];
                            offsetLeft = 0;
                        } else if (configs.offset === 'rt') {
                            offsetTop = 0;
                            offsetLeft = doc[0] - area[0];
                        } else if (configs.offset === 'rb') {
                            offsetTop = doc[1] - area[1];
                            offsetLeft = doc[0] - area[0];
                        } else {
                            offsetTop = configs.offset;
                        }
                    }

                    if (!configs.fixed) {
                        // 非fixed布局
                    }

                    layerInstance.$el.style.top = offsetTop + 'px';
                    layerInstance.$el.style.left = offsetLeft + 'px';
                }

                LayerConstructor = Vue.extend(Layer);
                layerInstance = new LayerConstructor({
                    el: document.createElement('div'),
                    data: configs
                });
                layerInstance.$el.id = `php4world-layer${openTimes}`;
                layerInstance.$el.times = openTimes;

                if (configs.shade) {
                    MaskConstructor = Vue.extend(Mask);
                    maskInstance = new MaskConstructor({
                        el: document.createElement('div'),
                        data: {
                            shade: configs.shade,
                            shadeClose: configs.shadeClose,
                            zIndex: configs.zIndex - 1
                        }
                    });
                    maskInstance.$el.id = `php4world-layer-shade${openTimes}`;
                    maskInstance.$el.times = openTimes;
                    document.body.appendChild(maskInstance.$el);

                    maskInstance.$once('onShadeClose', () => {
                        configs.cancel && configs.cancel();

                        execCloseAnim();
                    });

                    maskInstance.$el.one('click', () => {
                        console.log('clicked');
                    });
                }

                if (configs.scrollbar === false) {
                    document.documentElement.style.overflow = 'hidden';
                }

                execOpenAnim();

                document.body.appendChild(layerInstance.$el);

                setLayerOffset();

                configs.success && configs.success();

                if (configs.btn !== false) {
                    if (typeof configs.btn === 'string') {
                        configs.btn = [configs.btn];
                    }

                    configs.btn.forEach((b, i) => {
                        layerInstance.$once(`onLayerBtn${i + 1}`, () => {
                            if (i === 0) {
                                configs.yes && configs.yes();
                            } else {
                                configs[`btn${i + 1}`] && configs[`btn${i + 1}`]();
                            }

                            execCloseAnim();
                        });
                    });
                }

                openedLayers.push({layerInstance, maskInstance});

                layerInstance.$once('onLayerCancel', () => {
                    configs.cancel && configs.cancel();

                    execCloseAnim();
                });

                if (configs.time > 0) {
                    setTimeout(() => {
                        execCloseAnim();
                    }, configs.time);
                }

                openTimes += 2;
            }
        };
    }
};
