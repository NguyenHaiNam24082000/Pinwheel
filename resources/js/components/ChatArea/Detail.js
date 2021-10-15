import React, { useState, useEffect, useContext } from "react";
import { BsFileEarmark } from "react-icons/bs";
import $ from "jquery";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { BiUpArrow } from "react-icons/bi";
import { SocketContext } from "../../context/socket";

export default function Detail() {
    const { socket } = useContext(SocketContext);
    const { conversations, selectedConversation, selectedConversationId } =
        React.useContext(AppContext);
    const { user } = React.useContext(AuthContext);
    const [mute, setMute] = useState(() => {
        return localStorage.getItem("mic") === null
            ? false
            : localStorage.getItem("mic") === "true"
            ? true
            : false;
    });
    const [soundOff, setSoundOff] = useState(false);
    const [listMic, setListMic] = useState([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            var mediaRecorder = new MediaRecorder(stream);
            var audioChunks = [];
            mediaRecorder.start();
            mediaRecorder.addEventListener("start", function (e) {
                audioChunks = [];
            });

            mediaRecorder.addEventListener("dataavailable", function (event) {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", function () {
                var audioBlob = new Blob(audioChunks, {
                    type: "audio/ogg; codecs=opus",
                });
                if(!mute)
                {
                    socket.emit("voice", audioBlob);
                }
                audioChunks=[];
                // var fileReader = new FileReader();
                // fileReader.readAsDataURL(audioBlob);
                // fileReader.onloadend = function () {
                //         var base64String = fileReader.result;

                // };
                mediaRecorder.start();
                setTimeout(function () {
                    mediaRecorder.stop();
                }, 100);
            });

            setTimeout(function () {
                mediaRecorder.stop();
            }, 100);
        });

        socket.on("sendVoice", function (data) {
            var blob = new Blob([data], { type: "audio/ogg; codecs=opus" });
            var audio = document.createElement("audio");
            audio.src = window.URL.createObjectURL(blob);
            console.log(blob);
            // audio.play();
        });
        // socket.emit("online",user)
        // socket.on("getUsers", (data) => {
        //     console.log("Hello",data)
        // });
        // socket.on("serverSendData", (dataGot) => {
        //     console.log("datagot", dataGot);
        //     setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
        //     scrollToBottom();
        // });

        // socket.on("serverFocusInput", (s) => {
        //     setTyping(s);
        // });

        // socket.on("serverBlurInput", () => {
        //     setTyping("");
        // });
        return () => {};
    }, [mute]);

    const openTabChanel = () => {
        $(".tab").toggleClass("tab-active");
        $(".tab-chanel").addClass("tab-active");
        $(".chanel").show();
        $(".detail").hide();
    };
    const openTabDetail = () => {
        $(".tab").toggleClass("tab-active");
        $(".tab-detail").addClass("tab-active");
        $(".detail").show();
        $(".chanel").hide();
    };
    const onHandleMic = () => {
        let storageKey = "mic";
        if (localStorage.getItem(storageKey) === null) {
            localStorage.setItem(storageKey, "true");
        } else {
            if (mute === false) localStorage.setItem(storageKey, "true");
            else localStorage.setItem(storageKey, "false");
        }
        setMute(localStorage.getItem(storageKey) === "true" ? true : false);
    };

    const onHandleHeadset = () => {
        setSoundOff(!soundOff);
    };

    const getDevices = () => {
        // navigator.mediaDevices
        //     .getUserMedia({ audio: true, video: false })
        //     .then(() => {
        //         navigator.mediaDevices
        //             .enumerateDevices()
        //             .then((mediaDevices) => {
        //                 console.log(JSON.stringify(mediaDevices, null, 2));
        //             });
        //     });
    };

    getDevices();

    return (
        <div className="flex flex-col ml-4 w-3/12 h-full rounded-box drawer-content">
            <div className="flex items-center w-full h-16 border-b text-xl">
                <div className="tabs tabs-boxed w-full">
                    <a
                        className="tab tab-active w-3/6 tab-detail"
                        onClick={openTabDetail}
                    >
                        Detail
                    </a>
                    <a className="tab w-3/6 tab-chanel" onClick={openTabChanel}>
                        Chanels
                    </a>
                </div>
            </div>
            <div
                className="flex flex-col overflow-y-auto w-full detail"
                style={{ height: "calc(100% - 64px)" }}
            >
                <div className="flex flex-col items-center mb-5">
                    <div className="avatar online mt-6 mb-5">
                        <div className="w-20 h-20 mask mask-squircle">
                            <img src={selectedConversation.avatar} />
                        </div>
                    </div>
                    <h3 className="text-xl">
                        {selectedConversation.kind === "friend"
                            ? selectedConversation.alias
                            : selectedConversation.title}
                    </h3>
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

            <div
                className="chanel flex flex-col w-full h-full relative"
                style={{ display: "none" }}
            >
                <div className="hashtag-bar text-sm leading-relaxed overflow-y-auto">
                    <div className="w-full pt-3">
                        <div className="text-lg font-bold">
                            <i className="fas fa-caret-down mr-3"></i>Text
                            Channels
                        </div>
                        <div className="text-base font-bold hover:bg-primary pl-6 py-2 rounded cursor-pointer">
                            <i className="fas fa-hashtag mr-2"></i>Paint
                        </div>
                    </div>
                    <div className="w-full pt-3">
                        <div className="text-lg font-bold">
                            <i className="fas fa-caret-down mr-3"></i>Voice
                            Channels
                        </div>
                        <div className="text-base font-bold hover:bg-primary pl-6 py-2 rounded cursor-pointer">
                            <i className="fas fa-volume-up mr-2"></i>Waiting
                            Rooms
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className="w-full rounded-box bg-base-300 h-14 pl-3 pr-1 py-3 flex items-center justify-between absolute bottom-0">
                    <div className="flex items-center rounded-full">
                        <a href="#" data-tip={user.name} className="tooltip">
                            <img
                                src={user.avatar}
                                alt="avatar"
                                className="w-10 h-10 rounded-full"
                            />
                        </a>
                        <div
                            data-tip={user.name}
                            className="tooltip text-sm ml-2 truncate overflow-ellipsis"
                        >
                            <div className="text-base-content font-bold truncate">
                                {user.name}
                            </div>
                            <div className="text-info text-xxs truncate">
                                #{user.id}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center text-base-content h-12">
                        <div className="relative p-0 dropdown dropdown-top dropdown-end">
                            <button
                                className=" btn mask mask-squircle ml-1 p-2 rounded-box btn-primary hover:text-white tooltip"
                                data-tip="Mute"
                                onClick={onHandleMic}
                            >
                                {!mute ? (
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V21H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1ZM12 4C11.2 4 11 4.66667 11 5V11C11 11.3333 11.2 12 12 12C12.8 12 13 11.3333 13 11V5C13 4.66667 12.8 4 12 4Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V22H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z"
                                            fill="red"
                                        />
                                    </svg>
                                )}
                            </button>
                            <button
                                tabIndex="0"
                                className="absolute bottom-0 -right-1 hover:text-white text-base-300 h-5 w-5 rounded-full border-2 flex justify-center items-center hover:bg-primary-focus bg-primary border-base-300"
                            >
                                <svg width={24} height={24} viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 10L12 15 17 10"
                                        aria-hidden="true"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                tabIndex="0"
                                className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li className="menu-title">
                                    <span>Input devices</span>
                                </li>
                                <li>
                                    <a>
                                        <label className="cursor-pointer label flex justify-between w-full p-0">
                                            <span className="label-text">
                                                Primary
                                            </span>
                                            <input
                                                type="radio"
                                                name="opt"
                                                className="radio radio-primary radio-sm"
                                                value=""
                                            />
                                        </label>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <label className="cursor-pointer label flex justify-between w-full p-0">
                                            <span className="label-text">
                                                Primary
                                            </span>
                                            <input
                                                type="radio"
                                                name="opt"
                                                className="radio radio-primary radio-sm"
                                                value=""
                                            />
                                        </label>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <label className="cursor-pointer label flex justify-between w-full p-0">
                                            <span className="label-text">
                                                Primary 1
                                            </span>
                                            <input
                                                type="radio"
                                                name="opt"
                                                className="radio radio-primary radio-sm"
                                                value=""
                                            />
                                        </label>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="relative p-0 dropdown dropdown-top dropdown-end">
                            <button
                                data-tip="Sound off"
                                className="tooltip btn mask mask-squircle ml-1 p-2 rounded-box btn-primary hover:text-white"
                                onClick={onHandleHeadset}
                            >
                                {!soundOff ? (
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                    >
                                        <svg
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 2.00305C6.486 2.00305 2 6.48805 2 12.0031V20.0031C2 21.1071 2.895 22.0031 4 22.0031H6C7.104 22.0031 8 21.1071 8 20.0031V17.0031C8 15.8991 7.104 15.0031 6 15.0031H4V12.0031C4 7.59105 7.589 4.00305 12 4.00305C16.411 4.00305 20 7.59105 20 12.0031V15.0031H18C16.896 15.0031 16 15.8991 16 17.0031V20.0031C16 21.1071 16.896 22.0031 18 22.0031H20C21.104 22.0031 22 21.1071 22 20.0031V12.0031C22 6.48805 17.514 2.00305 12 2.00305Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </svg>
                                ) : (
                                    <svg
                                        aria-hidden="false"
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M6.16204 15.0065C6.10859 15.0022 6.05455 15 6 15H4V12C4 7.588 7.589 4 12 4C13.4809 4 14.8691 4.40439 16.0599 5.10859L17.5102 3.65835C15.9292 2.61064 14.0346 2 12 2C6.486 2 2 6.485 2 12V19.1685L6.16204 15.0065Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M19.725 9.91686C19.9043 10.5813 20 11.2796 20 12V15H18C16.896 15 16 15.896 16 17V20C16 21.104 16.896 22 18 22H20C21.105 22 22 21.104 22 20V12C22 10.7075 21.7536 9.47149 21.3053 8.33658L19.725 9.91686Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M3.20101 23.6243L1.7868 22.2101L21.5858 2.41113L23 3.82535L3.20101 23.6243Z"
                                            fill="red"
                                        />
                                    </svg>
                                )}
                            </button>
                            <button
                                tabIndex="0"
                                className="absolute bottom-0 -right-1 hover:text-white text-base-300 h-5 w-5 rounded-full border-2 flex justify-center items-center hover:bg-primary-focus bg-primary border-base-300"
                            >
                                <svg width={24} height={24} viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 10L12 15 17 10"
                                        aria-hidden="true"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                tabIndex="0"
                                className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li className="menu-title">
                                    <span>Output devices</span>
                                </li>
                                <li>
                                    <a>
                                        <label className="cursor-pointer label flex justify-between w-full p-0">
                                            <span className="label-text">
                                                Primary
                                            </span>
                                            <input
                                                type="radio"
                                                name="opt"
                                                className="radio radio-primary radio-sm"
                                                value=""
                                            />
                                        </label>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <label className="cursor-pointer label flex justify-between w-full p-0">
                                            <span className="label-text">
                                                Primary
                                            </span>
                                            <input
                                                type="radio"
                                                name="opt"
                                                className="radio radio-primary radio-sm"
                                                value=""
                                            />
                                        </label>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <label className="cursor-pointer label flex justify-between w-full p-0">
                                            <span className="label-text">
                                                Primary
                                            </span>
                                            <input
                                                type="radio"
                                                name="opt"
                                                className="radio radio-primary radio-sm"
                                                value=""
                                            />
                                        </label>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <button
                            data-tip="Setting"
                            className="tooltip btn mask mask-squircle ml-1 p-2 rounded-box m-0 btn-primary hover:text-white"
                        >
                            <svg
                                fill="currentColor"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
