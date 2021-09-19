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
                    <img src="https://scontent.fhan5-4.fna.fbcdn.net/v/t1.6435-9/62498267_1122772321257230_1257182363998224384_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=fCfCkv9GMpYAX-5XEzu&_nc_ht=scontent.fhan5-4.fna&oh=8c591abd1ca6feb8e2f44f1acf183c5d&oe=615B52A1" />
                </div>
            </div>
            <div
                className="flex flex-col break-words"
                style={{ width: "calc(100% - 72px)" }}
            >
                <div className="flex justify-between w-full">
                    <div className="font-bold w-full">Nguyễn Hải Nam</div>
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
                        <Media url={"../../assets/sounds/music/cat-walk.mp3"}/>
                </div>
            </div>
        </div>
    );
}
