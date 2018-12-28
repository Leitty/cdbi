import axios from 'axios'
import store from '@/store'
// import * as types from './store/types'
// import router from '@/router/index'
// Vue.use(vuex);

// Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:8001/'
axios.defaults.timeout = 5000


axios.interceptors.request.use(
    config => {
        if (store.getters.token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            config.headers.Authorization = 'JWT ' +store.getters.token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        // console.log(response)
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    // router.replace({
                    //     path: 'login',
                    //     query: { redirect: router.currentRoute.fullPath }  //登录成功后跳入浏览的当前页面
                    // })
            }
        }
        return Promise.reject(error.response)
    });
export default axios
