<template>
    <div>
        <ul class="goodsBox">
            <li v-for="item in goodsData" :key="item.id" @click="goGoodsDetail(item.id)">
                <div>
                    <img :src="item.img_url" alt="">
                </div>
                <div class="goodsInfo">
                    <div class="goodsTitle">
                        {{item.title}}
                    </div>
                    <div class="goodsPrice">
                        <div class="goodsOldPrice">{{'￥'+item.market_price}}</div>
                        <div class="goodsNewNum">
                            <span id="goodsNewPrice">￥<em>{{item.sell_price}}</em></span>
                            <span id="goodsBugNum">剩{{item.stock_quantity}}件</span>
                        </div>
                    </div>
                </div>
            </li>
            
        </ul>
        <mt-button type="danger" size="large" plain class="moreGoodsBtn" @click="getMoreGoodsData">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            pageNum:1,
            goodsData:[]
        }
    },
    methods: {
        //获取商品列表
        getGoodsListData() {
            this.$axios.get('/api/getgoods?pageindex=' + this.pageNum).then(res => {
                if (res.status === 200) {
                    if (res.data.message.length === 0) {
                        Toast('已没有更多了')
                    }
                    this.goodsData = this.goodsData.concat(res.data.message) 
                }else {
                    Toast('商品加载失败!')
                }
                // console.log(res)
            })
        },
        //加载更多商品数据
        getMoreGoodsData() {
            this.pageNum ++
            this.getGoodsListData()
        },
        //去商品的详细页面
        goGoodsDetail(id) {
            this.$router.push('/home/goodsDetail/' + id)
        }
    },
    created() {
        this.getGoodsListData()
    }
}
</script>
<style lang="scss" scoped>
    .goodsBox {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
        padding: 0 3px;
        flex-wrap: wrap;
        li {
            width: 49%;
            box-shadow: 0 0 2px rgba(0,0,0,.23);
            margin-top: 6px;
            img {
                display: block;
                width: 100%;
                min-height: 130px;
                }
            .goodsInfo {
                height: 93px;
                display: flex;
                flex-flow: column;
                justify-content: space-between;
                padding: 0 3px;
                .goodsTitle {
                    font-size: 13px;
                    color: #333;
                    text-overflow: ellipsis;
                }
                .goodsPrice {
                    
                    .goodsOldPrice {
                        font-size: 12px;
                        color: #ccc;
                        text-decoration: line-through;
                    }
                    .goodsNewNum {
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                        #goodsNewPrice {
                            color: #E61414;
                            em {
                                font-size: 20px;
                                font-style: normal;
                            }
                        }
                        #goodsBugNum {
                            color: #999999;

                        }
                    }
                }
            }
            
        }
    }
    .moreGoodsBtn {
        margin: 7px 0;
    }
    
</style>