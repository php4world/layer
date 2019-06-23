import Mask from './components/mask.vue';
import Layer from './components/alert.vue';

export default {
    install(Vue, options) {
        Vue.prototype.$layer = {
            alert: function(settings = {}) {
                let MaskConstructor = Vue.extend(Mask);
                let MaskInstance = new MaskConstructor({
                    el: document.createElement('div')
                });
                document.body.appendChild(MaskInstance.$el);

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

                    document.body.removeChild(MaskInstance.$el);
                    layerInstance.$el.classList.add('layer-anim-close');
                });
            }
        };
    }
};
