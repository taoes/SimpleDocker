import {get} from './api'

export function getImageList() {
    return get("/images/list");
}
