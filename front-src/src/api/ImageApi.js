import {get} from './api'

export function getImageList() {
    return get("/images/list");
}

export function getImage(imageId) {
    return get(`/images/${imageId}/inspect`);
}
