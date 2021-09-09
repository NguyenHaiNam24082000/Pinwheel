import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaPaperPlane } from "react-icons/fa";
import socketIOClient from "socket.io-client";
import { Picker } from "emoji-mart";
import "../../../css/font-effect.css";
import "emoji-mart/css/emoji-mart.css";
import { $ } from "jquery";
const axios = require("axios");
const reactStringReplace = require("react-string-replace");

const host = "http://localhost:8000";
const cors_api_host = "cors-anywhere.herokuapp.com";
const cors_api_url = "https://" + cors_api_host + "/";

export default function Chat() {
    const [showEmoji, setShowEmoji] = useState(false);
    const [mess, setMess] = useState([]);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");
    const [effect, setEffect] = useState("");
    const [id, setId] = useState("");
    const socketRef = useRef();
    const messagesEnd = useRef();
    const emojiList = [
        "😀",
        "😁",
        "😂",
        "🤣",
        "😄",
        "😅",
        "😎",
        "😍",
        "😘",
        "🥰",
        "😗",
        "😋",
        "😊",
        "🤩",
    ];

    useEffect(() => {
        socketRef.current = socketIOClient.connect(host);

        socketRef.current.on("getId", (data) => {
            setId(data);
        });

        socketRef.current.on("serverSendData", (dataGot) => {
            setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
            scrollToBottom();
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (message !== null && message.length !== 0) {
            const msg = {
                effect: effect,
                content: message,
                id: id,
            };
            socketRef.current.emit("clientSendData", msg);
            setMessage("");
        }
    };

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    };

    const normalizeContent = useCallback((content) => {
        const regexLink = /(https?:\/\/\S+)/g;
        let links = "";
        links = content.match(regexLink);
        if (links !== null) {
            let replaceLink = reactStringReplace(
                content,
                regexLink,
                (match, i) => (
                    // <a key={match + i} href={match}>{match}</a>
                    <>
                        <a
                            key={match + i}
                            href={`${
                                match.includes("http")
                                    ? match
                                    : `https://${match}`
                            }`}
                            target="_blank"
                            title=""
                            className="hover:underline text-info"
                            style={{ cursor: "pointer" }}
                        >
                            {match}
                        </a>
                    </>
                )
            );
            return <>{replaceLink}</>;
        } else return <>{content}</>;
    });

    const getImageUrl = useCallback((content) => {
        const parser = new DOMParser();
        axios
            .get(`${cors_api_url}${content}`)
            .then(function (response) {
                const documentoBody = parser.parseFromString(
                    response.data,
                    "text/html"
                );
                var meta = documentoBody.querySelector(
                    'meta[property="og:image"]'
                );
                setImage( meta && meta.getAttribute("content"));
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    const renderMess = mess.map((m, index) => (
        <>
            <div
                key={index}
                className={`flex rounded-box ${
                    m.id === id ? "bg-base-100" : "bg-base-300"
                } p-3 m-4`}
                style={{ width: "calc(100% - 32px)" }}
            >
                <div className="avatar mr-3 online">
                    <div className="w-12 h-12 mask mask-squircle">
                        <img src="https://scontent.fhan5-4.fna.fbcdn.net/v/t1.6435-9/62498267_1122772321257230_1257182363998224384_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=fCfCkv9GMpYAX-5XEzu&_nc_ht=scontent.fhan5-4.fna&oh=8c591abd1ca6feb8e2f44f1acf183c5d&oe=615B52A1" />
                    </div>
                </div>
                <div
                    className="flex flex-col break-words"
                    style={{ width: "calc(100% - 72px)" }}
                >
                    <div className="flex justify-between w-full">
                        <div className="font-bold">Nguyễn</div>
                        <div>24:00</div>
                    </div>
                    <div className={m.effect}>
                        {/* {m.content.match(
                            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/g
                        ) ? (
                            <a
                                href={`${
                                    m.content.includes("http")
                                        ? m.content
                                        : `https://${m.content}`
                                }`}
                                target="_blank"
                                title=""
                                className="hover:underline text-info"
                                style={{ cursor: "pointer" }}
                            >
                                {m.content}
                            </a>
                        ) : (
                            m.content
                        )} */}
                        {normalizeContent(m.content)}
                        {/* {m.content.match(/(https?:\/\/\S+)/g) &&
                            m.content
                                .match(/(https?:\/\/\S+)/g)
                                .map((value, index) => (
                                    <div key={index}>{getImageUrl(value)}<img src={image} /></div>
                                ))} */}
                    </div>
                </div>
            </div>
            {/* <div className="divider px-3">Last month</div>
                <div
                    className="flex rounded-box bg-base-300 p-3 m-4"
                    style={{ width: "calc(100% - 32px)" }}
                >
                    <div className="avatar mr-3 online">
                        <div className="w-12 h-12 mask mask-squircle">
                            <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
                        </div>
                    </div>
                    <div
                        className="flex flex-col break-words"
                        style={{ width: "calc(100% - 72px)" }}
                    >
                        <div className="flex justify-between w-full">
                            <div className="font-bold">Nguyễn</div>
                            <div>24:00</div>
                        </div>
                        <div>
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                        </div>
                    </div>
                </div> */}
        </>
    ));

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            sendMessage();
        }
    };

    const emojiHover = () => {
        let max = emojiList.length;
        let index = Math.floor(Math.random() * max);
        document.getElementById("emoji").innerHTML = emojiList[index];
    };

    const openPicker = useCallback(
        function () {
            let isShowEmoji = showEmoji;
            setShowEmoji(!isShowEmoji);
        },
        [showEmoji]
    );

    const addEmoji = (emoji) => {
        console.log(emoji);
        setMessage(message + emoji.native);
    };

    return (
        <div
            className="flex flex-col bg-base-200 w-6/12 h-full rounded-box"
            style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage:
                    "url(https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/241211637_3221420104649102_3802586585466076299_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=Pig8M3EWf1QAX8OrZPf&_nc_ht=scontent.fsgn5-6.fna&oh=c01379979281376f43b527acb3c1ca64&oe=613BACD0)",
            }}
        >
            <input type="file" name="file" hidden={true} />
            <div
                className="flex items-center w-full h-20 border-b text-xl justify-between"
                style={{
                    background: "rgba(255,255,255,0.3)",
                    borderTopLeftRadius: "var(--rounded-box,1rem)",
                    borderTopRightRadius: "var(--rounded-box,1rem)",
                }}
            >
                <div className="ml-4 font-bold text-black">CNTT4K59</div>
                <div className="-space-x-5 avatar-group mr-4">
                    <div
                        className="avatar"
                        style={{ border: "none !important" }}
                    >
                        <div className="w-8 h-8">
                            <img src="http://daisyui.com/tailwind-css-component-profile-1@40w.png" />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-8 h-8">
                            <img src="http://daisyui.com/tailwind-css-component-profile-2@40w.png" />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-8 h-8">
                            <img src="http://daisyui.com/tailwind-css-component-profile-3@40w.png" />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-8 h-8">
                            <img src="http://daisyui.com/tailwind-css-component-profile-5@40w.png" />
                        </div>
                    </div>
                    <div className="avatar placeholder">
                        <div className="w-8 h-8 rounded-full bg-neutral-focus text-neutral-content">
                            <span>+99</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full h-full overflow-y-auto">
                {renderMess}
                <div
                    style={{ float: "left", clear: "both" }}
                    ref={messagesEnd}
                ></div>
            </div>
            <div
                className="flex rounded-box bg-base-300 h-14 m-4 items-center"
                style={{ width: "calc(100% - 32px)" }}
            >
                {/* <div className="w-10 h-14 flex justify-center items-center ml-3">
                            <BsFileEarmark className="w-full h-full"/>
                        </div> */}
                <div className="bg-transparent w-full">
                    <div className="form-control">
                        <input
                            value={message}
                            onKeyDown={onEnterPress}
                            onChange={handleChange}
                            type="text"
                            placeholder="Abc..."
                            className={`input input-ghost focus:bg-transparent ${effect}`}
                        />
                    </div>
                </div>
                <div className="flex items-center position-relative">
                    <div className="dropdown dropdown-top">
                        <div
                            tabIndex="0"
                            className="btn h-10  rounded-l text-base-content bg-transparent hover:bg-transparent border-0 hover:text-gray-500"
                        >
                            <svg
                                fill="currentColor"
                                viewBox="0 0 512 512"
                                className="w-6 h-6"
                            >
                                <path d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm448-288h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40zm-72 320h160c17.7 0 32-14.3 32-32V320H288v160z" />
                            </svg>
                        </div>
                        <ul
                            tabIndex="0"
                            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a
                                    onClick={() => {
                                        setEffect("");
                                    }}
                                >
                                    Default
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-neon"
                                    onClick={() => {
                                        setEffect("font-effect-neon");
                                    }}
                                >
                                    Neon
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-fire"
                                    onClick={() => {
                                        setEffect("font-effect-fire");
                                    }}
                                >
                                    Fire
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-shadow-multiple"
                                    onClick={() => {
                                        setEffect(
                                            "font-effect-shadow-multiple"
                                        );
                                    }}
                                >
                                    Shadow Multiple
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-outline"
                                    onClick={() => {
                                        setEffect("font-effect-outline");
                                    }}
                                >
                                    Outline
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-emboss"
                                    onClick={() => {
                                        setEffect("font-effect-emboss");
                                    }}
                                >
                                    Emboss
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-3d"
                                    onClick={() => {
                                        setEffect("font-effect-3d");
                                    }}
                                >
                                    3D
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-3d-float"
                                    onClick={() => {
                                        setEffect("font-effect-3d-float");
                                    }}
                                >
                                    3D Float
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-anaglyph"
                                    onClick={() => {
                                        setEffect("font-effect-anaglyph");
                                    }}
                                >
                                    Anaglyph
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-gradient"
                                    onClick={() => {
                                        setEffect("font-effect-gradient");
                                    }}
                                >
                                    Gradient
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-shadow"
                                    data-shadow="Shadow"
                                    onClick={() => {
                                        setEffect("font-effect-shadow");
                                    }}
                                >
                                    Shadow
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-breathe"
                                    onClick={() => {
                                        setEffect("font-effect-breathe");
                                    }}
                                >
                                    Breathe
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-smoke"
                                    onClick={() => {
                                        setEffect("font-effect-smoke");
                                    }}
                                >
                                    Smoke
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-effect-bopping"
                                    onClick={() => {
                                        setEffect("font-effect-bopping");
                                    }}
                                >
                                    Bopping
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <button className="h-10  rounded-l text-base-content hover:text-gray-500">
                        <svg
                            fill="currentColor"
                            viewBox="0 0 512 512"
                            className="w-6 h-6"
                        >
                            <path d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm448-288h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40zm-72 320h160c17.7 0 32-14.3 32-32V320H288v160z" />
                        </svg>
                    </button> */}
                    <button className="h-10  rounded-l text-base-content hover:text-gray-500">
                        <svg
                            fill="currentColor"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            className="w-8 h-8"
                        >
                            <defs>
                                <path id="a" d="M24 24H0V0h24v24z" />
                            </defs>
                            <clipPath id="b">
                                <use xlinkHref="#a" overflow="visible" />
                            </clipPath>
                            <path
                                d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"
                                clipPath="url(#b)"
                            />
                        </svg>
                    </button>
                    {showEmoji && (
                        <Picker
                            onSelect={addEmoji}
                            title="Pick your emoji…"
                            style={{
                                position: "absolute",
                                bottom: "80px",
                                right: "auto",
                                zIndex: "50",
                            }}
                            theme={"dark"}
                        />
                    )}
                    <button
                        id="emoji"
                        className="h-10  rounded-l ml-3 text-2xl"
                        onMouseOver={emojiHover}
                        onClick={openPicker}
                    >
                        😃
                    </button>
                    <button
                        className="btn rounded-box btn-xl ml-3 btn-primary "
                        onClick={sendMessage}
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
}
