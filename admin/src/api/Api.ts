import axios, {AxiosRequestConfig} from 'axios'

let config:AxiosRequestConfig = {
    baseURL:'http://localhost:3364/api'
}
const httpRequest =  axios.create(config);
export default httpRequest;