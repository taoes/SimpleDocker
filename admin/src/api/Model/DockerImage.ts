import ImageContainerConfig from "./Image/ImageContainerConfig";

interface DockerImage {
    Created: number;
    Id: string;
    ParentId: String;
    RepoTags: Array<String>;
    RepoDigests: Array<String>
    Size: number;
    VirtualSize: number;
    SharedSize: number;
    Labels: Map<String, String>;
    Containers: number;
    Architecture: string;
    Config: ImageContainerConfig;


}

export default DockerImage;