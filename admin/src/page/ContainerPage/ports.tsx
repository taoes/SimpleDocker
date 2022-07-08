import DockerContainer from "../../api/Model/DockerContainer";
import ContainerPort from "../../api/Model/ContainerPort";
import {Tag} from "antd";
import React from "react";

let portShow = (container: DockerContainer) => {
    return container.Ports.map((p: ContainerPort, index: number) => {
        if (!!p.IP) {
            return <Tag key={index}
                        className={"mt-1"}>{p.IP}:{p.PublicPort}-{p.PrivatePort}/{p.Type.toUpperCase()}</Tag>
        } else {
            return null;
        }
    })
}

export default portShow;