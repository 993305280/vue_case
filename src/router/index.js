import Vue from 'vue'
import Router from 'vue-router'  
import page from '@/components/pages/page.vue'
import newList from '@/components/pages/newList.vue'
import newDetail from '@/components/pages/newDetail.vue'
import photoList from '@/components/pages/photoList.vue'
import photoDetail from '@/components/pages/photoDetail.vue'
import goodsList from '@/components/pages/goodsList.vue'
import goodsDetail from '@/components/pages/goodsDetail.vue'
import goodsDetailInfo from '@/components/pages/goodsDetailInfo.vue'
import goodsComment from '@/components/pages/goodsComment.vue'
import member from '@/components/members/member.vue'
import cart from '@/components/carts/cart.vue'
import search from '@/components/searchs/search.vue'


Vue.use(Router)

export default new Router({
  linkActiveClass:'mui-active',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'page',
      component: page
    },
    {
      path: '/home/newList',
      name: 'newList',
      component: newList
    },
    {
      path: '/home/newDetail/:id',
      name: 'newDetail',
      component: newDetail
    },
    {
      path: '/home/photoList',
      name: 'photoList',
      component: photoList
    },
    {
      path: '/home/photoDetail/:id',
      name: 'photoDetail',
      component: photoDetail
    },
    {
      path: '/home/goodsList',
      name: 'goodsList',
      component: goodsList
    },
    {
      path: '/home/goodsDetail/:id',
      name: 'goodsDetail',
      component: goodsDetail
    },
    {
      path: '/home/goodsDetailInfo/:id',
      name: 'goodsDetailInfo',
      component: goodsDetailInfo
    },
    {
      path: '/home/goodsComment/:id',
      name: 'goodsComment',
      component: goodsComment
    },
    {
      path: '/member',
      name: 'member',
      component: member
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
  ]
})
