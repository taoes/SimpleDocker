let isProd = process.env.NODE_ENV === 'production'

export default {
  HOST: "",
  WS_HOST: "ws://" + location.host
}
