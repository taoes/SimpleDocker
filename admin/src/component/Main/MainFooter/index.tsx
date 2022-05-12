import React from "react";
import './index.css'


const style: React.CSSProperties = {
    backgroundColor: "white",
    padding: '10px 0 10px 0'
}

function MainFooter() {
    return (
        <div id="mainFooter" className="is-flex is-justify-content-space-around" style={style}>
            <span>系统时间: 2022-04-05 12:13:0</span>
            <span>在线人数: 2人</span>
            <span>运行市场: </span>
        </div>
    )
}

export default MainFooter;