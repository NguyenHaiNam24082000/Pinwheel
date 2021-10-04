import React, { useRef, useEffect, useState } from "react";
import { FiPlus, FiMenu } from "react-icons/fi";
import TimeAgo from "react-timeago";
import { useModal } from "react-simple-modal-provider";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { AppContext } from "../../context/AppProvider";
import { SocketContext } from "../../context/socket";

export default function Contact() {
    // const [user,setUser]=useState({});
    const { socket } = React.useContext(SocketContext);
    const { open: openModalAddFriend } = useModal("ModalAddFriend");
    const { open: openModalStories } = useModal("ModalStories");
    const [mess, setMess] = useState("");
    const [lastMessage, setLastMessage] = useState({});
    const [typing, setTyping] = useState("");
    const { user } = React.useContext(AuthContext);
    const { conversations, setSelectedConversationId } =
        React.useContext(AppContext);
    useEffect(() => {
        socket.on("serverSendLastData",(dataGot)=>{
            setLastMessage(dataGot.data);
        });

        socket.on("serverFocusTyping", (s) => {
            setTyping(s);
        });

        socket.on("serverBlurTyping", () => {
            setTyping("");
        });
        // getUserInfo().then(res => setUser(res.data));
        // axios
        //     .get(`/api/getContact/?userId=${user.id}`)
        //     .then((res) => {
        //         console.log(res);
        //         res.data.forEach((data) => {
        //             if(data.kind==='friend' && data.id!=user.id)
        //                 setParticipant((participants) => [...participants,data])
        //         })

        //     });

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
    console.log("con",lastMessage);
    return (
        <div className="flex flex-col mr-4 w-3/12 h-full rounded-box">
            <div
                className="flex items-center w-full border-b text-xl font-bold"
                style={{ height: "75px" }}
            >
                Chat
            </div>
            <div className="mb-5 mt-5 overflow-x-hidden p-2">
                <ul className="inline-flex space-x-6">
                    <li className="flex flex-col items-center space-y-1">
                        <div className="relative avatar">
                            <div
                                onClick={openModalStories}
                                className="rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2"
                            >
                                <img src={user.avatar} />
                            </div>
                            <button className="absolute -bottom-1 -right-1  h-6 w-6 rounded-full text-base-content text-lg font-semibold border-2 flex justify-center items-center font-mono hover:bg-primary-focus bg-primary">
                                +
                            </button>
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
                    <button
                        className="btn btn-primary btn-square btn-sm mask mask-squircle mr-2"
                        onClick={openModalAddFriend}
                    >
                        <FiPlus />
                    </button>
                    <button className="btn btn-primary btn-square btn-sm mask mask-squircle">
                        <FiMenu />
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-full mt-2 overflow-y-auto">
                {conversations &&
                    conversations.map((value, index) => (
                        <div
                            key={index + value}
                            className="flex items-center w-full p-5 hover:bg-base-200 rounded-box cursor-pointer"
                            onClick={() =>
                                setSelectedConversationId(value.conversationId)
                            }
                        >
                            <div className="avatar online w-12 flex justify-center align-center mr-3 indicator">
                            {typing===`${value.conversationId}` && (
                                <div className="indicator-item badge indicator-bottom flex align-center p-0 h-5 w-8 bg-primary border-2 border-base-100"
                                    style={{bottom:"8px",left:"3px"}}
                                >
                                    <div className="typing flex align-center w-full h-full" style={{margin: "0px"}}>
                                        <span className="circle scaling bg-white" style={{width: "6px",height:"6px",margin:"2px"}}></span>
                                        <span className="circle scaling bg-white" style={{width: "6px",height:"6px",margin:"2px"}}></span>
                                        <span className="circle scaling bg-white" style={{width: "6px",height:"6px",margin:"2px"}}></span>
                                    </div>
                                </div>)
                            }
                                <div className="rounded-full w-12 h-12">
                                    <img src={value.avatar} />
                                </div>
                            </div>

                            <div className="flex flex-col w-full truncate overflow-ellipsis">
                                <div className="truncate font-bold">
                                    {value.kind === "friend"
                                        ? value.alias
                                        : value.title}
                                </div>
                                <div className="truncate">{lastMessage.selectedConversationId===value.conversationId? lastMessage.id===user.id? `You: ${lastMessage.content}`: lastMessage.content:""}</div>
                            </div>

                            <div className="w-10 flex justify-center items-center text-center text-sm">
                                <TimeAgo date={1632837561300} />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
