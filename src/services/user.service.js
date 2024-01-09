import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'userDB'


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

const gUsers = [
    {
        _id: 'u101',
        fullname: 'Eden Rize',
        username: 'edenrize@gmail.com',
        password: '1234',
        imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',

    },
    {
        _id: 'u102',
        fullname: 'Mor Marzan',
        username: 'mormarzan@gmail.com',
        password: '4321',

    },
    {
        _id: 'u103',
        fullname: 'Noam Saar',
        username: 'noamsaar11@gmail.com',
        password: '4321',
        imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360614/noam_tdr2rp.jpg',

    },
]

_initUsers()

async function getUsers() {
    try {
        return await storageService.query(STORAGE_KEY)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting boards')
    }
    // return httpService.get(`user`)
}



async function getById(userId) {
    try {
        const user = await storageService.get(STORAGE_KEY, userId)
        // const user = await httpService.get(`user/${userId}`)
        return user
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting user')
    }
}

function remove(userId) {
    try {
        return storageService.remove(STORAGE_KEY, userId)
        // return httpService.delete(`user/${userId}`)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during removing user')
    }
}

async function save(user) {
    try {
        if (user._id) {
            return await storageService.put(STORAGE_KEY, user)
            // const user = await httpService.put(`user/${_id}`, user)
        } else {
            return await storageService.post(STORAGE_KEY, user)
        }
    } catch (err) {
        throw new Error(err.message || 'An err occurred during saving user')
    }


    // When admin updates other user's details, do not update loggedinUser
    // if (getLoggedinUser()._id === user._id) saveLocalUser(user)
}

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) return saveLocalUser(user)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during login')
    }
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)

}

async function signup(userCred) {
    // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // userCred.score = 10000
    // const user = await storageService.post('user', userCred)

    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}



function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()


function _initUsers() {
    const usersFromStorage = localStorage.getItem(STORAGE_KEY)
    if (usersFromStorage && usersFromStorage.length) return

    localStorage.setItem(STORAGE_KEY, JSON.stringify(gUsers))
}


