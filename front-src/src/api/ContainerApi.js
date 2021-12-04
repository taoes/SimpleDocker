import {get} from './api'

export function getContainerList() {
    return get("/container/list");
}
