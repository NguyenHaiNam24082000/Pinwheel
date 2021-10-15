import React, { useCallback } from "react";
import LinkPreview from "@ashwamegh/react-link-preview";
const reactStringReplace = require("react-string-replace");
import "@ashwamegh/react-link-preview/dist/index.css";
import ContentLoader from "react-content-loader";
import Media from "../Media";
import ContextMenuChat from "../ContextMenu/ContextMenuChat";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

export default function Message({
    userId,
    messageId,
    effect,
    content,
    avatar,
    name,
}) {
    const [active, setActive] = React.useState(false),
        [position, setPosition] = React.useState({ x: 0, y: 0 });

    const [menuRadius, setMenuRadius] = React.useState(100),
        [itemRadius, setItemRadius] = React.useState(25);

    const [contextMenuItems, setContextMenuItems] = React.useState([]);
    // React.useEffect(() => {
    //     // Only for CodePen preview
    //     setTimeout(() => {
    //         const centerX = window.innerWidth / 2 - menuRadius / 4,
    //             centerY = window.innerHeight / 3 - menuRadius / 4;

    //         setPosition({ x: centerX, y: centerY });

    //         setActive(true);
    //     }, 500);
    // }, []);
    const patterns = {
        boldItalic: /\*\*\*(.*?)\*\*\*/gs,
        bold: /\*\*(.*?)\*\*/gs,
        italic: /\*(.*?)\*|_(.*?)_/gs,
        underline: /__(.*?)__/gs,
        underlineItalics: /__\*(.*?)\*__/gs,
        underlineBold: /__\*\*(.*?)\*\*__/gs,
        underlineBoldItalics: /__\*\*\*(.*?)\*\*\*__/gs,
        strikethrough: /~~(.*?)~~/gs,
        codeMultiline: /```(.*?)```/gm,
        codeLine: /`(.*?)`/gs,
        blockQuoteMultiline: />>> (.*)/gs,
        blockQuoteLine: /^> (.*)$/gm,
        kbd: /\[\[(.*)\]\]/gm,
        hashtag: /(\#[a-zA-Z0-9_%]*)/gm,
        warning: /\!\!(.*)\!\!/gm,
        highlight: />>(.*)<</gm,
        bracket: /\[_(.*)_\]/gm,
        circle: /\(\(_(.*)_\)\)/gs,
    };

    const format = (content) =>
        content
            .replace(patterns.boldItalic, "<strong><em>$1</em></strong>")
            .replace(patterns.bold, "<strong>$1</strong>")
            .replace(patterns.italic, "<em>$1$2</em>")
            .replace(
                patterns.underlineItalics,
                "<pre class='underline'><em>$1</em></pre>"
            )
            .replace(patterns.underlineBold, "<u><strong>$1</strong></u>")
            .replace(
                patterns.underlineBoldItalics,
                "<u><strong><em>$1</strong></em></u>"
            )
            .replace(patterns.strikethrough, "<del>$1</del>")
            // FIXME: don't add message formatting in a code block
            .replace(
                patterns.codeLine,
                '<div class="mockup-code bg-primary text-primary-content mt-3 w-full"><pre data-prefix=">"><code class="facade">$1</code></pre></div>'
            )
            .replace(
                patterns.blockQuoteLine,
                '<span class="border-l-4 border-primary pl-1">$1</span>'
            )
            .replace(
                patterns.blockQuoteMultiline,
                '<div class="border-l-4 border-primary pl-1">$1</div>'
            )
            .replace(patterns.kbd, '<kbd class="kbd">$1</kbd>')
            .replace(patterns.hashtag, '<span class="text-info">$1</span>')
            .replace(patterns.warning, '<span class="text-warning">$1</span>');

    React.useEffect(() => {
        const handleClick = (e) => {
            const items = document.getElementsByClassName("context-menu-item");

            if (items && items.length > 0) {
                let count = 0;

                for (let i = 0; i < items.length; i++) {
                    if (items[i].contains(e.target)) {
                        count++;
                    }
                }

                if (count === 0) {
                    setActive(false);
                }
            } else {
                setActive(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    React.useEffect(() => {
        setContextMenuItems([
            { name: "Copy", icon: "far fa-copy" },
            { name: "Reply", icon: "fa fa-reply" },
            { name: "Like", icon: "far fa-thumbs-up" },
            { name: "Delete", icon: "fas fa-trash" },
            { name: "Delete", icon: "fas fa-trash" },
            { name: "Delete", icon: "fas fa-trash" },
        ]);
        return () => {};
    }, []);

    React.useEffect(() => {
        const handleClick = (e) => {
            const items = document.getElementsByClassName("context-menu-item");

            if (items && items.length > 0) {
                let count = 0;

                for (let i = 0; i < items.length; i++) {
                    if (items[i].contains(e.target)) {
                        count++;
                    }
                }

                if (count === 0) {
                    setActive(false);
                }
            } else {
                setActive(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const handleOnContextMenu = (e) => {
        e.preventDefault();
        setActive(true);
        // Added some barriers for the menu position so it doesnt extend off the screen
        const x = Math.min(
                Math.max(menuRadius + 10, e.clientX - itemRadius),
                window.innerWidth - menuRadius * 1.5 - 10
            ),
            y = Math.min(
                Math.max(menuRadius + 10, e.clientY - itemRadius),
                window.innerHeight - menuRadius * 1.5 - 10
            );
        setPosition({ x, y });
    };

    const getContextMenuItems = () => {
        const getOffset = (index) => {
            const step = (2 * Math.PI) / contextMenuItems.length,
                angle = index * step;

            const x = Math.round(
                    menuRadius +
                        menuRadius * Math.cos(angle) -
                        itemRadius -
                        (menuRadius - itemRadius)
                ),
                y = Math.round(
                    menuRadius +
                        menuRadius * Math.sin(angle) -
                        itemRadius -
                        (menuRadius - itemRadius)
                );

            return { x, y };
        };

        return contextMenuItems.map((item, index) => {
            return (
                <ContextMenuChat
                    key={item.name + index}
                    index={index}
                    name={item.name}
                    icon={item.icon}
                    active={active}
                    position={position}
                    offset={getOffset(index)}
                />
            );
        });
    };

    const normalizeContent = useCallback((content) => {
        const regexLink = /(https?:\/\/\S+)/g;
        let links = content.match(regexLink);
        let underline = content.match(patterns.underline);
        let highlight = content.match(patterns.highlight);
        let codeMultiline = content.match(patterns.codeMultiline);
        let bracket = content.match(patterns.bracket);
        let circle = content.match(patterns.circle);
        if (links !== null) {
            let replaceString = reactStringReplace(
                content,
                regexLink,
                (match, i) => (
                    // <a key={match + i} href={match}>{match}</a>
                    <a
                        key={match + i}
                        href={`${
                            match.includes("http") ? match : `https://${match}`
                        }`}
                        target="_blank"
                        title=""
                        className="hover:underline text-info"
                        style={{ cursor: "pointer" }}
                    >
                        {match}
                    </a>
                )
            );
            return <>{replaceString}</>;
        }
        if (underline !== null) {
            let replaceString = reactStringReplace(
                content,
                patterns.underline,
                (match, i) => (
                    // <a key={match + i} href={match}>{match}</a>
                    <RoughNotation key={match + i} type="underline">
                        {match}
                    </RoughNotation>
                )
            );
            return <>{replaceString}</>;
        }
        if (highlight !== null) {
            let replaceString = reactStringReplace(
                content,
                patterns.highlight,
                (match, i) => (
                    // <a key={match + i} href={match}>{match}</a>
                    <RoughNotation
                        key={match + i}
                        type="highlight"
                        color="yellow"
                        iterations={1}
                        multiline={true}
                    >
                        {match}
                    </RoughNotation>
                )
            );
            return <>{replaceString}</>;
        }
        if (codeMultiline !== null) {
            let replaceString = reactStringReplace(
                content,
                patterns.codeMultiline,
                (match, i) => (
                    // <a key={match + i} href={match}>{match}</a>
                    <pre data-prefix=">" key={match + i}>
                        <code className="facade">{match}</code>
                    </pre>
                )
            );
            return (
                <div className="mockup-code bg-primary text-primary-content mt-3 w-full">
                    {replaceString}
                </div>
            );
        }
        if (bracket !== null) {
            let replaceString = reactStringReplace(
                content,
                patterns.bracket,
                (match, i) => (
                    // <a key={match + i} href={match}>{match}</a>
                    <RoughNotation
                        key={match + i}
                        type="bracket"
                        color="red"
                        padding={[2, 10]}
                        brackets={['left', 'right']}
                        strokeWidth= {3}
                    >
                        {match}
                    </RoughNotation>
                )
            );
            return <>{replaceString}</>;
        }
        if(circle !==null) {
            let replaceString = reactStringReplace(
                content,
                patterns.circle,
                (match, i) => (
                    // <a key={match + i} href={match}>{match}</a>
                    <RoughNotation
                        key={match + i}
                        type="circle"
                        color="red"
                        padding={10}
                    >
                        {match}
                    </RoughNotation>
                )
            );
            return <>{replaceString}</>;
        }
        return (
            <>
                <div
                    dangerouslySetInnerHTML={{
                        __html: `${format(content)}`,
                    }}
                    className="float-left overflow-auto w-full"
                    style={{ maxWidth: "100%" }}
                />
            </>
        );
    });

    function CustomComponent({ loading, preview }) {
        return loading ? (
            <ContentLoader viewBox="0 0 500 280" height={280} width={500}>
                <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
                <rect x="6" y="190" rx="0" ry="0" width="292" height="20" />
                <rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
                <rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
            </ContentLoader>
        ) : (
            <a
                className="flex flex-col rounded-box w-full mt-3 border cursor-pointer"
                target="_blank"
                href={
                    preview.domain.includes("http")
                        ? preview.domain
                        : `http://${preview.domain}`
                }
            >
                <img
                    className="w-full h-auto rounded-t-box"
                    src={preview.img}
                    alt={preview.title}
                />
                <h3 className="text-xl font-bold mt-2 pl-3">{preview.title}</h3>
                <p className="pl-3">{preview.description}</p>
                <p className="mb-2 pl-3">{preview.domain}</p>
            </a>
        );
    }

    return (
        <div
            className={`flex rounded-box relative ${
                messageId === userId ? "bg-base-100" : "bg-base-300"
            } p-3 mt-2 mb-2 ml-4`}
            style={{ width: "calc(100% - 32px)" }}
            onContextMenu={handleOnContextMenu}
        >
            {getContextMenuItems()}
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
                <RoughNotationGroup show={true}>
                    <div className={`${effect} whitespace-pre-wrap`}>
                        {normalizeContent(content)}
                        {content.match(/(https?:\/\/\S+)/g) &&
                            content
                                .match(/(https?:\/\/\S+)/g)
                                .map((value, index) => (
                                    <LinkPreview
                                        url={value}
                                        key={index + value}
                                        render={CustomComponent}
                                    />
                                ))}
                        {/* <Media url={"../../assets/sounds/music/cat-walk.mp3"}/> */}
                        {/* <div className="mockup-code bg-primary text-primary-content mt-3">
                        <pre>
                            <code>can be any color!</code>
                        </pre>
                    </div> */}
                    </div>
                </RoughNotationGroup>
            </div>
        </div>
    );
}
