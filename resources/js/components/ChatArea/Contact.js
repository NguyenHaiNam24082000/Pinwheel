import React, { useRef, useEffect, useState } from "react";
import { FiPlus, FiMenu } from "react-icons/fi";
import TimeAgo from "react-timeago";
import Modal from "../Modals/Modal";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { AppContext } from "../../context/AppProvider";
import { SocketContext } from "../../context/socket";
import $ from "jquery";
import { Empty } from "@douyinfe/semi-ui";
import {IllustrationNoResult, IllustrationNoResultDark } from '@douyinfe/semi-illustrations';

export default function Contact() {
    // const [user,setUser]=useState({});
    const { socket } = React.useContext(SocketContext);
    // const { open: openModalAddFriend } = useModal("ModalAddFriend");
    // const { open: openModalStories } = useModal("ModalStories");
    const [addfriend, setAddFriend] = useState([]);
    const [openModalStories, setOpenModalStories] = useState(false);
    const [inputAddFriend, setInputAddFriend] = useState("");
    const [openModalAddFriend, setOpenModalAddFriend] = useState(false);
    const [mess, setMess] = useState("");
    const [lastMessage, setLastMessage] = useState({});
    const [typing, setTyping] = useState("");
    const [search, setSearch] = useState("");
    const { user } = React.useContext(AuthContext);
    const {
        searchContact,
        conversations,
        setSelectedConversationId,
        setConversations,
    } = React.useContext(AppContext);

    const emptyStyle = {
        padding: 30,
    };

    useEffect(() => {
        socket.on("serverSendLastData", (dataGot) => {
            setLastMessage(dataGot.data);
        });

        socket.on("serverFocusTyping", (s) => {
            setTyping(s);
        });

        socket.on("serverBlurTyping", () => {
            setTyping("");
        });

        axios.get(`/api/getlistusers/?userId=${user.id}&page=1`).then((res) => {
            setAddFriend([...res.data.data]);
            console.log("abc", res);
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
    const postAddFriend = (id, e) => {
        axios
            .post(
                `/api/postConversation/?creator_id=${user.id}&kind=friend&title=''`
            )
            .then(function (response) {
                axios.post(
                    `/api/postPaticipant/?conversation_id=${response.data.makefriend.id}&user_id=${user.id}&title=${user.name}`,
                    {
                        myVar: "myValue",
                    }
                );

                const fr = addfriend.find((x) => x.id === id);

                axios.post(
                    `/api/postPaticipant/?conversation_id=${response.data.makefriend.id}&user_id=${id}&title=${fr.name}`,
                    {
                        myVar: "myValue",
                    }
                );
                const postPaticipant = {
                    kind: "friend",
                    alias: fr.name,
                    conversation_id: response.data.makefriend.id,
                    id: id,
                    avatar: fr.avatar,
                    title: "",
                };
                console.log("postPaticipant",postPaticipant);
                setConversations((conversationList) => [
                    ...conversationList,
                    postPaticipant,
                ]);

            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const getSearchAddFriend = (keySearch) => {
        setAddFriend([]);

        axios
            .get(`/api/searchInAddfriend/?userId=${user.id}&name=${keySearch}`)
            .then((res) => {
                setAddFriend([...res.data]);
            });
    };
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    console.log("con", lastMessage);
    return (
        <div className="flex flex-col mr-4 w-3/12 h-full rounded-box drawer-side">
            <div
                className="flex items-center w-full border-b text-xl font-bold"
                style={{ height: "75px" }}
            >
                Chat
            </div>
            <div className="mb-5 mt-5 overflow-x-hidden p-2 flex-grow-0 flex" style={{height: 140}}>
                <ul className="inline-flex space-x-6">
                    <li className="flex flex-col items-center space-y-1">
                        <div className="relative avatar">
                            <div
                                onClick={() =>
                                    setOpenModalStories(!openModalStories)
                                }
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
                        value={search}
                        onChange={handleSearch}
                    />
                    <button
                        className="absolute top-0 right-0 rounded-l-none btn border-0 text-base btn-primary"
                        onClick={() => {
                            searchContact(search);
                        }}
                    >
                        go
                    </button>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div>Last chats</div>
                <div>
                    <button
                        className="btn btn-primary btn-square btn-sm mask mask-squircle mr-2"
                        onClick={() =>
                            setOpenModalAddFriend(!openModalAddFriend)
                        }
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
                                {typing === `${value.conversationId}` && (
                                    <div
                                        className="indicator-item badge indicator-bottom flex align-center p-0 h-5 w-8 bg-primary border-2 border-base-100"
                                        style={{ bottom: "8px", left: "3px" }}
                                    >
                                        <div
                                            className="typing flex align-center w-full h-full"
                                            style={{ margin: "0px" }}
                                        >
                                            <span
                                                className="circle scaling bg-white"
                                                style={{
                                                    width: "6px",
                                                    height: "6px",
                                                    margin: "2px",
                                                }}
                                            ></span>
                                            <span
                                                className="circle scaling bg-white"
                                                style={{
                                                    width: "6px",
                                                    height: "6px",
                                                    margin: "2px",
                                                }}
                                            ></span>
                                            <span
                                                className="circle scaling bg-white"
                                                style={{
                                                    width: "6px",
                                                    height: "6px",
                                                    margin: "2px",
                                                }}
                                            ></span>
                                        </div>
                                    </div>
                                )}
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
                                <div className="truncate">
                                    {lastMessage.selectedConversationId ===
                                    value.conversationId
                                        ? lastMessage.id === user.id
                                            ? `You: ${lastMessage.content}`
                                            : lastMessage.content
                                        : ""}
                                </div>
                            </div>

                            <div className="w-10 flex justify-center items-center text-center text-sm">
                                <TimeAgo date={1632837561300} />
                            </div>
                        </div>
                    ))}
            </div>
            <Modal
                show={openModalStories}
                handleClose={() => setOpenModalStories(false)}
            >
                <div>Test</div>
            </Modal>
            <Modal
                show={openModalAddFriend}
                handleClose={() => setOpenModalAddFriend(false)}
            >
                <div className="text-black text-xl font-bold">Add Friend</div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black font-bold">
                            Username
                        </span>
                    </label>
                    <input
                        value={inputAddFriend}
                        onChange={(e) => setInputAddFriend(e.target.value)}
                        type="text"
                        placeholder="https://bookmark.com"
                        className="input input-bordered"
                    />
                </div>
                <div className="rounded-box bordered mt-5 text-black flex-row items-center border-4 p-2">
                    {/* //{inputAddFriend.length >= 1 ? ( */}
                    {addfriend.length > 0 ? (
                        addfriend.map((value, index) => (
                            <div
                                key={index + value}
                                className="flex items-center w-full p-5 hover:bg-gray-200 rounded-box cursor-pointer"
                            >
                                <div className="avatar online w-12 flex justify-center align-center mr-3 indicator">
                                    <div className="rounded-full w-12 h-12">
                                        <img src={value.avatar.length<10||value.avatar===null?`https://avatars.dicebear.com/api/big-smile/${value.name}.svg`:value.avatar} />
                                    </div>
                                </div>

                                <div className="flex flex-col w-full truncate overflow-ellipsis">
                                    <div className="truncate font-bold">
                                        {value.name}
                                    </div>
                                    <div className="truncate">
                                        Friend Suggestions
                                    </div>
                                </div>

                                <div className="w-20 mr-3 flex justify-center items-center text-center text-sm">
                                    <a
                                        className={`btn btn-primary btn-${value.id}`}
                                        onClick={(e) =>
                                            postAddFriend(value.id, e)
                                        }
                                    >
                                        Add Friend
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Empty
                            image={
                                <IllustrationNoResult
                                    style={{ width: 150, height: 150 }}
                                />
                            }
                            darkModeImage={
                                <IllustrationNoResultDark
                                    style={{ width: 150, height: 150 }}
                                />
                            }
                            description={"No search results"}
                            style={emptyStyle}
                        />
                    )}
                </div>
                <div className="modal-action">
                    <a
                        className="btn btn-primary"
                        onClick={() => getSearchAddFriend(inputAddFriend)}
                    >
                        Search
                    </a>
                    <a
                        className="btn"
                        onClick={() => setOpenModalAddFriend(false)}
                    >
                        Close
                    </a>
                </div>
            </Modal>
        </div>
    );
}
