import Mask from './components/mask.vue';
import Layer from './components/layer.vue';
import './prototype';

export default {
    install(Vue, options) {
        // 实例池
        let instances = {};
        // 版本号
        const version = '0.0.1';
        // 默认配置
        const defConf = {
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
            time: 0,
            zIndex: 19920215,
            maxWidth: 360,
            anim: 0,
            isOutAnim: true,
            icon: -1,
            moveType: 1,
            moveOut: false,
            resize: true,
            scrollbar: true,
            tips: 2
        };
        // 设置位置
        function offset(el, settings) {
            let area = [el.offsetWidth, el.offsetHeight];
            let type = typeof settings.offset === 'object';

            let offsetTop = (document.documentElement.clientHeight - area[1]) / 2;
            let offsetLeft = (document.documentElement.clientWidth - area[0]) / 2;

            if (type) {
                offsetTop = settings.offset[0];
                offsetLeft = settings.offset[1];
            } else if (settings.offset !== 'auto') {
                if (settings.offset === 't') {
                    offsetTop = 0;
                } else if (settings.offset === 'r') {
                    offsetLeft = document.documentElement.clientWidth - area[0];
                } else if (settings.offset === 'b') {
                    offsetTop = document.documentElement.clientHeight - area[1];
                } else if (settings.offset === 'l') {
                    offsetLeft = 0;
                } else if (settings.offset === 'lt') {
                    offsetTop = 0;
                    offsetLeft = 0;
                } else if (settings.offset === 'lb') {
                    offsetTop = document.documentElement.clientHeight - area[1];
                    offsetLeft = 0;
                } else if (settings.offset === 'rt') {
                    offsetTop = 0;
                    offsetLeft = document.documentElement.clientWidth - area[0];
                } else if (settings.offset === 'rb') {
                    offsetTop = document.documentElement.clientHeight - area[1];
                    offsetLeft = document.documentElement.clientWidth - area[0];
                } else {
                    offsetTop = settings.offset;
                }
            }

            if (!settings.fixed) {
                // todo 非fixed布局
            }

            el.style.top = offsetTop + 'px';
            el.style.left = offsetLeft + 'px';
        }
        // 打开动画
        function animOpen(el, anim) {
            el.one('animationend', () => {
                el.classList.remove('layer-anim', `layer-anim-0${anim}`);
            });
            el.classList.add('layer-anim', `layer-anim-0${anim}`);
        }

        document.onmousemove = (e) => {
            for (let prop in instances) {
                if (instances[prop].layer.drag.canMove) {
                    let moveX = e.clientX - instances[prop].layer.drag.mx;
                    let moveY = e.clientY - instances[prop].layer.drag.my;
                    let rPos = document.documentElement.clientWidth - instances[prop].layer.$el.offsetWidth;
                    let bPos = document.documentElement.clientHeight - instances[prop].layer.$el.offsetHeight;
                    if (!instances[prop].layer.moveOut) {
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
                    instances[prop].layer.$el.style.left = moveX + 'px';
                    instances[prop].layer.$el.style.top = moveY + 'px';
                }
                if (instances[prop].layer.drag.canResize) {
                    let resizeX = instances[prop].layer.drag.rw + (e.clientX - instances[prop].layer.drag.rx);
                    let resizeY = instances[prop].layer.drag.rh + (e.clientY - instances[prop].layer.drag.ry);
                    if (resizeX < 260) {
                        resizeX = 260;
                    }
                    if (resizeY < 148) {
                        resizeY = 148;
                    }
                    instances[prop].layer.$el.style.width = resizeX + 'px';
                    instances[prop].layer.$el.style.height = resizeY + 'px';
                    instances[prop].layer.$el.querySelector('.php4world-layer-content').style.height = resizeY - 42 - 42 + 'px';
                }
            }
        };
        document.onmouseup = () => {
            for (let prop in instances) {
                instances[prop].layer.drag.canMove = false;
                instances[prop].layer.drag.canResize = false;
            }
        };

        Vue.prototype.$layer = {
            version: version,
            index: -1,
            open(settings = {}) {
                let config = Object.assign({}, defConf, settings);
                let instance = {};

                this.index += 1;

                config.zIndex += this.index * 2;

                instance.layer = new (Vue.extend(Layer))({
                    el: document.createElement('div'),
                    data: {
                        ...config,
                        index: this.index,
                        drag: {
                            mx: 0,
                            my: 0,
                            rx: 0,
                            ry: 0,
                            rw: 0,
                            rh: 0,
                            canMove: false,
                            canResize: false
                        }
                    },
                    mounted() {
                        let moveElem, resizeElem;

                        if (this.move !== false) {
                            moveElem = this.$el.querySelector(this.move);
                            moveElem.style.cursor = 'move';

                            moveElem.onmousedown = (e) => {
                                e.preventDefault();

                                this.drag.mx = e.clientX - parseFloat(this.$el.offsetLeft);
                                this.drag.my = e.clientY - parseFloat(this.$el.offsetTop);

                                this.drag.canMove = true;
                            };
                        }
                        if (this.resize !== false) {
                            resizeElem = this.$el.querySelector('.php4world-layer-resize');

                            resizeElem.onmousedown = (e) => {
                                e.preventDefault();

                                this.drag.rw = this.$el.offsetWidth;
                                this.drag.rh = this.$el.offsetHeight;
                                this.drag.rx = e.clientX;
                                this.drag.ry = e.clientY;

                                this.drag.canResize = true;
                            };
                        }
                    }
                });

                if (config.shade) {
                    instance.mask = new (Vue.extend(Mask))({
                        el: document.createElement('div'),
                        data: config
                    });

                    document.body.appendChild(instance.mask.$el);
                }

                animOpen(instance.layer.$el, config.anim);

                document.body.appendChild(instance.layer.$el);

                offset(instance.layer.$el, config);

                // 弹出成功回调
                config.success && config.success();

                // 按钮事件
                if (config.btn !== false) {
                    if (typeof config.btn === 'string') {
                        config.btn = [config.btn];
                    }

                    config.btn.forEach((b, i) => {
                        instance.layer.$once(`emitLayerBtn${i + 1}`, (index) => {
                            if (i === 0) {
                                config.yes && config.yes();
                            } else {
                                config[`btn${i + 1}`] && config[`btn${i + 1}`]();
                            }

                            this.close(index);
                        });
                    });
                }

                // 关闭按钮事件
                instance.layer.$once('emitLayerCancel', (index) => {
                    config.cancel && config.cancel();

                    this.close(index);
                });

                // 自动关闭
                if (config.time > 0) {
                    setTimeout(() => {
                        this.close(this.index);
                    }, config.time);
                }

                // 把实例存入对象池中
                instances[this.index] = instance;

                return this.index;
            },
            close(index) {
                function destroy() {
                    if (instances[index].mask) {
                        document.body.removeChild(instances[index].mask.$el);
                    }

                    if (instances[index].layer.scrollbar === false) {
                        document.documentElement.style.overflow = '';
                    }

                    instances[index].layer.end && instances[index].layer.end();

                    delete instances[index];
                }

                if (instances[index].layer.isOutAnim) {
                    // 关闭动画
                    instances[index].layer.$el.one('animationend', () => {
                        document.body.removeChild(instances[index].layer.$el);

                        destroy();
                    });
                    instances[index].layer.$el.classList.add('layer-anim-close');
                } else {
                    document.body.removeChild(instances[index].layer.$el);

                    destroy();
                }
            }
        };
    }
};
