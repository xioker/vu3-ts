const tokenKey:string = 'token'
// get token
export const getToken = () => sessionStorage.getItem(tokenKey)

// set token
export const setToken = (token:string) => sessionStorage.setItem(tokenKey, token)

// remove token
export const removeToken = () => sessionStorage.removeItem(tokenKey)
