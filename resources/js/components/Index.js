import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Avatar from "./Avatar";
import VideoCall from "./VideoCall";
import toast, { Toaster } from "react-hot-toast";
import { BiWifiOff, BiWifi } from "react-icons/bi";
import AuthProvider from "../context/AuthProvider";
import AppProvider from "../context/AppProvider";
import modals from "./Modals";
import { ModalProvider } from "react-simple-modal-provider";

function Index() {
    let isOnline = true;
    useEffect(() => {
        const interval = setInterval(() => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
            xhr.onload = () => {
                if (xhr.status === 200 && xhr.status < 300) {
                    if (isOnline === true) {
                        online();
                    }
                    isOnline = false;
                } else {
                    if (isOnline === false) {
                        offline();
                    }
                    isOnline = true;
                }
            };
            xhr.onerror = () => {
                if (isOnline === false) {
                    offline();
                }
                isOnline = true;
            };
            xhr.send();
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    const setThemeMode = (themeMode) => {
        var storageKey = "theme";
        if (localStorage.getItem(storageKey) === null) {
            localStorage.setItem(storageKey, "light");
        } else {
            localStorage.setItem(storageKey, themeMode);
        }
        toast.success(`Successfully changed ${themeMode} theme!`);
        setTheme(localStorage.getItem("theme"));
    };

    const online = () =>
        toast.custom((t) => (
            <div
                className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                } max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <BiWifi className="h-10 w-10 rounded-full text-green-400" />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                You're online now
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                Hurray! Internet is connected.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ));

    const offline = () =>
        toast.custom((t) => (
            <div
                className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                } max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <BiWifiOff className="h-10 w-10 rounded-full text-red-400" />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                You're offline now
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                Opps! Internet is disconnected.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ));

    console.warn(
        "%c⚠ Dừng lại!",
        "font-size: 64px;font-weight: bold; color: red"
    );
    console.warn(
        '%cĐây là một tính năng của trình duyệt dành cho các nhà phát triển. Nếu ai đó bảo bạn sao chép-dán nội dung nào đó vào đây để bật một tính năng của Pinwheel hoặc "hack" tài khoản của người khác, thì đó là hành vi lừa đảo và sẽ khiến họ có thể truy cập vào tài khoản Pinwheel của bạn.',
        "font-size: 32px;font-weight: bold;"
    );
    console.warn(
        "%cTruy cập http://127.0.0.1:8000/ để biết thêm thông tin.",
        "font-size: 32px;font-weight: bold; "
    );
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppProvider>
                    <ModalProvider value={modals}>
                        <Switch>
                            <Route component={Register} path="/register" />
                            <Route component={Login} path="/login" />
                            <Route component={Avatar} path="/avatar" />
                            <Route component={VideoCall} path="/videocall" />
                                <Route exact path="/">
                                    <div
                                        className="w-full flex h-full bg-base-100 text-base-content"
                                        data-theme={theme}
                                    >
                                        <Sidebar
                                            setThemeMode={setThemeMode}
                                            theme={theme}
                                        />
                                        <ChatArea />
                                        <Toaster
                                            position="bottom-right"
                                            reverseOrder={false}
                                        />
                                    </div>
                                </Route>
                        </Switch>
                    </ModalProvider>
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Index;
