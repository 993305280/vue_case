<template>
    <div class="newList">
        <ul class="mui-table-view">
				<router-link tag="li" :to="'/home/newDetail/' + item.id" class="mui-table-view-cell mui-media" v-for="item in newListData" :key="item.id">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>
                                <span>{{item.add_time | dataFormat}}</span>
                                <span>点击:{{item.click}}次</span>
                            </p>
						</div>
					</a>
				</router-link>
			</ul>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            newListData:[]
        }
    },
    created() {
        this.getNewListData();
    },
    methods: {
        getNewListData() {
            this.$axios.get('/api/getnewslist').then(res => {
                if (res.status === 200) {
                    this.newListData = res.data.message;
                } else {
                    Toast('获取数据失败!')
                }
                // console.log(res.data.message)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
// .newList {
//     overflow: hidden;
// }
    .mui-table-view {
        img {
            width: 42px;
            height: 42px;
        }
        .mui-media-body {
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .mui-ellipsis {
            display: flex;
            justify-content: space-between;
            color: #53b4fd;
            font-size: 13px;
        }
    }
</style>