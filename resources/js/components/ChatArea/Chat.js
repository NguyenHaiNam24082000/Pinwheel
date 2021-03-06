import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    useContext,
} from "react";
import { MentionsInput, Mention } from "react-mentions";
import {
    FaPaperPlane,
    FaVideo,
    FaIdCard,
    FaTasks,
    FaExclamation,
    FaGoogleDrive,
} from "react-icons/fa";
import {
    IoImages,
    IoDocumentAttach,
    IoAlarm,
    IoFlash,
    IoFolderOpen,
    IoLocation,
} from "react-icons/io5";
import { IoIosMic } from "react-icons/io";
import { GiSoundWaves } from "react-icons/gi";
import { Picker } from "emoji-mart";
import "../../../css/font-effect.css";
import MentionsStyle from "../../../css/mentions.css";
import "emoji-mart/css/emoji-mart.css";
import { Howl, Howler } from "howler";
import $ from "jquery";
const axios = require("axios").default;
import { SocketContext } from "../../context/socket";
import Message from "./Message";
import SmoothList from "react-smooth-list";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { storage } from "../../firebase";
import {
    BsBoxArrowDownRight,
    BsBoxArrowInDownRight,
    BsPlusSquare,
} from "react-icons/bs";
import { CgMoreR } from "react-icons/cg";
import Modal from "../Modals/Modal";
import { GiphyFetch } from "@giphy/js-fetch-api";
import useGeoLocation from "../../hooks/useGeoLocation";
import {
    Carousel,
    Gif,
    Grid,
    Video,
    VideoOverlay,
} from "@giphy/react-components";

const giphyFetch = new GiphyFetch("GKetK6r9PK36VryDvQkb8Y01AW8YyO80");
function CarouselDemo() {
    const fetchGifs = (offset) =>
        giphyFetch.search("dogs", { offset, limit: 10 });
    return <Carousel fetchGifs={fetchGifs} gifHeight={200} gutter={6} />;
}
const SpeechRecognizer =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition;
const mic = new SpeechRecognizer();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "vi-VI";

const neverMatchingRegex = /($a)/;

// const users = [
//     {
//         _id: "123",
//         name: { first: "John", last: "Reynolds" },
//         avatar: "https://lh3.googleusercontent.com/a-/AOh14GhK-ARhz1b_aBShQFBFN2I7qgGX_x6QjOxFI6O8=s96-c",
//     },
//     {
//         _id: "234",
//         name: { first: "Holly", last: "Reynolds" },
//         avatar: "https://lh3.googleusercontent.com/a-/AOh14GhK-ARhz1b_aBShQFBFN2I7qgGX_x6QjOxFI6O8=s96-c",
//     },
//     {
//         _id: "345",
//         name: { first: "Ryan", last: "Williams" },
//         avatar: "https://lh3.googleusercontent.com/a-/AOh14GhK-ARhz1b_aBShQFBFN2I7qgGX_x6QjOxFI6O8=s96-c",
//     },
// ];

function Chat() {
    const {
        conversations,
        selectedConversation,
        selectedConversationId,
        setOpenDetail,
        openDetail,
    } = useContext(AppContext);
    const [maxMessId, setMaxMessId] = useState(0);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const { user } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const [showEmoji, setShowEmoji] = useState(false);
    const [showEmojiIcon, setShowEmojiIcon] = useState(false);
    const [openModalBookmark, setOpenModalBookmark] = useState(false);
    const [mess, setMess] = useState([]);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState();
    const [effect, setEffect] = useState("");
    const [typing, setTyping] = useState("");
    const messagesEnd = useRef();
    const [play, setPlay] = useState(false);
    const [images, setImages] = useState([]);
    const [emojis, setEmojis] = useState([]);
    const [users, setUsers] = useState([]);
    const [openModalImagePreview, setOpenModalImagePreview] = useState(false);
    const [imagePreview, setImagePreview] = useState({ id: "-1", src: "" });
    const [KaomojiAngry, setKaomojiAngry] = useState([]);
    const [KaomojiBadMood, setKaomojiBadMood] = useState([]);
    const [KaomojiBear, setKaomojiBear] = useState([]);
    const [KaomojiBeg, setKaomojiBeg] = useState([]);
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("????");
    const [link, setLink] = useState("");
    const [bookmark, setBookmark] = useState([]);
    const [description, setDescription] = useState("");
    const emojiList = [
        "????",
        "????",
        "????",
        "????",
        "????",
        "????",
        "????",
        "????",
        "????",
        "????",
        "????",
        "????",
        "????",
        "????",
    ];
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        setUrl(url);
                    });
            }
        );
    };

    useEffect(() => {
        // socket.emit("online",user)
        // socket.on("getUsers", (data) => {
        //     console.log("Hello",data)
        // });
        axios.get("/api/chat").then((res) => {
            setMaxMessId(Math.max(...res.data.chat.map((chat) => chat.id)));
        });
        fetch(
            "https://raw.githubusercontent.com/towzeur/Japanese-Emoticons-json/master/Japanese_Emoticons.json"
        )
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                console.log(jsonData.angry);
                setKaomojiAngry(jsonData.angry);
            });
        fetch(
            "https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json"
        )
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setEmojis(jsonData.emojis);
            });
        socket.on("serverSendData", (dataGot) => {
            console.log("datagot", dataGot);
            setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
            scrollToBottom();
        });

        socket.on("serverFocusInput", (s) => {
            setTyping(s);
        });

        socket.on("serverBlurInput", () => {
            setTyping("");
        });
        return () => {};
    }, []);
    const [imageGallery, setImageGallery] = useState([]);
    const [docGallery, setDocGallery] = useState([]);
    useEffect(() => {
        setMess([]);
        axios
            .get(
                `/api/getAllBookmark/?conversation_id=${selectedConversationId}`
            )
            .then((res) => {
                setBookmark([...res.data]);
                console.log(res);
            });
        axios
            .get(`/api/getalllink/?conversation_id=${selectedConversationId}`)
            .then((response) => {
                setImageGallery([
                    ...response.data.filter((x) => x.kind === "photo"),
                ]);
                setDocGallery([
                    ...response.data.filter((x) => x.kind === "document"),
                ]);
            });
        axios
            .get(`/api/chat/get/?conversation_id=${selectedConversationId}`)
            .then(function (response) {
                // handle success
                setMess([...response.data.chat]);
                scrollToBottom();
                console.log("chat", response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        axios
            .get(
                `api/conversation/getUsers/?conversation_id=${selectedConversationId}`
            )
            .then(function (response) {
                // handle success
                setUsers([...response.data]);
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        // setMess([]);
        const data = { ...user, selectedConversationId };
        socket.emit("joinConversation", data);
        return () => {};
    }, [conversations, selectedConversationId]);

    const addBookmark = () => {
        axios
            .post(
                `/api/postBookmark/?conversation_id=${selectedConversationId}&creator_id=${user.id}&link=${link}&title=${title}&description=${description}&icon=${icon}`
            )
            .then((res) => {
                setBookmark((data) => [...data, res.data.bookmarks]);
                console.log(res);
            });
    };
    const handleLink = (e) => {
        setLink(e.target.value);
    };
    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const queryEmojis = (query, callback) => {
        if (query.length === 0) return;

        const matches = emojis
            .filter((emoji) => {
                return emoji.name.indexOf(query.toLowerCase()) > -1;
            })
            .slice(0, 10);
        return matches.map(({ emoji, shortname }) => ({
            id: emoji,
            display: `${emoji} ${shortname}`,
        }));
    };

    const queryKaomoji = KaomojiAngry.map((value, index) => ({
        id: `${value}`,
        display: `${value}`,
    }));

    const sendMessage = () => {
        if (message !== null && message.length !== 0) {
            var sound = new Howl({
                src: ["../../../assets/sounds/message/message-long-pop.wav"],
                autoplay: true,
                loop: false,
                volume: 0.75,
                onend: function () {
                    console.log("Finished!");
                },
            });
            sound.play();
            const msg = {
                effect: effect,
                content: message,
                images: images,
                created_at: new Date(),
            };
            console.log({
                sender_id: user.id,
                conversation_id: selectedConversationId,
                kind: "text",
                effect: effect === null || effect.length === 0 ? "''" : effect,
                content: message,
                created_at: new Date().getTime(),
            });
            //todo image
            // axios.post("/api/chat/post", {
            //     sender_id: user.id,
            //     conversation_id: selectedConversationId,
            //     kind: "text",
            //     effect: effect === null || effect.length === 0 ? "''" : effect,
            //     content: message,
            // });
            // setMaxMessId(maxMessId + 1);
            if (images !== null) {
                axios.post("/api/chat/post", {
                    sender_id: user.id,
                    conversation_id: selectedConversationId,
                    kind: "photo",
                    effect:
                        effect === null || effect.length === 0 ? "''" : effect,
                    content: message,
                });
                // let max;
                // axios.get("/api/chat").then((res) => {
                //     max = Math.max(...res.data.chat.map((chat) => chat.id));
                // });
                // console.log(max);
                const data = new FormData();
                for (let i = 0; i < images.length; i++) {
                    data.append("images[]", images[i].target);
                    data.append("message_id", maxMessId + 1);
                }
                axios.post("/api/uploadImage", data).then((response) => {
                    if (response.status === 200) {
                        console.log(response);
                        setTimeout(() => {
                            setImages([]);
                        }, 500);
                    }
                });
            } else {
                axios.post("/api/chat/post", {
                    sender_id: user.id,
                    conversation_id: selectedConversationId,
                    kind: "text",
                    effect:
                        effect === null || effect.length === 0 ? "''" : effect,
                    content: message,
                });
            }
            socket.emit("clientSendData", msg);
            setMessage("");
        }
    };

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    };

    const renderMess = mess.map((m, index) => (
        <SmoothList key={index + user.id}>
            <Message
                userId={user.id}
                messageId={m.id}
                mid={m.message_id}
                effect={m.effect}
                content={m.content}
                avatar={m.avatar}
                name={m.name}
                images={m.images}
                imageGallery={m.kind === "photo" ? imageGallery : null}
                docGallery={m.kind === "document" ? docGallery : null}
                time={new Date(m.created_at).getTime()}
            />
        </SmoothList>
    ));

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
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

    const openPickerIcon = useCallback(
        function () {
            let isShowEmoji = showEmojiIcon;
            setShowEmojiIcon(!isShowEmoji);
        },
        [showEmojiIcon]
    );

    const addEmojiIcon = (emoji) => {
        console.log(emoji);
        setIcon(emoji.native);
    };

    const addEmoji = (emoji) => {
        console.log(emoji);
        setMessage(message + emoji.native);
    };

    const makeCall = () => {
        // var sound = new Howl({
        //     src: ["../../../assets/sounds/call/tick-tock-clock-timer.wav"],
        //     autoplay: true,
        //     loop: true,
        //     volume: 0.75,
        //     onend: function () {
        //         console.log("Finished!");
        //     },
        // });
        // sound.play();
        const w = window.outerWidth;
        const h = window.outerHeight;
        const WIDTH = (window.outerWidth * 90) / 100;
        const HEIGHT = (window.outerHeight * 90) / 100;
        const left = Math.max(0, w / 2 - WIDTH / 2);
        const top = Math.max(0, h / 2 - HEIGHT / 2);
        const config = `width=${WIDTH}, height=${HEIGHT}, top=${top}, left=${left}`;
        window.open("/videocall", "Video Call", config);
    };

    const pasteFromClipBoard = (e) => {
        if (e.clipboardData.files.length > 0) {
            const file = document.querySelector("#file");
            file.files = e.clipboardData.files;
            if (e.clipboardData.files[0].type.startsWith("image/")) {
                $(".count-file-list").css("display", "inline-block");
                $(".preview-list").css("display", "inline-block");
                previewImage(e.clipboardData.files[0]);
            }
        }
    };

    const previewImage = (file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (images.length < 10) {
                setImages((image) => [
                    ...image,
                    { id: images.length, src: fileReader.result, target: file },
                ]);
                // $(".preview-list")
                //     .append(`<div class="inline-block ml-3 mt-3 rounded-box relative" style="width: 108px;height: 108px">
                //                     <i class="far fa-times-circle absolute top-2 right-2 cursor-pointer"></i>
                //                     <img src='${fileReader.result}' class="w-full h-full rounded-box"></img>
                //                 </div>`);
                console.log(images);
                $("#count-file").text($(".preview-list").children().length);
            } else {
                $("#count-file").css("color", "red");
            }
        };
    };

    const openImageFile = () => {
        $("#file").click();
    };

    const openFile = () => {
        $("#file").click();
    };

    const changeInputFile = () => {
        const files = document.querySelector("#file").files;
        for (var i = 0; i < files.length; ++i) {
            if (/\.(jpe?g|png|gif)$/i.test(files[i].name)) {
                // $(".count-file-list").css("display", "inline-block");
                // $(".preview-list").css("display", "inline-block");
                previewImage(files[i]);
            }
        }
    };

    const onFocusInput = () => {
        socket.emit("focusInput");
    };

    const onBlurInput = () => {
        socket.emit("blurInput");
    };

    const onHandleKeyUp = (e) => {
        $("#chatTextArea").css("height", `56px`);
        let textAreaHeight = e.target.scrollHeight;
        $("#chatTextArea").css("height", `${textAreaHeight}px`);
    };

    const userMentionData = users.map((myUser) => ({
        id: myUser.id,
        display: myUser.name,
        image: myUser.avatar,
    }));

    const removeImage = (id) => {
        setImages(images.filter((img) => img.id !== id));
    };

    const onHandlePreview = (src) => {
        setImagePreview(src);
        setOpenModalImagePreview(true);
    };

    const speechToText = () => {};
    const location = useGeoLocation();
    const showLocation = () => {
        if (location.loaded && !location.error) {
            console.log(location);
            setMessage(
                `[map:{lat:"${location.coordinates.lat}",lng:"${location.coordinates.lng}"}]`
            )(sendMessage())();
        } else {
            alert(location.error.message);
        }
    };

    return (
        <div
            className={`flex flex-col bg-base-200 h-full rounded-box relative drawer-content ${
                openDetail === true ? "w-6/12" : "w-9/12"
            }`}
            style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                // backgroundImage: "url(https://source.unsplash.com/random)",
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1539213492139-7b268eb93c82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80)",
            }}
        >
            <input
                type="file"
                name="file"
                hidden={true}
                accept="image/*"
                id="file"
                multiple
                onChange={changeInputFile}
            />
            {/* <div
                className="absolute w-full h-full rounded-box z-20"
                style={{
                    background: "rgba(255,255,255,0.9)",
                }}
            > */}
            {/* <div
                    className="m-3 border-4 border-dashed border-primary rounded-box flex flex-col justify-center items-center text-black"
                    style={{
                        borderRadius: "12px",
                        width: "calc(100% - 24px)",
                        height: "calc(100% - 24px)",
                    }}
                >
                    <div className="intro flex justify-center items-center flex-col text-primary">
                        <h4 className="font-bold text-5xl mb-3">No recents</h4>
                        <p className="text-3xl text-black">
                            Drag &amp; Drop to upload
                        </p>
                    </div>
                    <div className="center">
                        <div className="circle">
                            <svg viewBox="0 0 92 92" fill="currentColor">
                                <path d="M46,80 C55.3966448,80 63.9029705,76.1880913 70.0569683,70.0262831 C76.2007441,63.8747097 80,55.3810367 80,46 C80,36.6003571 76.1856584,28.0916013 70.0203842,21.9371418 C63.8692805,15.7968278 55.3780386, 12 46, 12 C36.596754, 12 28.0850784,15.8172663 21.9300655,21.9867066 C15.7939108,28.1372443 12,36.6255645 12,46 C12,55.4035343 15.8175004,63.9154436 21.9872741,70.0705007 C28.1377665,76.2063225 36.6258528,80 46,80 Z"></path>
                            </svg>
                        </div>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.2319,10.6401 C5.5859,11.0641 6.2159,11.1221 6.6399,10.7681 L10.9999,7.1351 L10.9999,19.0001 C10.9999,19.5521 11.4479,20.0001 11.9999,20.0001 C12.5519,20.0001 12.9999,19.5521 12.9999,19.0001 L12.9999,7.1351 L17.3599,10.7681 C17.7849,11.1221 18.4149,11.0641 18.7679,10.6401 C19.1219,10.2161 19.0649,9.5851 18.6399,9.2321 L12.6399,4.2321 C12.5929,4.1921 12.5369,4.1731 12.4849,4.1431 C12.4439,4.1191 12.4079,4.0911 12.3629,4.0731 C12.2459,4.0271 12.1239,4.0001 11.9999,4.0001 C11.8759,4.0001 11.7539,4.0271 11.6369,4.0731 C11.5919,4.0911 11.5559,4.1191 11.5149,4.1431 C11.4629,4.1731 11.4069,4.1921 11.3599,4.2321 L5.3599,9.2321 C4.9359,9.5851 4.8779,10.2161 5.2319,10.6401"></path>
                        </svg>
                    </div>
                </div> */}
            {/* </div> */}
            <div className="w-full inline-flex absolute h-28 flex-col">
                <div
                    className="inline-flex items-center w-full h-full border-b text-xl justify-between h-16"
                    style={{
                        background: "rgba(255,255,255,0.3)",
                        borderTopLeftRadius: "var(--rounded-box,1rem)",
                        borderTopRightRadius: "var(--rounded-box,1rem)",
                    }}
                >
                    <div className="ml-4 font-bold text-black flex items-center">
                        <div className="avatar online mr-3">
                            <div className="rounded-full w-10 h-10">
                                <img src={selectedConversation.avatar} />
                            </div>
                        </div>
                        {selectedConversation.kind === "friend"
                            ? selectedConversation.alias
                            : selectedConversation.title}
                    </div>
                    <div className="flex  mr-4">
                        <button
                            className="btn btn-primary btn-square mask mask-squircle justify-center items-center mr-3"
                            // onClick={makeCall}
                            onClick={() => {
                                makeCall();
                                // setPlay(!play);
                            }}
                        >
                            <FaVideo className="w-5 h-5" />
                        </button>
                        <button
                            className="btn btn-primary btn-square mask mask-squircle justify-center items-center"
                            onClick={() => {
                                setOpenDetail(!openDetail);
                            }}
                        >
                            {openDetail === true ? (
                                <BsBoxArrowDownRight className="w-5 h-5" />
                            ) : (
                                <BsBoxArrowInDownRight className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
                <div
                    className="flex px-3 py-1 border-b overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.3)",
                    }}
                >
                    <button
                        onClick={() => setOpenModalBookmark(true)}
                        className="cursor-pointer rounded h-8 px-3 btn-primary text-base inline-flex items-center w-auto mr-2 truncate"
                        style={{ maxWidth: "176px" }}
                    >
                        <BsPlusSquare className="mr-3"></BsPlusSquare>
                        <span className="truncate overflow-ellipsis">
                            Add a bookmark
                        </span>
                    </button>
                    {bookmark &&
                        bookmark.map((value, index) => (
                            <a
                                key={index + value}
                                target="_blank"
                                href={value.link}
                                className="cursor-pointer rounded h-8 px-3 btn-primary text-base inline-flex items-center w-auto mr-2 truncate"
                                style={{ maxWidth: "176px" }}
                            >
                                <div className="mr-3">{value.icon}</div>
                                <span className="truncate overflow-ellipsis">
                                    {value.title}
                                </span>
                            </a>
                        ))}
                    {/* <a
                        target="_blank"
                        href="https://www.facebook.com/"
                        className="cursor-pointer rounded h-8 px-3 btn-primary text-base inline-flex items-center w-auto mr-2 truncate"
                        style={{ maxWidth: "176px" }}
                    >
                        <BsPlusSquare className="mr-3"></BsPlusSquare>
                        <span className="truncate overflow-ellipsis">Fb</span>
                    </a>
                    <a
                        target="_blank"
                        href="https://www.facebook.com/"
                        className="cursor-pointer rounded h-8 px-3 btn-primary text-base inline-flex items-center w-auto mr-2 truncate"
                        style={{ maxWidth: "176px" }}
                    >
                        <BsPlusSquare className="mr-3"></BsPlusSquare>
                        <span className="truncate overflow-ellipsis">
                            Add a bookmark
                        </span>
                    </a>
                    <a className="rounded h-8 px-3 btn-primary text-base inline-flex items-center w-12 mr-2 truncate justify-center">
                        <CgMoreR></CgMoreR>
                    </a> */}
                </div>
            </div>
            <div className="flex flex-col w-full h-full overflow-y-auto mt-28 overflow-x-hidden">
                {renderMess}
                <div
                    style={{ float: "left", clear: "both" }}
                    ref={messagesEnd}
                ></div>
            </div>
            <div className="flex mx-5">
                {typing && (
                    <>
                        <div className="typing ">
                            <span className="circle scaling bg-primary"></span>
                            <span className="circle scaling bg-primary"></span>
                            <span className="circle scaling bg-primary"></span>
                        </div>
                        {typing} ...
                    </>
                )}
            </div>
            {/* <CarouselDemo /> */}
            <div
                className={`flex flex-col h-auto rounded-box bg-base-300 ${
                    typing === "" ? "m-4" : "mx-4 mb-4"
                } items-center`}
                style={{ width: "calc(100% - 32px)" }}
            >
                {/* <div className="w-10 h-14 flex justify-center items-center ml-3">
                            <BsFileEarmark className="w-full h-full"/>
                        </div> */}
                <div className="flex justify-start w-full">
                    <div
                        className="dropdown dropdown-top tooltip"
                        data-tip="???nh"
                    >
                        <button className="btn btn-primary bg-transparent border-0 cursor-pointer btn-square btn-xl mr-1">
                            <IoImages className="w-5 h-5 text-base-content" />
                        </button>
                        <ul
                            tabIndex="0"
                            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-72"
                        >
                            <li>
                                <a onClick={openImageFile}>
                                    <IoFolderOpen className="mr-2" />
                                    Ch???n t??? t???p tin
                                </a>
                            </li>
                            <li>
                                <a>Ch???p m??n h??nh</a>
                            </li>
                            <li>
                                <a>Ch???p ???nh</a>
                            </li>
                            <li>
                                <a>
                                    <img
                                        src="../../../images/meme.svg"
                                        className="w-10 h-10 mr-2"
                                    />
                                    T???o ???nh meme{" "}
                                    <span className="badge ml-2 badge-outline">
                                        new
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div
                        className="dropdown dropdown-top tooltip"
                        data-tip="????nh k??m file"
                    >
                        <button className="btn btn-primary bg-transparent border-0 cursor-pointer btn-square btn-xl mr-1">
                            <IoDocumentAttach className="w-5 h-5 text-base-content" />
                        </button>
                        <ul
                            tabIndex="0"
                            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-64"
                        >
                            <li>
                                <a onClick={openFile}>
                                    <IoFolderOpen className="mr-2" />
                                    Ch???n t??? t???p tin
                                </a>
                            </li>
                            <li>
                                <a>
                                    <FaGoogleDrive className="mr-2" /> G???i t???
                                    Google Drive
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="tooltip" data-tip="G???i danh thi???p">
                        <button className="btn btn-primary  bg-transparent border-0 cursor-pointer btn-square btn-xl mr-1">
                            <FaIdCard className="w-5 h-5 text-base-content" />
                        </button>
                    </div>
                    <div className="tooltip" data-tip="T???o nh???c h???n">
                        <button className="btn btn-primary bg-transparent border-0 cursor-pointer btn-square btn-xl mr-1">
                            <IoAlarm className="w-5 h-5 text-base-content" />
                        </button>
                    </div>
                    <div className="tooltip" data-tip="Giao vi???c">
                        <button className="btn btn-primary bg-transparent border-0 cursor-pointer btn-square btn-xl mr-1">
                            <FaTasks className="w-5 h-5 text-base-content" />
                        </button>
                    </div>
                    <div
                        className="dropdown dropdown-top tooltip"
                        data-tip="Tin nh???n ??u ti??n"
                    >
                        <button className="btn btn-primary bg-transparent border-0 cursor-pointer btn-square btn-xl mr-1">
                            <FaExclamation className="w-5 h-5 text-base-content" />
                        </button>
                        <ul
                            tabIndex="0"
                            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a>Quan tr???ng</a>
                            </li>
                            <li>
                                <a>Kh???n c???p</a>
                            </li>
                        </ul>
                    </div>
                    <div
                        className="dropdown dropdown-top tooltip"
                        data-tip="??m thanh"
                    >
                        <button className="btn btn-primary bg-transparent border-0 cursor-pointer btn-square btn-xl mr-1">
                            <GiSoundWaves className="w-5 h-5 text-base-content" />
                        </button>
                        <ul
                            tabIndex="0"
                            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a href="/login">
                                    <IoFolderOpen className="mr-2" />
                                    Ch???n t??? t???p tin
                                </a>
                            </li>
                            <li>
                                <a>??m thanh h??? th???ng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="tooltip" data-tip="Tin nh???n nhanh">
                        <button className="btn btn-primary bg-transparent border-0 cursor-pointer btn-square btn-xl mr-1">
                            <IoFlash className="w-5 h-5 text-base-content" />
                        </button>
                    </div>
                    <div className="tooltip" data-tip="V??? tr?? c???a t??i">
                        <button
                            className="btn btn-primary bg-transparent border-0 cursor-pointer btn-square btn-xl mr-1"
                            onClick={showLocation}
                        >
                            <IoLocation className="w-5 h-5 text-base-content" />
                        </button>
                    </div>
                </div>
                <div
                    className="w-full h-10 p-3 count-file-list"
                    style={{
                        display: `${
                            images.length > 0 ? "inline-block" : "none"
                        }`,
                    }}
                >
                    ????<span id="count-file">{images.length}</span>/10 file ???????c
                    ch???n
                </div>
                <div
                    className="w-full h-32 preview-list overflow-x-auto relative"
                    style={{
                        display: `${
                            images.length > 0 ? "inline-block" : "none"
                        }`,
                    }}
                >
                    {images &&
                        images.map((value, index) => (
                            <div
                                key={index + value}
                                className="inline-block ml-3 mt-3 rounded-box relative"
                                style={{ width: "108px", height: "108px" }}
                            >
                                <i
                                    className="far fa-times-circle absolute top-2 right-2 cursor-pointer"
                                    onClick={() => removeImage(index)}
                                ></i>
                                <img
                                    src={value.src}
                                    className="w-full h-full rounded-box"
                                    onClick={() => onHandlePreview(value)}
                                ></img>
                            </div>
                        ))}
                </div>
                <div className="flex w-full">
                    <div className="bg-transparent w-full">
                        <div className="form-control">
                            <MentionsInput
                                value={message}
                                // value={"Hi @{{user||123||John Reynolds}}"}
                                markup="@{{__type__||__id__||__display__}}"
                                onKeyDown={onEnterPress}
                                onKeyUp={(e) => onHandleKeyUp(e)}
                                onFocus={onFocusInput}
                                onBlur={onBlurInput}
                                onChange={handleChange}
                                type="text"
                                placeholder="Abc..."
                                onPaste={pasteFromClipBoard}
                                id="chatTextArea"
                                className={`mentions ${effect}`}
                                forceSuggestionsAboveCursor={true}
                                // classNames={MentionsStyle}
                                // className={`input input-ghost focus:bg-transparent ${effect} resize-none p-3 border-none outline-none`}
                                allowSuggestionsAboveCursor={true}
                            >
                                <Mention
                                    trigger="@"
                                    data={userMentionData}
                                    className="mentions__mention"
                                    renderSuggestion={(
                                        suggestion,
                                        search,
                                        highlightedDisplay,
                                        index,
                                        focused,
                                        entry
                                    ) => (
                                        <div className="flex items-center">
                                            <div className="avatar mr-3">
                                                <div className="rounded-full w-8 h-8">
                                                    <img
                                                        src={suggestion.image}
                                                    />
                                                </div>
                                            </div>
                                            {highlightedDisplay}
                                        </div>
                                    )}
                                    appendSpaceOnAdd={true}
                                    displayTransform={(id, display) => {
                                        return `@${display}`;
                                    }}
                                    // renderSuggestion={this.renderUserSuggestion}
                                />
                                <Mention
                                    trigger=":"
                                    markup="__id__"
                                    regex={neverMatchingRegex}
                                    data={queryEmojis}
                                />
                                <Mention
                                    className="mentions__mention"
                                    forceSuggestionsAboveCursor={true}
                                    trigger="~/"
                                    markup="__id__"
                                    allowSuggestionsAboveCursor={true}
                                    regex={neverMatchingRegex}
                                    data={queryKaomoji}
                                    appendSpaceOnAdd={true}
                                />
                                {/* <Mention
                                    trigger="#"
                                    data={this.requestTag}
                                    renderSuggestion={this.renderTagSuggestion}
                                /> */}
                            </MentionsInput>
                        </div>
                    </div>
                    <div className="flex items-center position-relative">
                        <div
                            style={{ padding: "0" }}
                            className="btn h-10  rounded-l text-base-content bg-transparent hover:bg-transparent border-0 hover:text-gray-500"
                        >
                            <IoIosMic
                                className="w-6 h-6"
                                onClick={speechToText}
                            />
                        </div>
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
                                title="Pick your emoji???"
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
                            ????
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
            <Modal
                handleClose={() => setOpenModalBookmark(false)}
                show={openModalBookmark}
            >
                <div className="text-black text-xl font-bold">
                    Add a bookmark to this channel
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black font-bold">
                            Link
                        </span>
                    </label>
                    <input
                        type="text"
                        placeholder="https://bookmark.com"
                        className="input input-bordered"
                        value={link}
                        onChange={handleLink}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black font-bold">
                            Title
                        </span>
                    </label>
                    <div className="relative w-full flex">
                        <button
                            className="absolute top-0 left-0 rounded-r-none btn btn-primary"
                            onClick={openPickerIcon}
                        >
                            {icon}
                        </button>
                        <input
                            type="text"
                            placeholder="Ex. Project"
                            className="input input-bordered pl-16 w-full"
                            value={title}
                            onChange={handleTitle}
                        />
                        {showEmojiIcon && (
                            <Picker
                                onSelect={addEmojiIcon}
                                title="Pick your emoji???"
                                style={{
                                    position: "absolute",
                                    top: "60px",
                                    right: "auto",
                                    zIndex: "50",
                                }}
                                theme={"dark"}
                            />
                        )}
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black font-bold">
                            Description
                        </span>
                    </label>
                    <input
                        type="text"
                        placeholder="Social App"
                        className="input input-bordered"
                        value={description}
                        onChange={handleDescription}
                    />
                </div>
                <div className="card bordered mt-5 text-black flex-row items-center border-4">
                    <figure className="flex justify-center m-3 items-center">
                        <img src="../../../images/Bookmark.svg" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Bookmark important links for your team
                        </h2>
                        <p>
                            Add bookmarks for links you want to find quickly.
                            All channel members can see the bookmarks you add.
                        </p>
                    </div>
                </div>
                <div className="modal-action">
                    <a className="btn btn-primary" onClick={addBookmark}>
                        Add
                    </a>
                    <a
                        className="btn"
                        onClick={() => setOpenModalBookmark(false)}
                    >
                        Close
                    </a>
                </div>
            </Modal>
            <Modal
                handleClose={() => setOpenModalImagePreview(false)}
                show={openModalImagePreview}
            >
                <div className="text-black text-xl font-bold">
                    Image Preview
                </div>
                <div className="card bordered mt-5 text-black flex-row items-center border-4">
                    <figure className="flex justify-center m-3 items-center">
                        <img src={imagePreview.src} />
                    </figure>
                </div>
                <div className="modal-action">
                    <a
                        className="btn btn-primary"
                        onClick={() => removeImage(imagePreview.id)}
                    >
                        Remove
                    </a>
                    <a
                        className="btn"
                        onClick={() => setOpenModalImagePreview(false)}
                    >
                        Close
                    </a>
                </div>
            </Modal>
        </div>
    );
}
export default React.memo(Chat);
