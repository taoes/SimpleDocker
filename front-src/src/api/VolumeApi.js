import {get} from './api'

export function getVolumeList() {
    return get("/volume/list");
}
