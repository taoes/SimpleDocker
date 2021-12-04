import React from "react";


import './index.css'

class CommonHead extends React.Component {

    render() {
        const version = "1.0.0-beta";
        return (
            <div>
                <div id="header">
                    <img src={"/icon2.png"} style={{height: 40}} alt=""/>
                    <h1 id="title">SimpleDocker</h1>
                    <span id="version">{version}</span>
                </div>
            </div>
        )
    }

}

export default CommonHead;