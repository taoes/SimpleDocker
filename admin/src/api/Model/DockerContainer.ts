import ContainerNetwork from "./ContainerNetwork";
import ContainerPort from "./ContainerPort"
import ContainerMount from "./ContainerMount";

/**
 * 容器模型
 */
export default interface DockerContainer {
    Command: string;
    Created: Number;
    Id: string;
    Image: string;
    ImageID: string;
    Names: Array<string>;
    Ports: Array<ContainerPort>;
    Labels: Map<string, string>;
    Status: string;
    State: string;
    SizeRw: Number;
    SizeRootFs: Number;
    HostConfig: ContainerHostConfig;
    NetworkSettings: ContainerNetworkSettings;
    mounts: Array<ContainerMount>;

}


interface ContainerHostConfig {
    NetworkMode: string;
}

interface ContainerNetworkSettings {

    Networks: Map<string, ContainerNetwork>;
}

