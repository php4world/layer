export default {
    template: `<div class="php4world-layer" :class="layerTypeClass"></div>`,
    data() {
        return {
            title: '&#x4FE1;&#x606F;',
            content: '',
            type: 0
        };
    },
    computed: {
        layerTypeClass: function() {
            console.log(this.type);
            return 'php4world-layer-dialog';
        }
    },
    methods: {
        yes() {
            this.$emit('clickYes');
        }
    }
};
