import Mask from './components/mask.vue';
import Layer from './components/alert.vue';

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
                zIndex: 200000,
                maxWidth: 360,
                anim: 0,
                isOutAnim: true,
                icon: -1,
                moveType: 1,
                resize: true,
                scrollbar: true, // 是否允许浏览器滚动条
                tips: 2
            },
            type: ['dialog', 'page', 'iframe', 'loading', 'tips']
        };

        Vue.prototype.$layer = {
            open: (settings = {}) => {
                Object.assign(layer.config, settings);
                console.log(layer);
            },
            alert: function(settings = {}) {
                let MaskConstructor = Vue.extend(Mask);
                let maskInstance = new MaskConstructor({
                    el: document.createElement('div')
                });
                document.body.appendChild(maskInstance.$el);

                let LayerConstructor = Vue.extend(Layer);
                let layerInstance = new LayerConstructor({
                    el: document.createElement('div')
                });
                layerInstance.title = settings.title || '信息';
                layerInstance.content = settings.content || '';
                document.body.appendChild(layerInstance.$el);

                function showEvent() {
                    layerInstance.$el.removeEventListener('animationend', showEvent);
                    layerInstance.$el.classList.remove('layer-anim', 'layer-anim-00');
                }

                layerInstance.$el.addEventListener('animationend', showEvent);
                layerInstance.$el.classList.add('layer-anim', 'layer-anim-00');

                let docWidth = document.documentElement.clientWidth;
                let docHeight = document.documentElement.clientHeight;
                let layerWidth = layerInstance.$el.offsetWidth;
                let layerHeight = layerInstance.$el.offsetHeight;
                layerInstance.$el.style.top = (docHeight - layerHeight) / 2 + 'px';
                layerInstance.$el.style.left = (docWidth - layerWidth) / 2 + 'px';

                layerInstance.$on('clickYes', () => {
                    function closeEvent() {
                        layerInstance.$el.removeEventListener('animationend', closeEvent);
                        document.body.removeChild(layerInstance.$el);
                    }
                    layerInstance.$el.addEventListener('animationend', closeEvent);

                    document.body.removeChild(maskInstance.$el);
                    layerInstance.$el.classList.add('layer-anim-close');
                });
            }
        };
    }
};
