import React from "react";
import WithRouter from "../../../../../router/WithRouter";


interface Props { }

interface State { }

class ContainerFile extends React.Component<Props, State>{
    
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render(){
        return (
            <div className="fmFile">
                <div className="fileIcon"> </div>
                <span className="fileName">位置文件</span> 
            </div>
        )
    }


}

export default WithRouter(ContainerFile)