/**
 * 容器挂载配置
 */
export default interface ContainerMount {

    Name: String;

    Source: String;

    Destination: String;

    Driver: String;

    Mode: String;

    RW: Boolean;

    Propagation: String;

}