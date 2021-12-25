import { boot } from 'quasar/wrappers'
import router from '../router/index'


export default boot(({ app }) => {
  app.use(router)
})
