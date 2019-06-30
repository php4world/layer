import Mask from './components/mask.vue';
import Layer from './components/layer.vue';

export default {
    install(Vue, options) {
        // 实例池
        let instancesPool = [];

        const layer = {
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
            }
        };
    }
};
