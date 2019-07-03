import Vue from 'vue';
import App from './App.vue';

// import Layer from '@php4world/layer';
import Layer from '../source';
import './bootstrap.min.css';

Vue.config.productionTip = false;

Vue.use(Layer, {
    // shade: 0
});

new Vue({
    render: h => h(App)
}).$mount('#app');
