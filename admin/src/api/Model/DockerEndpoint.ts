export default interface DockerEndpoint {
    id: string
    name: string
    type: string
    typeDesc: string
    state: string
    stateDesc: string
    host: string
    port: number
    latestTestTime: string
    createdAt: string
    updatedAt: string

}