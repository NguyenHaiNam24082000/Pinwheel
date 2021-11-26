import React, { useRef, useEffect, useState } from "react";
// import Controls from "./Controls";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as bodyPix from "@tensorflow-models/body-pix";
import { MdCallEnd, MdStopScreenShare, MdScreenShare } from "react-icons/md";
import {
    BsFillMicFill,
    BsFillMicMuteFill,
    BsCameraVideoFill,
} from "react-icons/bs";
import Timer from "./Timer";

export default function VideoCall() {
    const width = useRef(window.innerWidth / 2.1);
    const height = useRef(window.innerHeight / 2.1 - 80);
    const refVideo = useRef();
    const canvasRef = useRef();
    const [bodypixnet, setBodypixnet] = useState();
    // const config = useState({
    //     architecture: "ResNet50",
    //     outputStride: 16,
    //     multiplier: 1,
    //     quantBytes: 2,
    // });
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
        setScreenState(!streamState.screen);
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

    useEffect(() => {
        // bodyPix.load().then((net) => {
        //     setBodypixnet(net);
        //   });
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                refVideo.current.srcObject = stream;
                refVideo.current.onloadeddata = (event) => {
                    bodyPix.load().then((net) => {
                        setBodypixnet(net);
                    });
                };
            });
    }, []);

    const drawimage = async (webcam, context, canvas) => {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = webcam.videoWidth;
        tempCanvas.height = webcam.videoHeight;
        const tempCtx = tempCanvas.getContext("2d");
        const segmentation = await bodypixnet.segmentPerson(webcam);
        console.log(segmentation);
        const mask = bodyPix.toMask(segmentation);
        (async function drawMask() {
            requestAnimationFrame(drawMask);
            // draw mask on tempCanvas
            const segmentation = await bodypixnet.segmentPerson(webcam);
            const mask = bodyPix.toMask(segmentation);
            tempCtx.putImageData(mask, 0, 0);
            // draw original image
            context.drawImage(webcam, 20, 0, canvas.width, canvas.height);
            // use destination-out, then only masked area will be removed
            context.save();
            context.globalCompositeOperation = "destination-out";
            context.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
            context.restore();
        })();
    };

    const clickHandler = async (className) => {
        const webcam = refVideo.current;
        const canvas = canvasRef.current;
        webcam.width = canvas.width = width.current;
        webcam.height = canvas.height = 500;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.classList.add(className);
        if (bodypixnet) {
            drawimage(webcam, context, canvas);
        }
    };
    clickHandler("turky");

    return (
        <div className="flex flex-col w-full overflow-hidden relative">
            <div
                className="grid w-full h-full gap-1 overflow-y-auto overflow-x-hidden"
                style={{
                    gridTemplateColumns: `repeat(auto-fit,minmax(${width.current}px,1fr))`,
                    height: "calc(100% - 80px)",
                }}
            >
                {/* // style={{ gridColumn: "span 2 / auto" }} */}
                <div className="w-full h-full flex justify-end items-center p-2">
                    <video
                        className="w-auto h-full rounded-2xl"
                        // muted ref={refVideo} autoPlay playsInline
                    ></video>
                </div>
                <div className="w-full h-full flex justify-start items-center p-2 relative">
                    <video
                        className="w-full h-full rounded-2xl"
                        muted
                        ref={refVideo}
                        autoPlay
                        playsInline
                    ></video>
                    <canvas
                        ref={canvasRef}
                        className="absolute w-full h-full"
                    ></canvas>
                </div>
            </div>
            <div className="h-20 w-full flex justify-between items-center absolute bottom-0 left-0 bg-gray-500">
                {/* <div><Timer/></div> */}
                <div>
                    <div
                        className={`btn rounded-box mx-1 ${
                            streamState.mic ? "" : "bg-red-500 hover:bg-red-600"
                        } `}
                        // className={
                        //     "meeting-icons " + (!streamState.mic ? "active" : "")
                        // }
                        data-tip={
                            streamState.mic ? "Mute Audio" : "Unmute Audio"
                        }
                        onClick={micClick}
                    >
                        {/* <FontAwesomeIcon
                    icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
                    title="Mute"
                /> */}
                        {streamState.mic ? (
                            <BsFillMicFill />
                        ) : (
                            <BsFillMicMuteFill />
                        )}
                    </div>
                    <div
                        className={`btn rounded-box mx-1 ${
                            streamState.video
                                ? ""
                                : "bg-red-500 hover:bg-red-600"
                        } `}
                        data-tip={
                            streamState.video ? "Hide Video" : "Show Video"
                        }
                        onClick={onVideoClick}
                    >
                        {/* <FontAwesomeIcon
                    icon={!streamState.video ? faVideoSlash : faVideo}
                /> */}
                        {/* {streamState.video ? */}
                        <BsCameraVideoFill />
                        {/* // :
                // <BsCameraVideoOffFill />} */}
                    </div>
                    <div
                        className={`btn rounded-box mx-1 ${
                            streamState.screen
                                ? ""
                                : "bg-red-500 hover:bg-red-600"
                        } `}
                        data-tip="Share Screen"
                        onClick={onScreenClick}
                        // disabled={streamState.screen}
                    >
                        {/* <FontAwesomeIcon icon={faDesktop} /> */}
                        {streamState.screen ? (
                            <MdScreenShare />
                        ) : (
                            <MdStopScreenShare />
                        )}
                    </div>
                    <div className="btn rounded-box mx-1 bg-red-500 hover:bg-red-600">
                        <MdCallEnd />
                    </div>
                </div>
                {/* <div><Timer/></div> */}
            </div>
        </div>
    );
}
