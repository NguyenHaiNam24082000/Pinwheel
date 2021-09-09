import React from "react";
import '../../css/Sidebar.css';
import { HiOutlineColorSwatch } from "react-icons/hi";

export default function Sidebar({theme, setThemeMode}) {
    return (
        <div className="flex flex-col w-20 h-full justify-between items-center position-relative">
            <div className="mt-3">
                <svg
                    id="logo"
                    className="cursor-pointer w-10 h-10"
                    width="306"
                    height="306"
                    viewBox="0 0 306 306"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="198.951"
                        y="0.972168"
                        width="60"
                        height="140"
                        rx="30"
                        transform="rotate(45 198.951 0.972168)"
                        fill="#79DE79"
                    />
                    <rect
                        x="107.028"
                        y="305.028"
                        width="60"
                        height="140"
                        rx="30"
                        transform="rotate(-135 107.028 305.028)"
                        fill="#FCFC99"
                    />
                    <rect
                        x="305.019"
                        y="198.962"
                        width="60"
                        height="140"
                        rx="30"
                        transform="rotate(135 305.019 198.962)"
                        fill="#A8E4EF"
                    />
                    <rect
                        x="0.961914"
                        y="107.038"
                        width="60"
                        height="140"
                        rx="30"
                        transform="rotate(-45 0.961914 107.038)"
                        fill="#FB6962"
                    />
                </svg>
            </div>
            <div className="flex flex-col justify-center">
                <div tabIndex="0" className="m-1 btn btn-primary">
                    <HiOutlineColorSwatch />
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
                <div tabIndex="0" className="m-1 btn btn-primary">
                    <HiOutlineColorSwatch />
                </div>
                <div className="dropdown dropdown-right dropdown-end">
                    <div tabIndex="0" className="m-1 btn btn-primary">
                        <HiOutlineColorSwatch />
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
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="light"
                                data-act-class="active"
                                className={`${
                                    theme == "light" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🌝  light
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="dark"
                                data-act-class="active"
                                className={`${theme == "dark" ? "active" : ""}`}
                                onClick={setThemeMode}
                            >
                                🌚  dark
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="cupcake"
                                data-act-class="active"
                                className={`${
                                    theme == "cupcake" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🧁  cupcake
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="bumblebee"
                                data-act-class="active"
                                className={`${
                                    theme == "bumblebee" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🐝  bumblebee
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="emerald"
                                data-act-class="active"
                                className={`${
                                    theme == "emerald" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                ✳️  Emerald
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="corporate"
                                data-act-class="active"
                                className={`${
                                    theme == "corporate" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🏢  Corporate
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="synthwave"
                                data-act-class="active"
                                className={`${
                                    theme == "synthwave" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🌃  synthwave
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="retro"
                                data-act-class="active"
                                className={`${
                                    theme == "retro" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                👴  retro
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="cyberpunk"
                                data-act-class="active"
                                className={`${
                                    theme == "cyberpunk" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🤖  cyberpunk
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="valentine"
                                data-act-class="active"
                                className={`${
                                    theme == "valentine" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🌸  valentine
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="halloween"
                                data-act-class="active"
                                className={`${
                                    theme == "halloween" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🎃  halloween
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="garden"
                                data-act-class="active"
                                className={`${
                                    theme == "garden" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🌷  garden
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="forest"
                                data-act-class="active"
                                className={`${
                                    theme == "forest" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🌲  forest
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="aqua"
                                data-act-class="active"
                                className={`${theme == "aqua" ? "active" : ""}`}
                                onClick={setThemeMode}
                            >
                                🐟  aqua
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="lofi"
                                data-act-class="active"
                                className={`${theme == "lofi" ? "active" : ""}`}
                                onClick={setThemeMode}
                            >
                                👓  lofi
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="pastel"
                                data-act-class="active"
                                className={`${
                                    theme == "pastel" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🖍  pastel
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="fantasy"
                                data-act-class="active"
                                className={`${
                                    theme == "fantasy" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🧚&zwj;♀️  fantasy
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="wireframe"
                                data-act-class="active"
                                className={`${
                                    theme == "wireframe" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                📝  Wireframe
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="black"
                                data-act-class="active"
                                className={`${
                                    theme == "black" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🏴  black
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="luxury"
                                data-act-class="active"
                                className={`${
                                    theme == "luxury" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                💎  luxury
                            </a>
                        </li>
                        <li>
                            <a
                                tabIndex="0"
                                data-set-theme="dracula"
                                data-act-class="active"
                                className={`${
                                    theme == "dracula" ? "active" : ""
                                }`}
                                onClick={setThemeMode}
                            >
                                🧛&zwj;♂️  dracula
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mb-3">
                <div className="avatar cursor-pointer">
                    <div className=" rounded-full w-10 h-10">
                        <img src="http://daisyui.com/tailwind-css-component-profile-1@40w.png" />
                    </div>
                </div>
            </div>
        </div>
    );
}
