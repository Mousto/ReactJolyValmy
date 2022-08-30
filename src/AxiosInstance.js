import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/'

const AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('acces_token')
            ? 'JWT ' + localStorage.getItem('acces_token')
            : null,
        'content-type': 'application/json',
        accept: 'application/json'
    }
})
export default AxiosInstance