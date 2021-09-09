import React from 'react';
import { FiPlus, FiMenu } from "react-icons/fi";

export default function Contact() {
    return (
        <div className="flex flex-col mr-4 w-3/12 h-full rounded-box">
                <div
                    className="flex items-center w-full border-b text-xl font-bold"
                    style={{ height: "82px" }}
                >
                    Chat
                </div>
                <div className="flex flex-col items-center mb-5">
                    <div className="avatar online mt-6 mb-5">
                        <div className="w-20 h-20 mask mask-squircle">
                            <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
                        </div>
                    </div>
                    <h3 className="text-xl">John Story</h3>
                </div>
                <div className="form-control mb-5">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pr-16 input input-primary input-bordered"
                        />
                        <button className="absolute top-0 right-0 rounded-l-none btn border-0 text-base btn-primary">
                            go
                        </button>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>Last chats</div>
                    <div>
                        <button className="btn btn-primary btn-square btn-sm mask mask-squircle mr-2">
                            <FiPlus />
                        </button>
                        <button className="btn btn-primary btn-square btn-sm mask mask-squircle">
                            <FiMenu />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col w-full mt-2 overflow-y-auto">
                    <div className="flex items-center w-full p-5 hover:bg-base-200 rounded-box cursor-pointer">
                        <div className="avatar online w-12 flex justify-center align-center mr-3">
                            <div className="rounded-full w-12 h-12">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@40w.png" />
                            </div>
                        </div>

                        <div className="flex flex-col w-full truncate overflow-ellipsis">
                            <div className="truncate font-bold">Nguyễn</div>
                            <div className="truncate">
                                Abc Xyz aaaaaaaa a
                                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            </div>
                        </div>

                        <div className="w-10 flex justify-center items-center">
                            24:00
                        </div>
                    </div>
                    <div className="flex items-center w-full p-5 hover:bg-base-200 rounded-box cursor-pointer">
                        <div className="avatar online w-12 flex justify-center align-center mr-3">
                            <div className="rounded-full w-12 h-12">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@40w.png" />
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <div>Nguyễn</div>
                            <div>Abc Xyz aaaaaaaa</div>
                        </div>

                        <div className="w-10 flex justify-center items-center">
                            24:00
                        </div>
                    </div>
                    <div className="flex items-center w-full p-5 hover:bg-base-200 rounded-box cursor-pointer">
                        <div className="avatar online w-12 flex justify-center align-center mr-3">
                            <div className="rounded-full w-12 h-12">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@40w.png" />
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <div>Nguyễn</div>
                            <div>Abc Xyz aaaaaaaa</div>
                        </div>

                        <div className="w-10 flex justify-center items-center">
                            24:00
                        </div>
                    </div>
                    <div className="flex items-center w-full p-5 hover:bg-base-200 rounded-box cursor-pointer">
                        <div className="avatar online w-12 flex justify-center align-center mr-3">
                            <div className="rounded-full w-12 h-12">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@40w.png" />
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <div>Nguyễn</div>
                            <div>Abc Xyz aaaaaaaa</div>
                        </div>

                        <div className="w-10 flex justify-center items-center">
                            24:00
                        </div>
                    </div>
                    <div className="flex items-center w-full p-5 hover:bg-base-200 rounded-box cursor-pointer">
                        <div className="avatar online w-12 flex justify-center align-center mr-3">
                            <div className="rounded-full w-12 h-12">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@40w.png" />
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <div>Nguyễn</div>
                            <div>Abc Xyz aaaaaaaa</div>
                        </div>

                        <div className="w-10 flex justify-center items-center">
                            24:00
                        </div>
                    </div>
                    <div className="flex items-center w-full p-5 hover:bg-base-200 rounded-box cursor-pointer">
                        <div className="avatar online w-12 flex justify-center align-center mr-3">
                            <div className="rounded-full w-12 h-12">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@40w.png" />
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <div>Nguyễn</div>
                            <div>Abc Xyz aaaaaaaa</div>
                        </div>

                        <div className="w-10 flex justify-center items-center">
                            24:00
                        </div>
                    </div>
                </div>
            </div>

    )
}
