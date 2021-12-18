import React from "react";
import {Collapse, Skeleton} from "antd";

const {Panel} = Collapse

export default class ImageDetail extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Collapse>
                    <Panel key="1" header="baseInfo"></Panel>
                    <Panel key="2" header="GraphDriver"></Panel>
                    <Panel key="3" header="ContainerConfig"></Panel>
                    <Panel key="4" header="Config"></Panel>
                </Collapse>
            </div>
        );
    }

}
