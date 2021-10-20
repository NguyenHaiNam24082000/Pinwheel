import React, { useRef, useEffect, useState } from "react";
import Controls from "./Controls";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as bodyPix from "@tensorflow-models/body-pix";

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
      clickHandler("turkey")

    return (
        <div className="flex flex-col w-full overflow-hidden relative">
            <div
                className="grid w-full h-full gap-1 overflow-y-auto"
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
                        className="person w-full h-full"
                    ></canvas>
                </div>
            </div>
            <Controls />
        </div>
    );
}
