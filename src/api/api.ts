import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:5000/',
})

export const authAPI = {
    register() {
        return instance.post(`user/registration`)
    },
    login() {
        return instance.post(`user/login`)
    },
}
