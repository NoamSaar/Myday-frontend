import { storageService } from './async-storage.service'
import { httpService } from './http.service'

// const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USER_BASE_URL = 'user/'
const AUTH_BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    save,
}

window.userService = userService

// const gUsers = getUsers()

// _initUsers()

async function getUsers() {
    try {
        // return await storageService.query(STORAGE_KEY)
        return httpService.get(USER_BASE_URL)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting boards')
    }
}

async function getById(userId) {
    try {
        // const user = await storageService.get(STORAGE_KEY, userId)
        const user = await httpService.get(USER_BASE_URL + userId)
        return user
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting user')
    }
}

async function remove(userId) {
    try {
        // return storageService.remove(STORAGE_KEY, userId)
        return await httpService.delete(USER_BASE_URL + userId)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during removing user')
    }
}

async function save(user) {
    try {
        if (user._id) {
            // return await storageService.put(STORAGE_KEY, user)
            return await httpService.put(USER_BASE_URL + user._id, user)
        } else {
            return await storageService.post(STORAGE_KEY, user)
        }
    } catch (err) {
        throw new Error(err.message || 'An err occurred during saving user')
    }


    // When admin updates other user's details, do not update loggedinUser
    // if (getLoggedinUser()._id === user._id) saveLocalUser(user)
}

// auth 

async function login(userCred) {
    try {
        const user = await httpService.post(AUTH_BASE_URL + 'login', userCred)
        if (user) return saveLocalUser(user)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during login')
    }
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)

}

async function signup(userCred) {
    // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // const user = await storageService.post('user', userCred)

    const user = await httpService.post(AUTH_BASE_URL + 'signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

// session storage

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}