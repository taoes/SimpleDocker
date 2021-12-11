import React from "react";


import './index.css'
import LoginInfo from "../login";

class CommonHead extends React.Component {

    render() {
        return (
            <div>
                <div id="header">
                    <div style={{marginRight: 'auto', display: 'flex', alignItems: 'center'}}>
                        <img src={"/icon2.png"} style={{height: 40}} alt=""/>
                        <h1 id="title">SimpleDocker</h1>
                    </div>
                    <LoginInfo/>
                </div>
            </div>
        )
    }

}

export default CommonHead;
