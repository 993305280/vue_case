<template>
    <div>
        <div v-html="goodsInfoData.title" id="goodsTitle"></div>
        <div v-html="goodsInfoData.content" class="goodsContent"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id:this.$route.params.id,
            goodsInfoData:''
        }
    },
    methods: {
        getGoodsInfoData() {
            this.$axios.get(`/api/goods/getdesc/${this.id}`).then(res => {
                if(res.status === 200) {
                    this.goodsInfoData = res.data.message[0]
                } else {
                    alert('获取数据失败!')
                }
                // console.log(res)
            })
        }
    },
    created () {
        this.getGoodsInfoData()
    }
}
</script>
<style lang="scss">
#goodsTitle {
    margin: 23px 0;
    text-align: center;
    font-weight: bold;
    color: #26a2ff;
    padding-bottom: 15px;
    border-bottom: 1px #d4cbcb solid;
}
.goodsContent {
        font-size: 14px;
        margin-top: 0;
        margin-bottom: 10px;
        color: #8f8f94;
        padding: 0 5px;
    .gomeImgLoad {
        width: 100% ;
        height: auto;
        display: block;

    }
    .heise14 {
        font-size: 14px;
        margin-top: 0;
        margin-bottom: 10px;
        color: #8f8f94;
    }
}
    
</style>