<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swiperData" :key="item.id"><a :href="item.url"><img :src="item.img" :class="{swiper : photoWidth}"></a></mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props:['swiperData','photoWidth']
}
</script>
<style lang="scss" scoped>
.mint-swipe {
        overflow: hidden;
        height: 200px;
        text-align: center;
        img {
            // width: auto;
            height: 100%;
            // vertical-align: middle;
        }
        //解决轮播图宽度冲突问题
        .swiper {
            width: 100%;
        }
    }
    
</style>