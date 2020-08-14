import Cookies from 'js-cookie'

const TOKEN = 'ACCESS_TOKEN'

export const setToken = tokenId => {
    Cookies.set(TOKEN, tokenId, { expires: 365 })
    window.location.replace('/')
}

export const getToken = () => {
    return Cookies.get(TOKEN)
}

export const isLoggedIn = () => {
    return !!getToken()
}

export const logout = () => {
    Cookies.remove(TOKEN)
    window.location.replace('/login')
}
