import Vue from 'vue';
import App from './App.vue';

import Layer from '@php4world/layer';

Vue.config.productionTip = false;

Vue.use(Layer);

new Vue({
    render: h => h(App)
}).$mount('#app');
