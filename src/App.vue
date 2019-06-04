<template>
  <div id="app">
    <header>
      <mt-header fixed title="疯子的项目">
				<span @click="goBack" slot="left" v-show="msg">
					<mt-button icon="back">返回</mt-button>
				</span>
			</mt-header>
    </header>
		<transition>
			<router-view></router-view>
		</transition>
    
    <footer>
      	<nav class="mui-bar mui-bar-tab">
			<router-link to="/home" class="mui-tab-item-my" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link to="/member" class="mui-tab-item-my" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link to="/cart" class="mui-tab-item-my" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="isBadge">{{$store.getters.getGoodsNum}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link to="/search" class="mui-tab-item-my" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </footer>
  </div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			msg:false
		}
	},
	methods:{
		goBack() {
			this.$router.go(-1);
		}
	},
	created() {
		this.msg = this.$route.path == '/home' ? false : true;
	}
	,
	watch: {
		'$route.path':function (newVal, oldVal) {
			if (newVal == '/home') {
				this.msg = false
			} else {
				this.msg = true
			}
		}
	}
}
</script>

<style lang = "scss" scoped>
.mint-header {
	z-index: 999;
}
  #app {
    margin-top: 40px;
		padding-bottom:50px;
		overflow: hidden;
		
  }
	.v-enter {
		opacity: 0;
		transform: translateX(100%);
		position: absolute;
	}
	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	.v-enter-active,.v-leave-active {
		transition: all .5s ease;
	}

	.mui-bar-tab .mui-tab-item-my.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-my {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-my .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-my .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mint-header .mint-button {
	display: flex;
	align-content: center;
	
}
/* .mintui {
		font-size: 12px !important;
	} */
</style>
