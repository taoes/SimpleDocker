import {get} from './api'

export function getNetworkList() {
    return get("/network/list");
}
