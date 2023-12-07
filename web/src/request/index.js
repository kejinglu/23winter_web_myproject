import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:3001'
})
Api.interceptors.response.use(response => {
        let res = response.data;
        // If it is a returned file
        if (response.config.responseType === 'blob') {
            return res
        }
        // Compatible with string data returned by the server
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // // Compatible with string data returned by the server
        // if (res.code === '401') {
        //
        // }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return error
    }
)
export default Api
