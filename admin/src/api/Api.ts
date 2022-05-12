import axios, {AxiosRequestConfig} from 'axios'

let config:AxiosRequestConfig = {
    baseURL:'http://192.168.1.105:3364/api'
}
const httpRequest =  axios.create(config);
export default httpRequest;