<template>
    <div>
        <transition @before-enter = "beforeEnter" @enter = "enter" @after-enter = "afterEnter">
            <div class="isBall" v-show="ballMsg" ref="isBall"></div>
        </transition>
        
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :swiperData="swiperData" :photoWidth = 'false'></swiper>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">{{goodsInfodata.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="goodsPrice">
                        <span class="oldPrice">市场价:<span id="oldPriceNum">￥{{goodsInfodata.market_price}}</span></span>
                        <span class="newPrice">销售价:<span id="newPriceNum">￥{{goodsInfodata.sell_price}}</span></span>
                    </div>
                    <div class="goodsBugNum">
                        购买数量: <number @setNumberValue = 'gainNumberValue' :max="goodsInfodata.stock_quantity"></number>
                    </div>
                    <div class="goodsBtn">
                        <mt-button size = "normal" type="primary">立即购买</mt-button>
                        <mt-button size = "normal" type="danger" @click="showBall">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header" >商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsInfodata.goods_no}}</p>
                    <p>库存情况:{{goodsInfodata.stock_quantity}}件</p>
                    <p>上架时间:{{goodsInfodata.add_time | dataFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button size = "large" type = "primary" plain @click="goGoodsDetailInfo(goodsInfodata.id)">图文介绍</mt-button>
                <mt-button size = "large" type = "danger" plain id="goodsComment" @click="goGoodsComment(goodsInfodata.id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import swiper from '../chileComponents/swiper.vue'
import number from '../chileComponents/goodsDetailNumbox.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,
            swiperData:[],
            goodsInfodata:[],
            ballMsg:false,
            numberValue:1 //获取number传过来的到购买数量
        }
    },
    methods: {
        //获取swiper数据
        getGoodsPhotoData() {
            this.$axios.get('/api/getthumimages/' + this.id).then(res => {
                if (res.status === 200) {
                    res.data.message.forEach(item => {
                        item.img = item.src
                        
                    });
                    this.swiperData = res.data.message
                }
                // console.log(res)
            })
        },
        getGoodsInfo() {
            this.$axios.get('/api/goods/getinfo/' + this.id).then(res => {
                if (res.status === 200) {
                    this.goodsInfodata = res.data.message[0]
                }
                // console.log(res)
            })
        },
        goGoodsDetailInfo(id) {
            this.$router.push(`/home/goodsDetailInfo/${id}`)
        },
        goGoodsComment(id) {
            this.$router.push('/home/goodsComment/' + id)
        },
        showBall() {
            this.ballMsg = !this.ballMsg;
            var carGoods = {id:this.id, price:this.goodsInfodata.sell_price, count:this.numberValue, seleted:true};

            this.$store.commit('setCount', carGoods)
        },
        beforeEnter (el){
           
            el.style.transform = 'translate(0,0)';
        },
        enter(el,done) {
            const cart = document.getElementById('isBadge');
            const ball = this.$refs.isBall
            const ballY = ball.getBoundingClientRect().top;
            const ballX = ball.getBoundingClientRect().left;
            const cartY = cart.getBoundingClientRect().top;
            const cartX = cart.getBoundingClientRect().left;
            const X = cartX - ballX;
            const Y = cartY - ballY;
  
            el.offsetWidth;
            el.style.transform = `translate(${X}px , ${Y}px)`;
            el.style.transition = 'all .6s ease-in-out';
            done();
        },
        afterEnter(el) {
            this.ballMsg = !this.ballMsg;
        },
        gainNumberValue(count) {
            this.numberValue = count;
            console.log(count)
        }
    },
    created() {
        this.getGoodsPhotoData();
        this.getGoodsInfo()
        // console.log(this.numberValue)
    },
    components:{
        swiper,
        number
    }
}
</script>
<style lang="scss" scoped>
.mui-card {
    min-height: 130px;
    box-shadow: 0 0px 3px rgba(0,0,0,.4);
}
.mui-card-header {
    font-weight: 400;
}
.oldPrice {
    #oldPriceNum {
        color: #b3acac;
        text-decoration: line-through;
    }
    
}
.newPrice {
    margin-left: 10px;
    #newPriceNum {
        color: #E61414;
        font-size: 16px;
    }
}
.goodsBugNum {
    margin: 8px 0;
    // position: relative;
}
.isBall {
    position: absolute;
    left: 143px;
    top: 397px;
    z-index: 999;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;

}
.mui-card-footer {
    display: block;
    #goodsComment {
        margin-top: 10px;
    }
}
    
</style>