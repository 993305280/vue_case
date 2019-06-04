<template>
    <div>
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in photoListData" :key="item.id" @click="getPhotoDetailData(item.id)">
                    {{item.title}}
                </a>
            </div>
        </div>
        <ul class="photoDetail">
            <router-link :to="'/home/photoDetail/' + item.id" tag="li" v-for="item in photoDetailList" :key="item.id">
                <img v-lazy="item.img_url" class="photoList">
                <div class="photoInfo">
                    <p id="pOne">{{item.title}}</p>
                    <p v-html="item.zhaiyao" id="pTwe"></p>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
import mui from '@/assets/mui/js/mui.min.js'
export default {
    data() {
        return {
            photoListData:[],
            photoDetailList:[]
        }
    },
    methods: {
        //获取图片分类
        getPhotoListData() {
            var first = {
                        id:0,
                        title:'全部'
                    }
            this.$axios.get('/api/getimgcategory').then( res => {
                if (res.status === 200) {
                    this.photoListData = res.data.message;
                    
                    this.photoListData.unshift(first)

                }
                // console.log(res.data.message)
            })
        },
        //获取图片详情
        getPhotoDetailData(id) {
            this.$axios.get('/api/getimages/' + id).then( res => {
                this.photoDetailList = res.data.message
                // console.log(res)
            })
        }
    }, 
    created() {
        this.getPhotoListData()
        this.getPhotoDetailData(0)
    },
    mounted() {
        //mui的区域滚动js
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }
}
</script>

<style lang="scss" scoped>

    * {
        touch-action: pan-y;
    }

.photoDetail {
    margin: 0;
    padding: 10px;
    list-style: none; 
    li {
        // background-color: #ccc;
        text-align: center;
        margin-bottom: 11px;
        box-shadow: 0 0 9px #999;
        position: relative;
        // padding: 0 5px;
        // height: 300px;
        img {
            width: 100%;
            min-height: 300px;
            vertical-align: middle;
        }
        img [lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .photoInfo {
            width: 100%;
            position: absolute;
            bottom: 0;
            background-color: rgba(0,0,0,.5);
            text-align: left;
            max-height: 130px;
            overflow: hidden;
            text-overflow: ellipsis;
            p {
                margin:0;
            }
            #pOne {
                font-size: 15px;
                color: white;
                font-weight: 700;
                text-overflow: ellipsis;
            }
            #pTwe {
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #ccc;
            }
            
        }
    }
} 
    
</style>