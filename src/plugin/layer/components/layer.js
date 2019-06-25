export default {
    data() {
        return {
            title: '&#x4FE1;&#x606F;',
            content: '',
            type: ['dialog', 'page', 'iframe', 'loading', 'tips'],
            typeIndex: 0
        };
    },
    computed: {
        layerTypeClass: function() {
            return `php4world-layer-${this.type[this.typeIndex]}`;
        }
    },
    methods: {
        yes() {
            this.$emit('clickYes');
        }
    },
    render(h) {
        // <div class="php4world-layer" :class="layerTypeClass"></div>
        return h('div', {
            staticClass: 'php4world-layer',
            class: this.layerTypeClass
        });
    }
};
