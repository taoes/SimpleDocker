// export default {
//   HOST: "",
//   WS_HOST: "ws://" + location.host
// }

let addr = `${process.env.VUE_APP_API_HOST || '127.0.0.1'}:${process.env.VUE_APP_API_PORT || 4050}`
if (addr.startsWith('http://' || addr.startsWith('https://'))) {
    addr = addr.split('://')[1]
}

export default {
    HOST: `http://${addr}`,
    WS_HOST: `ws://${addr}`
}
