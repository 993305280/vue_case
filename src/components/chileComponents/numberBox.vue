<template>
    <div id="numberBox">
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" :value="countValue" @change="monitorValue" ref="numboxEl" readonly/>
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
            this.$store.commit('setCartCount', { id:this.id , count:this.$refs.numboxEl.value })
        }
    },
    mounted() {
        mui('.mui-numbox').numbox();
        // console.log(this.$refs.numboxEl.value)
    },
    props:['countValue','id']
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