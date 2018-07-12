import { getToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        username: '',
        roles: [],
    },

    getters: {

    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.username = name
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        SetUserName({ commit }, data) {
            return new Promise(resolve =>{
                commit('SET_NAME', data)
                resolve()
            })
        },
        SetUserToken({ commit }, data) {
            return new Promise(resolve =>{
                commit('SET_TOKEN', data)
                resolve()
            })
        }

    }

}

export default user
