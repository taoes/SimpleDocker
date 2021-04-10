import axios from "axios";


function systemInfo() {
    return axios.get('/api/system/info')
}

function dockerInfo() {
    return axios.get('/api/docker/version')
}

export default {
    systemInfo, dockerInfo
}
