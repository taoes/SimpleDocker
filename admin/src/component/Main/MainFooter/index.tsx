import React from "react";
import './index.css'


const style: React.CSSProperties = {
    backgroundColor: "white",
    padding: '10px 0 10px 0'
}

function MainFooter() {

    return (
        <div id="mainFooter" className="is-flex is-justify-content-center" style={style}>
            <span>系统时间: </span>
        </div>
    )
}

export default MainFooter;