import {api} from 'boot/axios'

async function volumeListApi() {
  let resp = await api.get('/volume/list')
  let {data} = resp
  return data;
}


async function imageInspectApi(id) {
  let resp = await api.get(`/volume/${id}/inspect`)
  let {data} = resp
  return data;
}


export default {volumeListApi}
