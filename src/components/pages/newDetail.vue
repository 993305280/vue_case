<template>
    <div class="newDetail">
        <p class="bigTitle">{{newDetailData.title}}</p>
        <div class="smallTitle">
            <span>发表时间:{{newDetailData.add_time | dataFormat}}</span>
            <span>点击:{{newDetailData.click}}次</span>
        </div>
        <div class="newContent" v-html="newDetailData.content">

        </div>
        <comment :id = "this.id"></comment>
        
    </div>
</template>
<script>

import comment from '../chileComponents/comment.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,
            newDetailData:{}
        }
    },
    created() {
        this.getNewListData()
    },
    methods: {
        getNewListData() {
            this.$axios.get('/api/getnew/' + this.id).then(res => {
                if (res.status === 200) {
                    this.newDetailData = res.data.message[0]
                } else {
                    alert('获取数据失败!')
                }
                // console.log(res.data.message[0])
            })
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="scss">
.newDetail {
    padding: 0 3px;
    .bigTitle {
        color:red;
        font-size: 17px;
        font-weight: bold;
        text-align: center;
        margin: 20px 5px 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        // white-space:nowrap;
    }
    .smallTitle {
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            color: #53b4fd;
            padding-bottom: 13px;
            margin-bottom: 10px;
            border-bottom: 1px solid #d2d2d2;
    }
    .newContent {
        p:nth-child(1) {
            text-indent: 2em;
        }
    }
}
</style>