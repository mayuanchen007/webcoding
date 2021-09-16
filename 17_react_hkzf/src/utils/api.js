import axios from 'axios'
import { BASE_URL } from './urlUtil'
const API = axios.create({
    baseURL: BASE_URL
})
export { API }