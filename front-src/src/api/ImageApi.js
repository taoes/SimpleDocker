import {get} from './api'

export function getImageList() {
    return get("/image/list");
}
