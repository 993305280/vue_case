<template>
    <div>
        <div>
            <swiper :swiperData="swiperData" :photoWidth = 'true'></swiper>
        </div>
        <div>
             <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <router-link to="/home/newList" tag="li" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
		                    <img src="@/assets/images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></a></router-link>
		            <router-link to="/home/photoList" tag="li" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
		                    <img src="@/assets/images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></a></router-link>
		            <router-link to="/home/goodsList" tag="li" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
		                    <img src="@/assets/images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></a></router-link>
		            <li @click="tellUser" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
		                    <img src="@/assets/images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li @click="tellUser" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
		                    <img src="@/assets/images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li @click="tellUser" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
		                    <img src="@/assets/images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import swiper from '../chileComponents/swiper.vue'
export default {
    data() {
        return {
            swiperData:[]
        }
    },
    created() {
        this.getSwiperData();
    },
    methods: {
        //获取轮播图数据
        getSwiperData() {
            this.$axios.get('/api/getlunbo').then(res => {
                if (res.status === 200 ) {
                    this.swiperData = res.data.message
                } else {
                    Toast('获取数据失败!');
                }
                // console.log(res.data.message)
            })
        },
        tellUser() {
            Toast('没有做哦,去看别的吧！')
        }
    },
    components: {
        swiper
    }
    
}
</script>
<style lang="scss" scoped>
    .mui-grid-view.mui-grid-9 {
        background-color: white;
        .mui-table-view-cell {
            border: none;
            img {
                width: 60px;
                height: 60px;
            }
        }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell.mui-active {
        background-color: white;
    }
</style>