import './prototype';
import './assets/scss/default.scss';
import Layer from './layer.vue';
import Shade from './shade.vue';
import Move from './move.vue';

export default {
    install(Vue, options) {
        // 实例池
        let instances = {};
        // 版本号
        const version = '1.0.0';
        // 默认配置
        const defConf = Object.assign({}, {
            type: 0,
            shade: 0.3,
            shadeClose: false,
            fixed: true,
            move: '.vue-layer-title',
            moveOut: false,
            resize: true,
            anim: 0,
            outAnim: true,
            scrollbar: true,
            time: 0,
            area: 'auto',
            offset: 'auto',
            title: '&#x4FE1;&#x606F;',
            icon: -1,
            content: '',
            btn: '',
            btnAlign: 'r',
            minBtn: false,
            maxBtn: false,
            closeBtn: 1,
            zIndex: 19920215,
            maxWidth: 360,
            tips: 2,
            tipsMore: false
        }, options);

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
                offsetTop = /%$/.test(offsetTop) ? document.documentElement.clientHeight * (parseFloat(offsetTop) / 100) : parseFloat(offsetTop);
                offsetLeft = /%$/.test(offsetLeft) ? document.documentElement.clientWidth * (parseFloat(offsetLeft) / 100) : parseFloat(offsetLeft);
                offsetTop += document.documentElement.scrollTop;
                offsetLeft += document.documentElement.scrollLeft;
            }

            el.style.top = offsetTop + 'px';
            el.style.left = offsetLeft + 'px';
        }
        // 打开动画
        function animOpen(el, anim) {
            el.one('animationend', () => {
                el.classList.remove('vue-layer-anim', `vue-layer-anim-0${anim}`);
            });
            el.classList.add('vue-layer-anim', `vue-layer-anim-0${anim}`);
        }

        // 插入事件层
        const moveEventLayer = new (Vue.extend(Move))({
            el: document.createElement('div')
        });
        document.body.appendChild(moveEventLayer.$el);

        moveEventLayer.$el.onmousemove = (e) => {
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

                    let btnH = 46;
                    let titleH = 42;
                    if (!instances[prop].layer.btn) {
                        btnH = 0;
                    }
                    if (!instances[prop].layer.title) {
                        titleH = 0;
                    }
                    if (instances[prop].layer.type === 2) {
                        instances[prop].layer.$el.querySelector('.vue-layer-content').firstChild.style.height = resizeY - titleH - btnH + 'px';
                    } else {
                        instances[prop].layer.$el.querySelector('.vue-layer-content').style.height = resizeY - titleH - btnH + 'px';
                    }
                }
            }
        };
        moveEventLayer.$el.onmouseup = () => {
            moveEventLayer.$el.style.display = 'none';
            for (let prop in instances) {
                instances[prop].layer.drag.canMove = false;
                instances[prop].layer.drag.canResize = false;
            }
        };

        // layer 方法
        Vue.prototype.$layer = {
            v: version,
            index: -1,
            open(opts = {}) {
                let instance = {};

                if (opts.type === 0 && Object.prototype.toString.call(opts.btn) === '[object Undefined]') {
                    opts.btn = '确定';
                }
                let config = Object.assign({}, defConf, opts);

                this.index += 1;

                config.zIndex += this.index * 2;

                instance.layer = new (Vue.extend(Layer))({
                    el: document.createElement('div'),
                    data: {
                        ...config,
                        index: this.index,
                        drag: {mx: 0, my: 0, rx: 0, ry: 0, rw: 0, rh: 0, canMove: false, canResize: false}
                    },
                    mounted() {
                        let moveElem, resizeElem;

                        if (this.move && this.type < 2) {
                            moveElem = this.$el.querySelector(this.move);

                            if (moveElem) {
                                moveElem.style.cursor = 'move';

                                moveElem.onmousedown = (e) => {
                                    e.preventDefault();

                                    moveEventLayer.$el.style.display = 'block';
                                    moveEventLayer.$el.style.cursor = 'move';

                                    this.drag.mx = e.clientX - parseFloat(this.$el.offsetLeft);
                                    this.drag.my = e.clientY - parseFloat(this.$el.offsetTop);

                                    this.drag.canMove = true;
                                };
                            }
                        }
                        if (this.resize && this.type < 2) {
                            resizeElem = this.$el.querySelector('.vue-layer-resize');

                            resizeElem.onmousedown = (e) => {
                                e.preventDefault();

                                moveEventLayer.$el.style.display = 'block';
                                moveEventLayer.$el.style.cursor = 'se-resize';

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
                    instance.shade = new (Vue.extend(Shade))({
                        el: document.createElement('div'),
                        data: {
                            ...config,
                            index: this.index
                        }
                    });

                    document.body.appendChild(instance.shade.$el);

                    instance.shade.$once('close', (index) => {
                        this.close(index);
                    });
                }

                animOpen(instance.layer.$el, config.anim);

                document.body.appendChild(instance.layer.$el);

                offset(instance.layer.$el, config);

                // 弹出成功回调
                config.success && config.success();

                // 按钮事件
                if (config.btn) {
                    if (Object.prototype.toString.call(config.btn) === '[object String]') {
                        config.btn = [config.btn];
                    }

                    if (Object.prototype.toString.call(config.btn) === '[object Array]') {
                        config.btn.forEach((b, i) => {
                            instance.layer.$once(`btn${i + 1}`, (index) => {
                                if (i === 0) {
                                    config.yes && config.yes();
                                } else {
                                    config[`btn${i + 1}`] && config[`btn${i + 1}`]();
                                }

                                this.close(index);
                            });
                        });
                    }
                }

                // 关闭按钮事件
                instance.layer.$once('close', (index) => {
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

                return [this.index];
            },
            close(index) {
                function destroy() {
                    if (instances[index].shade) {
                        document.body.removeChild(instances[index].shade.$el);
                    }

                    if (instances[index].layer.scrollbar === false) {
                        document.documentElement.style.overflow = '';
                    }

                    instances[index].layer.end && instances[index].layer.end();

                    delete instances[index];
                }

                if (instances[index].layer.outAnim) {
                    // 关闭动画
                    instances[index].layer.$el.one('animationend', () => {
                        document.body.removeChild(instances[index].layer.$el);

                        destroy();
                    });
                    instances[index].layer.$el.classList.add('vue-layer-close-anim');
                } else {
                    document.body.removeChild(instances[index].layer.$el);

                    destroy();
                }
            }
        };
    }
};
