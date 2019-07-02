import './prototype';
import './assets/scss/default.scss';
import Layer from './layer.vue';
import Shade from './shade.vue';

export default {
    install(Vue, options) {
        // 实例池
        // let instances = {};
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
            icon: '',
            content: '',
            btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
            btnAlign: 'r',
            closeBtn: 2,
            zIndex: 19920215,
            maxWidth: 360
        }, options);

        Vue.prototype.$layer = {
            version: version,
            index: -1,
            open(opts = {}) {
                let instance = {};
                let config = Object.assign({}, defConf, opts);

                this.index += 1;

                config.zIndex += this.index * 2;

                instance.layer = new (Vue.extend(Layer))({
                    el: document.createElement('div'),
                    data: {
                        ...config,
                        index: this.index,
                        drag: {mx: 0, my: 0, rx: 0, ry: 0, rw: 0, rh: 0, canMove: false, canResize: false}
                    }
                });

                if (config.shade) {
                    instance.shade = new (Vue.extend(Shade))({
                        el: document.createElement('div'),
                        data: config
                    });

                    document.body.appendChild(instance.shade.$el);
                }

                document.body.appendChild(instance.layer.$el);
            }
        };
    }
};
