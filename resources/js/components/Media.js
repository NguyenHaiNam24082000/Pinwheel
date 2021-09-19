import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
// import "../../css/Media.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";

const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "#cdedff",
    progressColor: "#1AAFFF",
    cursorColor: "#1AAFFF",
    barWidth: 2,
    barRadius: 3,
    responsive: true,
    height: 40,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
    scrollParent: true,
    hideScrollbar: true,
    fillParent: false,
});

export default function Media({ url }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const duration = useRef(null);
    const current = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);
    useEffect(() => {
        setPlay(false);

        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);

        wavesurfer.current.load(url);

        wavesurfer.current.on("ready", function () {
            // https://wavesurfer-js.org/docs/methods.html
            // wavesurfer.current.play();
            // setPlay(true);
            duration.current.textContent = timeCalculator(
                wavesurfer.current.getDuration()
            );

            // make sure object stillavailable when file loaded
            if (wavesurfer.current) {
                wavesurfer.current.setVolume(volume);
                setVolume(volume);
            }
        });
        wavesurfer.current.on("audioprocess", function (e) {
            current.current.textContent = timeCalculator(
                wavesurfer.current.getCurrentTime()
            );
        });

        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => {
            wavesurfer.current.destroy();
            duration.current.destroy();
            current.current.destroy();
        }
    }, [url]);

    var timeCalculator = function (value) {
        let second = Math.floor(value % 60);
        let minute = Math.floor((value / 60) % 60);

        if (second < 10) {
            second = "0" + second;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }

        return minute + ":" + second;
    };

    const handlePlayPause = () => {
        setPlay(!playing);
        wavesurfer.current.playPause();
    };

    const handlePlayBack = () => {
        wavesurfer.current.skip(-10);
    };

    const handlePlayForward = () => {
        wavesurfer.current.skip(10);
    };

    const onVolumeChange = (e) => {
        const { target } = e;
        const newVolume = +target.value;

        if (newVolume) {
            setVolume(newVolume);
            wavesurfer.current.setVolume(newVolume || 1);
        }
    };

    return (
        <>
            <section className="w-full h-40 inline-flex rounded-box border overflow-hidden mt-3">
                <div className="thumb h-40 w-40 inline-flex mr-3 rounded-box">
                    <img
                        src="https://raw.githubusercontent.com/yohanstesfaye/Adey-Coder/master/Javascript/wavesurfer-audio-player/Parallax.png"
                        alt=""
                        className="h-full rounded-box"
                    />
                </div>
                <div
                    className="info inline-flex flex-col "
                    style={{ width: "calc(100% - 172px)" }}
                >
                    <div className="detail flex justify-center items-center mt-3 mb-3">
                        <div className="title flex flex-col items-center">
                            TheFatRat - Upwind
                            <div className="time">
                                <span id="current" ref={current}>
                                    00:00
                                </span>
                                <span className="ml-1 mr-1">/</span>
                                <span id="duration" ref={duration}>
                                    00:00
                                </span>
                            </div>
                        </div>
                    </div>
                    <div ref={waveformRef} className="mr-3" />
                    <div className="control w-full h-10 mr-3 flex justify-center items-center">
                        <button
                            onClick={handlePlayBack}
                            className="w-6 h-6 flex justify-center items-center mr-3">
                            <IoPlayBack />
                        </button>
                        <button
                            onClick={handlePlayPause}
                            className="w-6 h-6 flex justify-center items-center"
                        >
                            {!playing ? (
                                <FaPlay className="w-full h-full" />
                            ) : (
                                <FaPause className="w-full h-full" />
                            )}
                        </button>
                        <button
                            onClick={handlePlayForward }
                            className="w-6 h-6 flex justify-center items-center ml-3">
                            <IoPlayForward />
                        </button>
                    </div>
                </div>
            </section>
            {/* <div className="controls">
                <button onClick={handlePlayPause}>
                    {!playing ? "Play" : "Pause"}
                </button>
                <input
                    type="range"
                    id="volume"
                    name="volume"
                    // waveSurfer recognize value of `0` same as `1`
                    //  so we need to set some zero-ish value for silence
                    min="0.01"
                    max="1"
                    step=".025"
                    onChange={onVolumeChange}
                    defaultValue={volume}
                />
                <label htmlFor="volume">Volume</label>
            </div> */}
        </>
    );
}
