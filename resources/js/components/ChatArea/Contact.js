import React, { useRef, useEffect, useState } from "react";
// import { socket } from "../../context/socket";
import { FiPlus, FiMenu } from "react-icons/fi";
import { getUserInfo } from "../../context/UserProvider";
import TimeAgo from 'react-timeago';
import { useModal } from "react-simple-modal-provider";
import axios from "axios";

export default function Contact() {
    const socketRef = useRef();
    const [user,setUser]=useState({});
    const { open: openModalAddFriend } = useModal("ModalAddFriend");
    const { open: openModalStories } = useModal("ModalStories");
    const [mess, setMess] = useState("");
    const [participant,setParticipant]=useState({});
    useEffect(async() => {
        getUserInfo().then(res => setUser(res.data));
        console.log('abx',user)
        axios.get(`/api/participant/getParticipant/?userId:${user.id}`).then(res => console.log(res))
        // axios
        //     .get("/api/chat")
        //     .then(function (response) {
        //         // handle success
        //         setMess((oldMsgs) => [...oldMsgs, ...response.data.chat]);
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     });

        // socketRef.current = socket;

        // socketRef.current.on("serverSendData", (dataGot) => {
        //     setMess(dataGot.data);
        //     //scrollToBottom();
        // });

        return () => {};
    }, []);
    return (
        <div className="flex flex-col mr-4 w-3/12 h-full rounded-box">
            <div
                className="flex items-center w-full border-b text-xl font-bold"
                style={{ height: "75px" }}
            >
                Chat
            </div>
            <div className="mb-5 mt-5 ml-2">
                <ul className="inline-flex space-x-6">
                    <li className="flex flex-col items-center space-y-1">
                        <div className="relative avatar" >
                            <div onClick={openModalStories} className="rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.avatar} />
                            </div>
                            <button className="absolute -bottom-1 -right-1  h-6 w-6 rounded-full text-base-content text-lg font-semibold border-2 flex justify-center items-center font-mono hover:bg-primary-focus bg-primary">+</button>
                        </div>
                        <a href="#">You</a>
                    </li>
                    <li className="flex flex-col items-center space-y-1">
                        <div className="avatar">
                            <div className="rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
                            </div>
                        </div>
                        <a href="#">you</a>
                    </li>
                    <li className="flex flex-col items-center space-y-1">
                        <div className="avatar">
                            <div className="rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
                            </div>
                        </div>
                        <a href="#">you</a>
                    </li>
                    <li className="flex flex-col items-center space-y-1">
                        <div className="avatar">
                            <div className="rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
                            </div>
                        </div>
                        <a href="#">you</a>
                    </li>
                    <li className="flex flex-col items-center space-y-1">
                        <div className="avatar">
                            <div className="rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
                            </div>
                        </div>
                        <a href="#">you</a>
                    </li>
                    <li className="flex flex-col items-center space-y-1">
                        <div className="avatar">
                            <div className="rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
                            </div>
                        </div>
                        <a href="#">you</a>
                    </li>
                </ul>
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
                    <button className="btn btn-primary btn-square btn-sm mask mask-squircle mr-2" onClick={openModalAddFriend}>
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
                            Abc Xyz aaaaaaaa a aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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

                    <div className="flex flex-col w-full truncate overflow-ellipsis">
                        <div className="truncate font-bold">Nguyễn</div>
                        <div className="truncate">{mess.content}</div>
                    </div>

                    <div className="w-10 flex justify-center items-center text-center text-sm">
                        <TimeAgo date={1632837561300} />
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
    );
}
