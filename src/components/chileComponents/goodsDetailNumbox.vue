<template>
    <div id="numberBox">
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" value="1" @change="monitorValue" ref="numberValue"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>
<script>
import mui from '@/assets/mui/js/mui.min.js'

export default {
    data() {
        return {

        }
    },
    methods: {
        monitorValue() {
            let numberValue =  this.$refs.numberValue.value
            this.$emit('setNumberValue', numberValue)
            mui('.mui-numbox').numbox().setOption('max', this.max);
        }
    },
    mounted() {
        mui('.mui-numbox').numbox();
    },
    props:['max']
}
</script>
<style lang="scss" scoped>
#numberBox {
    display: inline-block;
}
.mui-numbox {
    height: 29px;
}
    
</style>