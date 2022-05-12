import IpamConfig from "./IpamConfig";

/**
 * 容器网络配置
 */
export default interface ContainerNetwork {

    IPAMConfig: IpamConfig;


    Aliases: Array<String>;

    NetworkID: String;

    EndpointID: String;

    Gateway: String;

    IPAddress: String;

    IPPrefixLen: Number;

    IPv6Gateway: String;

    GlobalIPv6Address: String;

    GlobalIPv6PrefixLen: Number;

    MacAddress: String;

}