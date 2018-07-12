import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // getToken from cookie
import { adminViewRouter } from '@/router/index';

router.beforeEach((to,from,next) => {
    //生成路由
    if (getToken()) {
        var usrToken = getToken().split(".")[1]
        if (usrToken.length === 99){
            //admin用户
            if (from.path === '/login') {
                store.dispatch('SetUserName','admin')
                store.dispatch('Genrouter', adminViewRouter)
                router.addRoutes(store.getters.addRouter)
            }
            // router.addRoutes(adminViewRouter)
        }else{
            store.dispatch('SetUserName', 'guest')
            store.dispatch('Genrouter', [])
            router.addRoutes(store.getters.addRouter)
        }
        // next({ ...to })
        next()
    } else {
        next()
        // next('/login')
    }
})


// router.afterEach(()=> {

// })