// export default {
//   HOST: "",
//   WS_HOST: "ws://" + location.host
// }
const addr = `${process.env.VUE_APP_API_HOST || '127.0.0.1'}:${process.env.VUE_APP_API_PORT || 4050}`

export default {
    HOST: `http://${addr}`,
    WS_HOST: `ws://${addr}`
}
