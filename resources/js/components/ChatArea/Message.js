import React from "react";
import LinkPreview from "@ashwamegh/react-link-preview";
import Media from "../Media";

export default function Message({
    index,
    userId,
    messageId,
    effect,
    content,
    CustomComponent,
    normalizeContent,
    avatar,
    name,
}) {
    return (
        <div
            key={index}
            className={`flex rounded-box ${
                messageId === userId ? "bg-base-100" : "bg-base-300"
            } p-3 mt-2 mb-2 ml-4`}
            style={{ width: "calc(100% - 32px)" }}
        >
            <div className="avatar mr-3">
                <div className="w-12 h-12 mask mask-squircle">
                    <img src={avatar} />
                </div>
            </div>
            <div
                className="flex flex-col break-words"
                style={{ width: "calc(100% - 72px)" }}
            >
                <div className="flex justify-between w-full">
                    <div className="font-bold w-full">{name}</div>
                    <div>24:00</div>
                </div>
                <div className={effect}>
                    {normalizeContent(content)}
                    {content.match(/(https?:\/\/\S+)/g) &&
                        content
                            .match(/(https?:\/\/\S+)/g)
                            .map((value, index) => (
                                <LinkPreview
                                    url={value}
                                    key={index}
                                    render={CustomComponent}
                                />
                            ))}
                        {/* <Media url={"../../assets/sounds/music/cat-walk.mp3"}/> */}
                </div>
            </div>
        </div>
    );
}
