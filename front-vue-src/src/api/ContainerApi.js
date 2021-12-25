import {api} from 'boot/axios'

async function containerListApi() {
  let resp = await api.get('/container/list')
  let {data} = resp
  return data;

}


export default {containerListApi}
