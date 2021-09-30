import React from "react";
import "../../css/Loading.css";

export default function Loading() {
    return (
        <div className="w-full h-full flex justify-center items-center bg-black">
            <div className="container-loading">
                <div className="box-loading"></div>
                <div className="box-loading"></div>
                <div className="box-loading"></div>
                <div className="box-loading"></div>
                <div className="box-loading"></div>
            </div>
        </div>
    );
}
