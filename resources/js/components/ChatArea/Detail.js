import React from 'react';
import { BsFileEarmark } from "react-icons/bs";
import $ from 'jquery';
import { OperationType } from '@firebase/auth';

export default function Detail() {
    const openTabChanel = () =>{
        $(".tab").toggleClass("tab-active");
        $(".tab-chanel").addClass("tab-active");
        $(".chanel").show();
        $(".detail").hide();
    }
    const openTabDetail = () =>{
        $(".tab").toggleClass("tab-active");
        $(".tab-detail").addClass("tab-active");
        $(".detail").show();
        $(".chanel").hide();
    }
    return (
        <div className="flex flex-col ml-4 w-3/12 h-full rounded-box">
                <div className="flex items-center w-full h-16 border-b text-xl">
                    <div className="tabs tabs-boxed w-full">
                        <a className="tab tab-active w-3/6 tab-detail" onClick={openTabDetail}>Detail</a>
                        <a className="tab w-3/6 tab-chanel" onClick={openTabChanel}>Chanels</a>
                    </div>
                </div>
                <div
                    className="flex flex-col overflow-y-auto w-full detail"
                    style={{ height: "calc(100% - 64px)" }}
                >
                    <div className="flex flex-col items-center mb-5">
                        <div className="avatar online mt-6 mb-5">
                            <div className="w-20 h-20 mask mask-squircle">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
                            </div>
                        </div>
                        <h3 className="text-xl">Test Group</h3>
                    </div>
                    <div className="form-control mb-5">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search in Conversation"
                                className="w-full pr-16 input input-bordered input-primary"
                            />
                            <button className="absolute top-0 right-0 rounded-l-none btn border-0 text-base btn-primary">
                                go
                            </button>
                        </div>
                    </div>
                    <div className="collapse w-full border rounded-box border-base-300 collapse-arrow mb-3">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium flex items-center">
                            <BsFileEarmark className="mr-3" /> File
                        </div>
                        <div className="collapse-content">
                            <div className="divider">Rỗng</div>
                        </div>
                    </div>
                    <div className="collapse w-full border rounded-box border-base-300 collapse-arrow mb-3">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium flex items-center">
                            <BsFileEarmark className="mr-3" /> File
                        </div>
                        <div className="collapse-content">
                            <div className="divider">Rỗng</div>
                        </div>
                    </div>
                    <div className="collapse w-full border rounded-box border-base-300 collapse-arrow mb-3">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium flex items-center">
                            <BsFileEarmark className="mr-3" /> Image
                        </div>
                        <div className="collapse-content overflow-y-auto">
                            {/* <div className="divider">Rỗng</div>  */}
                            <div className="grid md:grid-flow-row grid-cols-3 grid-rows-3 gap-4">
                                <div className="rounded-box w-20 h-20">
                                    <img
                                        src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                                        className="rounded-box"
                                    />
                                </div>
                                <div className="rounded-box w-20 h-20">
                                    <img
                                        src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                                        className="rounded-box"
                                    />
                                </div>
                                <div className="rounded-box w-20 h-20">
                                    <img
                                        src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                                        className="rounded-box"
                                    />
                                </div>
                                <div className="rounded-box w-20 h-20">
                                    <img
                                        src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                                        className="rounded-box"
                                    />
                                </div>
                                <div className="rounded-box w-20 h-20">
                                    <img
                                        src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                                        className="rounded-box"
                                    />
                                </div>
                                <div className="rounded-box w-20 h-20">
                                    <img
                                        src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                                        className="rounded-box"
                                    />
                                </div>
                                <div className="rounded-box w-20 h-20">
                                    <img
                                        src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                                        className="rounded-box"
                                    />
                                </div>
                                <div className="rounded-box w-20 h-20">
                                    <img
                                        src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                                        className="rounded-box"
                                    />
                                </div>
                                <div className="rounded-box w-20 h-20">
                                    <img
                                        src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                                        className="rounded-box"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chanel flex flex-col overflow-y-auto w-full" style={{display: "none"}}>
                    
                </div>
            </div>

    )
}
