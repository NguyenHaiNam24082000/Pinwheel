import React from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-initials-sprites";

export default function Avatar() {
    let avatar = createAvatar(style, {
        seed: "custom-seed",
    });
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="w-64 h-64 bg-black rounded-box"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
                <mask id="avatarsRadiusMask">
                    <rect width="1" height="1" fill="#fff" rx="0" ry="0"></rect>
                </mask>
                <g mask="url(#avatarsRadiusMask)">
                    <path fill="#FB8C00" d="M0 0H1V1H0z"></path>
                    <text
                        x="50%"
                        y="50%"
                        fill="#FFF"
                        dy="0.178"
                        fontFamily="Arial,sans-serif"
                        fontSize="0.5"
                        textAnchor="middle"
                    >
                        CS
                    </text>
                </g>
            </svg>
            <div className="flex mt-3">
                <select className="select select-bordered select-primary w-36 max-w-xs mr-3">
                    <option selected="selected">Initials</option>
                    <option>Avataaars</option>
                    <option>Big Ears</option>
                    <option>Big Ears Neutral</option>
                    <option>Big Smile</option>
                    <option>Bottts</option>
                    <option>Identicon</option>
                    <option>Jdenticon</option>
                    <option>Micah</option>
                    <option>Miniavs</option>
                    <option>Open Peeps</option>
                    <option>Personas</option>
                </select>

                <div className="form-control">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="What is your name?"
                            className="w-full pr-16 input input-primary input-bordered"
                        />
                        <button className="absolute top-0 right-0 rounded-l-none btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
}
