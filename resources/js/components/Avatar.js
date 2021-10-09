import React, { useState, useCallback } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as bigEarsNeutral from "@dicebear/big-ears-neutral";
import * as bigEars from "@dicebear/big-ears";
import * as micah from "@dicebear/micah";
import * as initials from "@dicebear/avatars-initials-sprites";
import * as bigSmile from "@dicebear/big-smile";
import * as bottts from "@dicebear/avatars-bottts-sprites";
import * as identicon from "@dicebear/avatars-identicon-sprites";
import * as jdenticon from "@dicebear/avatars-jdenticon-sprites";
import * as miniavs from "@dicebear/miniavs";
import * as openPeeps from "@dicebear/open-peeps";
import * as personas from "@dicebear/personas";
import * as avataaars from "@dicebear/avatars-avataaars-sprites";
import { ShakeLittle } from "reshake";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";

export default function AvatarMaker() {
    const [avt, setAvt] = useState(initials);
    const [name, setName] = useState("");
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState({
        r: "255",
        g: "255",
        b: "255",
        a: "1",
    });
    let randomString = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 20);
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const obj = {
        initials: initials,
        bigEars: bigEars,
        bigEarsNeutral: bigEarsNeutral,
        micah: micah,
        bigSmile: bigSmile,
        bottts: bottts,
        identicon: identicon,
        jdenticon: jdenticon,
        miniavs: miniavs,
        openPeeps: openPeeps,
        personas: personas,
        avataaars: avataaars,
    };
    const [svg, setSvg] = useState(
        createAvatar(avt, { seed: "avatar", dataUri: true })
    );
    const onClickRandom = () => {
        setSvg(
            createAvatar(avt, {
                seed: randomString,
                backgroundColor: `#${randomColor}`,
                dataUri: true,
            })
        );
    };
    const onHandleChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        setSvg(
            createAvatar(avt, {
                seed: name,
                backgroundColor: `#${randomColor}`,
                dataUri: true,
            })
        );
    };
    const onSelectedAvatar = (e) => {
        setAvt(obj[e.target.value]);
        setSvg(createAvatar(avt, { seed: name, dataUri: true }));
    };
    const styles = reactCSS({
        default: {
            color: {
                width: "20px",
                height: "20px",
                borderRadius: "2px",
                background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
            },
            swatch: {
                padding: "5px",
                background: "#fff",
                borderRadius: "1px",
                boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                display: "inline-block",
                cursor: "pointer",
            },
            popover: {
                position: "absolute",
                zIndex: "2",
            },
            cover: {
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
            },
        },
    });
    const handleClick = () => {
        setDisplayColorPicker( !displayColorPicker )
      };

      const handleClose = () => {
        setDisplayColorPicker(false)
      };
    
      const handleChange = useCallback((colorbg) => {
        setColor(colorbg.rgb)
        setSvg(
            createAvatar(avt, {
                seed: randomString,
                backgroundColor: `${colorbg.hex}`,
                dataUri: true,
            })
        );
      });
    return (
        <div
            className="flex justify-center items-center w-full h-full flex-col"
            style={{ backgroundColor: "rgb(182, 252, 137)" }}
        >
            <ShakeLittle>
                <img src={svg} alt="" className="w-64 h-64 " />
            </ShakeLittle>
            <select
                className="select select-bordered w-64 mt-3 hover:scale-110"
                onChange={onSelectedAvatar}
            >
                <option disabled="disabled" value="initials">
                    Choose your styles
                </option>
                <option value="initials">initials</option>
                <option value="bigEars">big-ears</option>
                <option value="bigEarsNeutral">big-ears-neutral</option>
                <option value="micah">micah</option>
                <option value="miniavs">miniavs</option>
                <option value="avataaars">avataaars</option>
                <option value="openPeeps">open-peeps</option>
                <option value="bottts">bottts</option>
                <option value="identicon">identicon</option>
                <option value="personas">personas</option>
                <option value="bigSmile">big-smile</option>
                <option value="jdenticon">jdenticon</option>
            </select>
            <div className="relative mt-3 w-64 hover:scale-110">
                <button className="absolute top-0 left-0 rounded-r-none btn bg-transparent border-none" onClick={ handleClick }>
                    <span
                        className="flex w-5 h-5 rounded"
                        style={styles.color}
                    ></span>
                </button>
                <input
                    type="text"
                    placeholder="#fffff"
                    className="w-full pr-16 pl-16 input input-primary input-bordered"
                />
                <button className="absolute top-0 right-0 rounded-l-none btn btn-primary">
                    <i className="fas fa-lock-open"></i>
                </button>
                {displayColorPicker ? (
                    <div style={styles.popover} className="mt-3">
                        <div style={styles.cover} onClick={handleClose} />
                        <SketchPicker
                            color={color}
                            onChange={handleChange}
                        />
                    </div>
                ) : null}
            </div>
            <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-64 mt-3 hover:scale-110"
                value={name}
                onChange={(e) => onHandleChangeName(e)}
            ></input>
            <button className="btn hover:scale-110 mt-3 w-64">
                <i className="fas fa-download mr-3"></i>Download
            </button>
            <button className="btn hover:scale-110 mt-3 w-64">
                <i className="far fa-hand-point-down mr-3"></i> Upload
            </button>
            <button
                className="btn hover:scale-110 w-64 mt-3"
                onClick={onClickRandom}
            >
                <i className="fas fa-dice mr-3"></i>Random
            </button>
            <button
                className="btn hover:scale-110 w-64 mt-3"
                onClick={onClickRandom}
            >
                <i className="fas fa-paper-plane mr-3"></i>Submit
            </button>
        </div>
    );
}
