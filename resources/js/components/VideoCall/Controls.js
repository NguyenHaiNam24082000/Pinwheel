import React, { useState } from "react";
import {MdCallEnd,MdStopScreenShare,MdScreenShare} from "react-icons/md";
import {BsFillMicFill, BsFillMicMuteFill, BsCameraVideoFill} from "react-icons/bs";


export default function Controls() {
    const [streamState, setStreamState] = useState({
        mic: true,
        video: false,
        screen: false,
        endCall: false,
    });
    const micClick = () => {
        setStreamState((currentState) => {
            return {
                ...currentState,
                mic: !currentState.mic,
            };
        });
    };
    const onVideoClick = () => {
        setStreamState((currentState) => {
            return {
                ...currentState,
                video: !currentState.video,
            };
        });
    };
    const onScreenClick = () => {
        // props.onScreenClick(setScreenState);
        setScreenState(!streamState.screen)
    };
    const setScreenState = (isEnabled) => {
        setStreamState((currentState) => {
            return {
                ...currentState,
                screen: isEnabled,
            };
        });
    };
    //   useEffect(() => {
    //     props.onMicClick(streamState.mic);
    //   }, [streamState.mic]);
    //   useEffect(() => {
    //     props.onVideoClick(streamState.video);
    //   }, [streamState.video]);
    return (
        <div className="h-20 w-full flex justify-center items-center absolute bottom-0 left-0 bg-gray-500">
            <div
                className={`btn rounded-box mx-1 ${streamState.mic ?"":"bg-red-500 hover:bg-red-600"} `}
                // className={
                //     "meeting-icons " + (!streamState.mic ? "active" : "")
                // }
                data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
                onClick={micClick}
            >
                {/* <FontAwesomeIcon
                    icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
                    title="Mute"
                /> */}
                {streamState.mic ?
                <BsFillMicFill />:
                <BsFillMicMuteFill />}
            </div>
            <div
                className={`btn rounded-box mx-1 ${streamState.video ?"":"bg-red-500 hover:bg-red-600"} `}
                data-tip={streamState.video ? "Hide Video" : "Show Video"}
                onClick={onVideoClick}
            >
                {/* <FontAwesomeIcon
                    icon={!streamState.video ? faVideoSlash : faVideo}
                /> */}
                {/* {streamState.video ? */}
                <BsCameraVideoFill/>
                {/* // :
                // <BsCameraVideoOffFill />} */}
            </div>
            <div
                className={`btn rounded-box mx-1 ${streamState.screen ?"":"bg-red-500 hover:bg-red-600"} `}
                data-tip="Share Screen"
                onClick={onScreenClick}
                // disabled={streamState.screen}
            >
                {/* <FontAwesomeIcon icon={faDesktop} /> */}
                {streamState.screen ?
                <MdScreenShare/>
                :
                <MdStopScreenShare />}
            </div>
            <div className="btn rounded-box mx-1 bg-red-500 hover:bg-red-600">
                <MdCallEnd/>
            </div>
        </div>
    );
}
