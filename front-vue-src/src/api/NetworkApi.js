import {api} from 'boot/axios'

async function networkListApi() {
  let resp = await api.get('/network/list')
  let {data} = resp
  return data;
}


async function imageInspectApi(id) {
  let resp = await api.get(`/images/${id}/inspect`)
  let {data} = resp
  return data;
}


export default {networkListApi}
