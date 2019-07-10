import Layer from '../../source/index.js';
import './bootstrap.min.css';

export default ({
    Vue,
    options,
    router,
    siteData
}) => {
    Vue.use(Layer);
};
