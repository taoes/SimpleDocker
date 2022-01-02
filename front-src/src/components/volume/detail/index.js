import React from 'react'
import {inspectVolume} from "../../../api/VolumeApi";

export default class VolumeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: null
        }
    }

    componentDidMount() {
        this.inspect()
    }

    inspect = () => {
        inspectVolume(this.props.volumeName)
            .then((resp) => this.setState({detail: resp.data}))
            .catch(e => console.error(e))
    }

    render() {
        let detail = JSON.stringify(this.state.detail)
        return (
            <div>
                <h1>卷详情</h1>
                <span>
                    {detail}
                </span>
            </div>
        );
    }

}
