import Vue from 'vue';
import App from './App.vue';

import Layer from './plugin/layer/entry';

Vue.config.productionTip = false;

Vue.use(Layer);

new Vue({
    render: h => h(App)
}).$mount('#app');
