import {get} from './api'

export function getDockerInfo() {
    return get("/info");
}
