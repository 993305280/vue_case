<template>
    <div>
        <div id="cue" ref="cueBox" >还没有商品哦，去添加添加吧</div>
        <div class="mui-card" v-for="(item,i) in goodsCartData" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="goodsBox">
                        <mt-switch v-model="$store.getters.getGoodsSeleted[item.id]" @change="changeSeleted(item.id, $store.getters.getGoodsSeleted[item.id])"></mt-switch>
                        <div class="goodsIconPhoto">
                            <img :src="item.thumb_path" alt="">
                        </div>
                        <div class="goodsInfo">
                            <div class="goodsTitle">{{item.title}}</div>
                            <div class="goodsNum">
                                <div class="goodsPrice">￥{{item.sell_price}}</div>
                                <number :countValue="$store.getters.getGoodsCount[item.id]" :id = "item.id"></number>
                                <div class="deleteBox" @click.prevent="deleteGoods(item.id,i)">删除</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <!--页眉，放置标题-->
            <!-- <div class="mui-card-header"></div> -->
            <div class="mui-card-content">
                <div class="mui-card-content-inner bottomBox">
                    <div class="goodsWord">
                        <p>总结(不含运费)</p>
                        <p>已勾选商品 <span>{{$store.getters.getGoodsPrice.count}}</span> 件,总价: <span>￥{{$store.getters.getGoodsPrice.priceNum}}</span></p>
                    </div>
                    <mt-button type="danger" size="small">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import number from '../chileComponents/numberBox.vue'
export default {
    data() {
        return {
 
            goodsCartData:[]
        }
    },
    methods: {
        getCartData() {
            var goodsId = []
            this.$store.state.car.forEach(item => {
                goodsId.push(item.id)
            });
            if (goodsId.length <= 0) {
                return;
            }
            this.$axios.get('/api/goods/getshopcarlist/' + goodsId.join(',')).then( res => {
                if (res.status === 200) {
                    this.goodsCartData = res.data.message
                } else {
                    alert('获取数据失败')
                }
                
                // console.log(res)
            })
        },
        deleteGoods(id,i) {
            this.goodsCartData.splice(i, 1);
            this.$store.commit('deleteStoreCar', id)
        },
        changeSeleted(id, val) {
            this.$store.commit('setGoodsSeleted', {id, seleted:val});
        }
    },
    components:{
        number
    },
    created() {
        this. getCartData()
    },
    watch: {
        goodsCartData(newval ,oldval) {
            if(newval.length > 0) {
                this.$refs.cueBox.style.display = 'none'
            }else {
                this.$refs.cueBox.style.display = 'block'

            }
            
        }
    }
    
    
}
</script>
<style lang="scss" scoped>
.mui-card {
    box-shadow: 0 0px 3px rgba(0,0,0,.4);
}
    
#cue {
    margin: 50px 0;
    text-align: center;
    font-size: 25px;
    line-height: normal;
}
.goodsBox {
    display: flex;
    // justify-content: space-between;
    align-content: center;
    .goodsIconPhoto {
        margin: 0 8px;
        display: flex;
        align-items: center;
        img {
            width: 44px;
            height: 44px;
        }
        
    }
    .goodsInfo {
        flex: 1;
        .goodsTitle {
            font-size: 13px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 2px;
            // white-space: nowrap;

            
        }
        // display: flex;
        .goodsNum {
            display: flex;
            align-items: center;
            justify-content: space-between;
           
            .goodsPrice {
                color: red;
            }
            .deleteBox {
                color: blue;
            }
        }
    }
}
.bottomBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .goodsWord {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        span {
            color: red;
            font-weight: bold;
            font-size: 17px;
        }
    }
}
    
</style>