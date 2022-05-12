interface DockerImage {
    Created: Number;
    Id: string;
    ParentId: String;
    RepoTags: Array<String>;
    RepoDigests: Array<String>
    Size: Number;
    VirtualSize: Number;
    SharedSize: Number;
    Labels: Map<String, String>;
    Containers: Number;


}

export default DockerImage;