import axios from 'axios'
import { BASE_URL } from './urlUtil'
const API = axios.create({
    baseURL: BASE_URL
})

API.interceptors.request.use(config => {
    const { url } = config;
    if (url.startsWith('/user') && !url.startsWith('/user/registered') && !url.startsWith('/user/login')) {
        config.headers.authorization = window.localStorage.getItem('hkzf_token');
    }
    return config
})

API.interceptors.response.use(response => {
    const { status } = response.data;
    if (status !== 200) {
        window.localStorage.removeItem('hkzf_token')
    }
    return response
})

export { API }