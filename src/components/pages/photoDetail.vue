<template>
    <div>
        <h4 id="photoTitle">{{photoInfoData.title}}</h4>
        <div class="userInfoTime">
            <span class="userTime">发表时间:{{photoInfoData.add_time | dataFormat}}</span>
            <span class="userClick">点击:{{photoInfoData.click}}次</span>
        </div>
        <div id = "myPhotoId">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>  
        </div>

        <div class="photoContent" v-html="photoInfoData.content">
           
        </div>
        <comment :id = id></comment>
    </div>
</template>
<script>
import comment from '@/components/chileComponents/comment.vue'
export default {
    data() {
        return {
               id:this.$route.params.id,
               //缩略图数据
               slide1:[],
               photoInfoData:[] 
        }
    },
    methods:{
        //获取图片文本信息
        getPhotoInfoData() {
            this.$axios.get('/api/getimageInfo/' + this.id).then(res => {
                if (res.status === 200) {
                    this.photoInfoData = res.data.message[0]
                }
                // console.log(res)
            })
        },
        //获取缩略图图片
        getPhotoDetailData() {
            this.$axios.get('/api/getthumimages/' + this.id).then(res => {
                if (res.status === 200) {
                    res.data.message.forEach(item => {
                        item.msrc = item.src,
                        item.w = 600,
                        item.h = 400
                    });
                }
                this.slide1 = res.data.message
                // console.log(res)
            })
        },
        //vue-preview 所需要的js
        handleClose () {
        // console.log('close event')
      }
    },
    created() {
        this.getPhotoDetailData(),
        this.getPhotoInfoData()
    },
    components:{
        comment
    }
}
</script>
<style lang="scss">
#photoTitle {
    color: #26a2ff;
    text-align: center;
    margin: 25px 0;
    padding: 0 5px;
}
.userInfoTime {
    display: flex;
    justify-content: space-between;
    color: gray;
    padding: 0 5px 15px;
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
    font-size: 16px;
}
#myPhotoId {
    .my-gallery {
        figure {
            margin: 0;
            display: inline-block;
            img {
                width: 100px;
                margin: 5px 8px;
                box-shadow: 0 0 5px #999;
            }
        }
    }
}
.photoContent {
    font-size: 15px;
    color: #333;
    text-indent: 2em;
    padding: 0 5px;
}
    
</style>