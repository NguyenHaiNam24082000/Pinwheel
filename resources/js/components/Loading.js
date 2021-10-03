import React from "react";
import "../../css/Loading.css";

export default function Loading() {
    return (
        <div className="w-full h-full flex justify-center items-center " style={{background: "#b6fc89"}}>
            {/* <div className="container-loading">
                <div className="box-loading"></div>
                <div className="box-loading"></div>
                <div className="box-loading"></div>
                <div className="box-loading"></div>
                <div className="box-loading"></div>
            </div> */}
            <img src="../images/logo.gif" className="w-36 h-36"></img>
        </div>
    );
}
