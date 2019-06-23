import Vue from 'vue';
import App from './App.vue';
// import vlayer from './plugin/test/vlayer';

import Layer from './plugin/layer';

Vue.config.productionTip = false;

// Vue.use(vlayer);
Vue.use(Layer);

new Vue({
    render: h => h(App)
}).$mount('#app');
