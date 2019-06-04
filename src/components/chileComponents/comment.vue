<template>
    <div class="commentBox">
        <h3>评论内容</h3>
        <div>
            <textarea cols="30" rows="7" placeholder="请输入你的爱的箴言!" v-model="userComment"></textarea>
            <mt-button type="primary" size="large" @click="setUserComment">发表评论</mt-button>
        </div>
        <div>
            <div v-for="(item, i) in commentData" :key="i">
                <div class="userInfo">
                    <span>第{{i + 1}}楼用户:{{item.user_name}}</span>
                    <span>发表时间:{{item.add_time | dataFormat}}</span>
                </div>
                <p class="userContent">{{item.content == '' ? '此用户很懒,嘛都没说':(item.content == 'undefined'? '此用户很懒,嘛都没说': item.content)}}</p>
            </div>
        </div>
        <mt-button type="danger" size="large" plain id="moreBtn" @click="getMoreComment">加载更多</mt-button>
    </div>
</template>
<script>
//需按需引入Toast方可生效
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            pageNum:1,
            commentData:[],
            userComment:'' 
        }
    },
    methods: {
        //获取用户评论
        getCommentData() {
            this.$axios.get('/api/getcomments/'+ this.id+'?pageindex=' + this.pageNum).then(res => {
                if (res.status === 200) {
                    // this.commentData = 
                    this.commentData = this.commentData.concat(res.data.message)
                    // console.log(res.data.message)
                }   
            }).catch(errer => {
                console.log(errer)
            })
        },
        //追加用户评论（加载评论）
        setUserComment() {  
            if (this.userComment.trim().length > 0 ) {
                this.$axios.post('/api/postcomment/' + this.id,{
                    content:this.userComment,
                }).then(res => {
                    // console.log(res)
                    if (res.status === 200) {
                        var userInfo = {
                            user_name:'匿名用户',
                            add_time: Date.now(),
                            content:this.userComment.trim()
                        }
                    this.commentData.unshift(userInfo);
                    this.userComment = ''
                    Toast(res.data.message)
                    }
                })
            } else {
                Toast('评论不能为空哦！')
            } 
             
        },
        //获取更多数据
        getMoreComment() {
            this.pageNum ++;
            this.getCommentData()
        }
    },
    props: ["id"],
    created() {
        this.getCommentData();
    }
}
</script>
<style lang="scss" scoped>
.commentBox {
    margin: 1px;
}
    .userInfo {
        display: flex;
        justify-content: space-between;
        background-color: #e8e9f1;
        margin-top: 8px;
        font-size: 13px;
        color: #757272;
        span:nth-child(1) {
            margin-left: 5px;
        }
        span:nth-child(2) {
            margin-right: 20px;
        }
    }
    .userContent {
        margin-top: 2px;
        font-size: 16px;
        color: #333;
        padding-left: 30px;
        padding-right: 2px;
    }
    #moreBtn {
        margin-bottom: 8px;
    }
</style>