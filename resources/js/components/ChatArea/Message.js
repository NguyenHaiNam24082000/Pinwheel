import React, { useCallback, useState } from "react";
import LinkPreview from "@ashwamegh/react-link-preview";
import { Picker } from "emoji-mart";
const reactStringReplace = require("react-string-replace");
import "@ashwamegh/react-link-preview/dist/index.css";
import ContentLoader from "react-content-loader";
import Media from "../Media";
import ContextMenuChat from "../ContextMenu/ContextMenuChat";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { formatRelative } from "date-fns/esm";
import { Code, Spoiler } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { Collapsible, Button } from "@douyinfe/semi-ui";
import { ActionIcon } from "@mantine/core";
import { FiMoreVertical } from "react-icons/fi";
import { Menu } from "@mantine/core";
import { FcLike } from "react-icons/fc";
import { BsFillReplyFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdRestore } from "react-icons/md";
import { Badge, Popover, Text } from "@mantine/core";
import { MdGTranslate } from "react-icons/md";
import { FaVolumeUp } from "react-icons/fa";
import translate from "google-translate-open-api";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import 'mapbox-gl/dist/mapbox-gl.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
const markerIcon = new L.Icon({
    iconUrl: "https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png",
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
});

function formatDate(seconds) {
    let formattedDate = "";

    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());

        formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
}
const iconProps = { width: 14, height: 14 };
export default function Message({
    userId,
    messageId,
    effect,
    content,
    avatar,
    name,
    images,
    imageGallery,
    mid,
    time,
}) {
    const [opened, setOpened] = useState(false);
    const [active, setActive] = React.useState(false),
        [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [showEmoji, setShowEmoji] = useState(false);
    const [text, setText] = useState(content);

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

    const translateText = async () => {
        const result = await translate(`${text}`, {
            tld: "com",
            to: "vi",
            browers: true,
        });
        const data = result.data[0];
        setText(data);
    };
    const patterns = {
        boldItalic: /\*\*\*(.*?)\*\*\*/gs,
        bold: /\*\*(.*?)\*\*/gs,
        italic: /\*(.*?)\*|_(.*?)_/gs,
        underline: /__(.*?)__/gs,
        underlineItalics: /__\*(.*?)\*__/gs,
        underlineBold: /__\*\*(.*?)\*\*__/gs,
        underlineBoldItalics: /__\*\*\*(.*?)\*\*\*__/gs,
        strikethrough: /~~(.*?)~~/gs,
        codeMultiline: /```(.*)```/gm,
        codeLine: /`(.*?)`/gs,
        blockQuoteMultiline: />>> (.*)/gs,
        blockQuoteLine: /^> (.*)$/gm,
        kbd: /\[\[(.*)\]\]/gm,
        hashtag: /(\#[a-zA-Z0-9_%]*)/gm,
        warning: /\!\!(.*)\!\!/gm,
        highlight: />>(.*)<</gm,
        bracket: /\[_(.*)_\]/gm,
        circle: /\(\(_(.*)_\)\)/gs,
        map: /\[map\:\{lat\:\"[0-9]+.[0-9]+",lng:"[0-9]+.[0-9]+\"\}\]/g,
    };

    console.log("imagesszzz", images);

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
                // '<div class="mockup-code bg-primary text-primary-content mt-3 w-full"><pre data-prefix=">"><code class="facade">$1</code></pre></div>'
                "<Code block>$1</Code>"
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
    const openPicker = useCallback(
        function () {
            let isShowEmoji = showEmoji;
            setShowEmoji(!isShowEmoji);
        },
        [showEmoji]
    );

    function speak(text) {
        // Create a new instance of SpeechSynthesisUtterance.
        var msg = new SpeechSynthesisUtterance();

        // Set the text.
        msg.text = text;

        // Set the attributes.
        msg.volume = parseFloat(1);
        msg.rate = parseFloat(1);
        msg.pitch = parseFloat(1);

        // If a voice has been selected, find the voice and set the
        // utterance instance's voice attribute.
        msg.voice = speechSynthesis.getVoices().filter(function (voice) {
            return (
                voice.name ===
                "Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)"
            );
        })[0];

        // Queue this utterance.
        window.speechSynthesis.speak(msg);
    }

    const normalizeContent = useCallback((content) => {
        const regexLink = /(https?:\/\/\S+)/g;
        let links = content.match(regexLink);
        let underline = content.match(patterns.underline);
        let highlight = content.match(patterns.highlight);
        let codeMultiline = content.match(patterns.codeMultiline);
        let bracket = content.match(patterns.bracket);
        let circle = content.match(patterns.circle);
        let map = content.match(patterns.map);
        console.log(map, "hshshsh");
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
        if (map !== null) {
            const viewport = {
                width: "100%",
                height: "200px",
                latitude: parseFloat(
                    map[0].match(/[+-]?([0-9]*[.])?[0-9]+/)[0]
                ),
                longitude: parseFloat(
                    map[0].match(/[+-]?([0-9]*[.])?[0-9]+/)[1]
                ),
                zoom: 16,
            };
            return (
                <MapContainer
                className="w-full h-80"
                    center={{ lat: viewport.latitude, lng: viewport.longitude }}
                    zoom={8}
                >
                    <TileLayer
                        url={osm.maptiler.url}
                        attribution={osm.maptiler.attribution}
                    />
                    <Marker
                        position={[viewport.latitude, viewport.longitude]}
                        icon={markerIcon}
                        // key={idx}
                    ></Marker>
                </MapContainer>
                // <ReactMapGL
                //     {...viewport}
                //     mapStyle="mapbox://styles/mapbox/streets-v11"
                //     mapboxApiAccessToken="pk.eyJ1Ijoibmd1eWVuaGFpbmFtMjAwMCIsImEiOiJja3c5MG84d3cwbmxsMm5xbThvZjZqZWJmIn0.GoVtZ8PHpUUzR7clny7UrQ"
                // >
                //     <Marker
                //         latitude={viewport.latitude}
                //         longitude={viewport.longitude}
                //         offsetLeft={-20}
                //         offsetTop={-30}
                //     >
                //         <img
                //             style={{ height: 50, width: 50 }}
                //             src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
                //         />
                //     </Marker>
                // </ReactMapGL>
            );
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
                    // <pre data-prefix=">" key={match + i}>
                    //     <code className="facade">{match}</code>
                    // </pre>
                    // <Code block key={match + i}>{match}</Code>
                    <Prism
                        language="js"
                        copyLabel="Copy code to clipboard"
                        copiedLabel="Code copied to clipboard"
                        key={match + i}
                        withLineNumbers
                    >
                        {match}
                    </Prism>
                )
            );
            return (
                // <div className="mockup-code bg-primary text-primary-content mt-3 w-full">
                <>{replaceString}</>
                // </div>
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
                        brackets={["left", "right"]}
                        strokeWidth={3}
                    >
                        {match}
                    </RoughNotation>
                )
            );
            return <>{replaceString}</>;
        }
        if (circle !== null) {
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
                    <div className="w-full flex items-center">
                        <div className="font-bold mr-2">{name}</div> {" - "}{" "}
                        <div className="ml-2 text-2xs font-thin">{time}</div>
                    </div>
                    <div className="flex items-center">
                        <Menu
                            trigger="hover"
                            delay={500}
                            closeOnScroll={false}
                            position="left"
                            icon={
                                <ActionIcon>
                                    <FiMoreVertical />
                                </ActionIcon>
                            }
                        >
                            <Menu.Item
                                key="2"
                                icon={<FcLike {...iconProps} />}
                                onClick={() => {
                                    console.log(content);
                                }}
                            >
                                Reactions
                            </Menu.Item>
                            <Menu.Item
                                key="3"
                                icon={<BsFillReplyFill {...iconProps} />}
                            >
                                Reply
                            </Menu.Item>
                            <Menu.Item
                                key="4"
                                icon={<MdGTranslate {...iconProps} />}
                                onClick={translateText}
                            >
                                Translate
                            </Menu.Item>
                            <Menu.Item
                                key="5"
                                icon={<FaVolumeUp {...iconProps} />}
                                onClick={() => speak(text)}
                            >
                                Text to Speech
                            </Menu.Item>
                            <Menu.Item
                                key="6"
                                icon={<MdRestore {...iconProps} />}
                            >
                                Restore
                            </Menu.Item>
                            <Menu.Item
                                key="7"
                                icon={<AiOutlineDelete {...iconProps} />}
                            >
                                Delete
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className={`${effect} whitespace-pre-wrap flex-col flex`}>
                    <Spoiler
                        maxHeight={300}
                        showLabel="Show more"
                        hideLabel="Hide"
                    >
                        <RoughNotationGroup show={true}>
                            {normalizeContent(content)}
                        </RoughNotationGroup>
                        {images &&
                            images.map((value, index) => (
                                <div
                                    key={index + value}
                                    className="inline-block mr-3 mt-3 rounded-box relative"
                                    style={{
                                        width: "108px",
                                        height: "108px",
                                    }}
                                >
                                    <img
                                        src={value.src}
                                        className="w-full h-full rounded-box"
                                    ></img>
                                </div>
                            ))}
                        {imageGallery &&
                            imageGallery
                                .filter((x) => x.messages_id === mid)
                                .map((value, index) => (
                                    <div
                                        key={index + value}
                                        className="inline-block mr-3 mt-3 rounded-box relative"
                                        style={{
                                            width: "108px",
                                            height: "108px",
                                        }}
                                    >
                                        <img
                                            src={value.attachment_tumb_url}
                                            className="w-full h-full rounded-box"
                                        ></img>
                                    </div>
                                ))}
                        {text.match(/(https?:\/\/\S+)/g) &&
                            text
                                .match(/(https?:\/\/\S+)/g)
                                .map((value, index) => (
                                    <LinkPreview
                                        url={value}
                                        key={index + value}
                                        render={CustomComponent}
                                    />
                                ))}
                        {/* <Media url={"../../assets/sounds/music/cat-walk.mp3"} /> */}
                        {/* <div className="mockup-code bg-primary text-primary-content mt-3">
                        <pre>
                            <code>can be any color!</code>
                        </pre>
                    </div> */}
                    </Spoiler>
                </div>
                <div className="flex mt-2 items-center">
                    <Badge
                        variant="outline"
                        style={{ paddingLeft: 3, marginRight: 3 }}
                        leftSection={"😀"}
                    >
                        1
                    </Badge>
                    <Popover
                        opened={opened}
                        onClose={() => setOpened(false)}
                        position="top"
                        placement="center"
                        withArrow
                        noFocusTrap
                        noEscape
                        transition="pop-top-left"
                        styles={{
                            body: { width: 120, pointerEvents: "none" },
                        }}
                        target={
                            <>
                                <Badge
                                    onMouseEnter={() => setOpened(true)}
                                    onClick={() => openPicker()}
                                    onMouseLeave={() => setOpened(false)}
                                    variant="outline"
                                    style={{ paddingLeft: 3 }}
                                    leftSection={"😀"}
                                >
                                    +
                                </Badge>
                                {showEmoji && (
                                    <Picker
                                        // onSelect={addEmojiIcon}
                                        title="Pick your emoji…"
                                        style={{
                                            position: "absolute",
                                            bottom: "0px",
                                            left: "auto",
                                            zIndex: "50",
                                        }}
                                        theme={"dark"}
                                    />
                                )}
                            </>
                        }
                    >
                        <div style={{ display: "flex" }}>
                            <Text size="sm">Add reaction</Text>
                        </div>
                    </Popover>
                </div>
            </div>
        </div>
    );
}
