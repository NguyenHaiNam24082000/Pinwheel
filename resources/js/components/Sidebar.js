import React, { useState,useEffect } from "react";
import "../../css/Sidebar.css";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { TiGroup } from "react-icons/ti";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import {AuthContext } from "../context/AuthProvider";
import {AppContext} from "../context/AppProvider";

function Sidebar({ theme, setThemeMode }) {
    const history = useHistory();
    const {user}= React.useContext(AuthContext);
    const { setSelectedConversationId } = React.useContext(AppContext);
    const themeMode = [
        { title: "🌚  dark", theme: "dark" },
        { title: "🧁  cupcake", theme: "cupcake" },
        { title: "🐝  bumblebee", theme: "bumblebee" },
        { title: "✳️  Emerald", theme: "emerald" },
        { title: "🏢  Corporate", theme: "corporate" },
        { title: "🌃  synthwave", theme: "synthwave" },
        { title: "🤖  cyberpunk", theme: "cyberpunk" },
        { title: "🌸  valentine", theme: "valentine" },
        { title: "🎃  halloween", theme: "halloween" },
        { title: "🌷  garden", theme: "garden" },
        { title: "🌲  forest", theme: "forest" },
        { title: "🐟  aqua", theme: "aqua" },
        { title: "👓  lofi", theme: "lofi" },
        { title: "🖍  pastel", theme: "pastel" },
        { title: "📝  Wireframe", theme: "wireframe" },
        { title: "🏴  black", theme: "black" },
        { title: "💎  luxury", theme: "luxury" },
        { title: "🧛‍♂️  dracula", theme: "dracula" },
    ];
    console.log("axx", user);
    return (
        <div className="flex flex-col w-20 h-full justify-between items-center position-relative">
            <div className="mt-3">
                <img
                    src="../../images/logo.gif"
                    alt="logo"
                    className="cursor-pointer w-16 h-16 mask mask-squircle"
                    onClick={()=>setSelectedConversationId("")}
                />
            </div>
            <div className="flex flex-col justify-center">
                <div tabIndex="0" className="m-1 btn btn-primary">
                    <HiOutlineColorSwatch />
                </div>
                <div tabIndex="0" className="m-1 btn btn-primary">
                    <TiGroup className="w-5 h-5"/>
                </div>
                <div tabIndex="0" className="m-1 btn btn-primary">
                    <HiOutlineColorSwatch />
                </div>
                <div tabIndex="0" className="m-1 btn btn-primary">
                    <HiOutlineColorSwatch />
                </div>
                <div tabIndex="0" className="m-1 btn btn-primary">
                    <HiOutlineColorSwatch />
                </div>
                <div className="dropdown dropdown-right dropdown-end">
                    <div tabIndex="0" className="m-1 btn btn-primary">
                        <HiOutlineColorSwatch className="w-5 h-5"/>
                    </div>
                    <ul
                        tabIndex="0"
                        className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 overflow-y-auto"
                        style={{
                            position: "fixed",
                            top: "1vh",
                            height: "98vh",
                            left: "80px",
                        }}
                    >
                        {themeMode.map((content, index) => (
                            <li key={index}>
                                <a
                                    tabIndex="0"
                                    data-set-theme={`${content["theme"]}`}
                                    data-act-class="active"
                                    className={`${
                                        theme === content["theme"]
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setThemeMode(content["theme"])
                                    }
                                >
                                    {content["title"]}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mb-3 dropdown dropdown-right dropdown-end">
                <div
                    tabIndex="0"
                    className="avatar cursor-pointer tooltip tooltip-right z-20"
                    data-tip={user.name ? user.name : ""}
                >
                    <div className=" rounded-full w-10 h-10">
                        <img src={user.avatar} />
                    </div>
                </div>
                <ul
                    tabIndex="0"
                    className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 ml-3"
                >
                    <li>
                        <a>Item 1</a>
                    </li>
                    <li>
                        <a>Item 2</a>
                    </li>
                    <li>
                        <a onClick={() => {auth.signOut(); history.push('/login')}}>
                            <IoLogOutOutline className="w-6 h-6 mr-3" />
                            Log out
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default React.memo(Sidebar);
