// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'  
import App from './App'
import router from './router'
import axios from 'axios'
//缩略图插件的引入
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// import Mui from 'mui'
// import 'mui/'
import '@/assets/mui/css/mui.min.css'
import '@/assets/mui/css/icons-extra.css'

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.min.css'

import Vuex from 'vuex'
Vue.use(Vuex) 

//导入时间格式化插件
import moment from 'moment'

Vue.filter('dataFormat', (dataStr,partten = "YYYY-MM-DD HH:mm:ss") => {
    return moment(dataStr).format(partten);
})
// Vue.use(Mui)
// Vue.use(axios)

Vue.prototype.$axios = axios;
// Vue.prototype.HOST = '/api'
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



Vue.config.productionTip = false

/* eslint-disable no-new */
var cart = JSON.parse(localStorage.getItem('cartKey')) || []
const store = new Vuex.Store({
  state: {
    car: cart
  },
  mutations: {
    setCount (state, obj) {
      var msg = false;
      if (state.car.length > 0) {
        state.car.some(item => {
          if (item.id === obj.id) {
            msg = true;
            item.count += parseInt(obj.count) 
            return true
          }
        })
      }
      

      if (!msg) {
          state.car.push(obj)
      }
      localStorage.setItem('cartKey', JSON.stringify(state.car))
      
       
    },
    setCartCount(state, goodsObj) {
      state.car.some(item => {
        if (item.id == goodsObj.id) {
          item.count = parseInt(goodsObj.count)
          // console.log(goodsObj.count) 
          return true
        }
      })
      localStorage.setItem('cartKey', JSON.stringify(state.car))
    },

    deleteStoreCar(state, id) {

        state.car.some((item,i) => {
          if (item.id == id) {
            state.car.splice(i, 1);
            return true;
          }
        })
        localStorage.setItem('cartKey', JSON.stringify(state.car))

    },
    setGoodsSeleted(state, obj) {
      state.car.forEach(item => {
        if (item.id == obj.id) {
          item.seleted = obj.seleted
          
        }
        localStorage.setItem('cartKey', JSON.stringify(state.car))
      })
    }


  },
 
  getters: {
    getGoodsNum(state) {
     return state.car.length; 
    },
    getGoodsCount(state) {
      var o = []
      state.car.forEach(item => {
        o[item.id] = item.count;
        
      });
      return o;
    },
    getGoodsSeleted(state) {
      var one = []
      state.car.some(item => {
        one[item.id] = item.seleted;
        return true;
      })
      return one;
    },
    getGoodsPrice(state) {
      var priceObj = {
        count:0,
        priceNum:0
      }
      state.car.forEach(item => {
        if (item.seleted) {
          priceObj.count += item.count;
          priceObj.priceNum += item.price * item.count
        }
      })
      return priceObj;
    }
  }
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
