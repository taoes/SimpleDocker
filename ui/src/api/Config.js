let isProd = process.env.NODE_ENV === 'production'

// export default {
//   HOST: "",
//   WS_HOST: "ws://" + location.host
// }

export default {
  HOST: "http://localhost:4050",
  WS_HOST: "ws://localhost:4050"
}
