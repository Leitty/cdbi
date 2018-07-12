
import {  constantRouterMap } from '@/router'

const Router = {
    state: {
        routers: constantRouterMap,
        addRouter:[]
    },

    getters: {

    },

    mutations:{
        SET_ROUTERS:(state, router) => {
            state.addRouter = router
            state.routers = constantRouterMap.concat(router)
        }
    },

    actions:{
        Genrouter({ commit }, acrouter)  {
            return new Promise(resolve => {
            commit('SET_ROUTERS', acrouter)
            resolve()
            })
        }
    }

}

export default Router

