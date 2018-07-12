const getters = {
    token: state => state.user.token,
    username: state => state.user.username,
    roles: state => state.user.roles,
    routers: state => state.Router.routers,
    addRouter: state => state.Router.addRouter
}
export default getters
