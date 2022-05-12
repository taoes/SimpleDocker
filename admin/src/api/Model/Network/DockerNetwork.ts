import IpamConfig from "../IpamConfig";

export default interface DockerNetwork {


    Id: string;

    Name: string;

    Scope: string;

    Driver: string;

    EnableIPv6: Boolean;

    Internal: Boolean;

    IPAM: IpamConfig;

    Containers: Map<String, any>;

    Options: Map<String, String>;

    Attachable: Boolean;

    Labels: Map<String, String>;

    Created: string;
}