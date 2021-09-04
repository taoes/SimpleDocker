console.log(process.env)
export default {
    HOST: process.env.VUE_APP_API_HOST,
    WS_HOST: process.env.VUE_APP_WS_HOST
}