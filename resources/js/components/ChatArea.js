import React from "react";
import Contact from "./ChatArea/Contact";
import Chat from "./ChatArea/Chat";
import Detail from "./ChatArea/Detail";


export default function ChatArea() {
    

    return (
        <div
            className="flex flex-row h-full rounded-box border-l p-4"
            style={{ width: "calc(100% - 80px)" }}
        >
            <Contact />
            <Chat />
            <Detail />
        </div>
    );
}
