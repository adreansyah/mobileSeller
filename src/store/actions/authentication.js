const Authentication = (targetForm = null) => {
    return {
        type: 'REQUEST_AUTH',
        payload: targetForm,
    }
}
const logout = () => {
    return {
        type: 'REQUEST_LOGOUT'
    }
}
const ActionCreators = {
    Authentication,
    logout
}
export default ActionCreators
