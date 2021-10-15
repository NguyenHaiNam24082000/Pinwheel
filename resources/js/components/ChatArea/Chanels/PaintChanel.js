import React, { useState, useCallback, useLayoutEffect } from "react";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import rough from "roughjs/bundled/rough.esm";
import hexRgb from "hex-rgb";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ReactStickies from 'react-stickies';

const generator = rough.generator();

const createElement = (x1, y1, x2, y2, strokeColor, type, strokeWidth) => {
    const roughElement =
        type === "line"
            ? generator.line(x1, y1, x2, y2, {
                  stroke: strokeColor,
                  strokeWidth: strokeWidth,
              })
            : generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
                  stroke: strokeColor,
                  strokeWidth: strokeWidth,
              });
    return { x1, y1, x2, y2, roughElement };
};

export default function PaintChanel() {
    const [elements, setElements] = useState([]);
    const [path, setPath] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const [brushSize, setBrushSize] = useState(1);
    const [type, setType] = useState("line");
    const ctxRef = React.useRef();
    const canvasRef = React.useRef();
    const hue = React.useRef(0);
    const selectedSaturation = React.useRef(100);
    const selectedLightness = React.useRef(50);
    const lastX = React.useRef(0);
    const lastY = React.useRef(0);
    const width = 20;
    const widthHalf = width ? width / 2 : 0;
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState({
        r: "0",
        g: "0",
        b: "0",
        a: "1",
    });
    useLayoutEffect(() => {
        // const canvas = document.getElementById("canvas");
        ctxRef.current = canvasRef.current.getContext("2d");
        ctxRef.current.lineCap = "round";
        ctxRef.current.lineJoin = "round";
        if (type === "line" || type === "rect") {
            ctxRef.current.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
            const roughCanvas = rough.canvas(canvasRef.current);
            elements.forEach(({ roughElement }) =>
                roughCanvas.draw(roughElement)
            );
            ctxRef.current.beginPath();
            for (let i = 0; i < path.length; i++) {
                if (!path[i].isDraw) ctxRef.current.beginPath();
                ctxRef.current.lineTo(path[i].x, path[i].y);
                ctxRef.current.strokeStyle = path[i].strokeColor;
                ctxRef.current.lineWidth = path[i].size;
                ctxRef.current.lineCap = "round";
                ctxRef.current.lineJoin = "round";
                ctxRef.current.stroke();
            }
        }
    }, [elements]);
    const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.3" height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;
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

    const handleClear = useCallback(() => {
        if (!ctxRef || !ctxRef.current || !canvasRef || !canvasRef.current) {
            return;
        }
        setPath([]);
        setElements([]);
        ctxRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );
    }, []);

    const onHandleColorInputChange = (e) => {
        const value = e.target.value;
        const regex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g;
        const found = value.match(regex);
        console.log(found);
        if (found) {
            const hex2Rgb = hexRgb(value);
            setColor({
                r: hex2Rgb.red.toString(),
                g: hex2Rgb.green.toString(),
                b: hex2Rgb.blue.toString(),
                a: hex2Rgb.alpha.toString(),
            });
            console.log(hexToRgb(value));
        }
    };

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = useCallback((colorbg) => {
        setColor(colorbg.rgb);
    });

    const handleMouseDown = (e) => {
        setDrawing(true);

        const { clientX, clientY } = e;

        if (type === "line" || type === "rect") {
            const element = createElement(
                clientX,
                clientY,
                clientX,
                clientY,
                `rgba(${color.r},${color.g} , ${color.b},${color.a})`,
                type,
                brushSize
            );
            setElements((prevState) => [...prevState, element]);
        } else {
            let strokeColor = `rgba(${color.r},${color.g} , ${color.b},${color.a})`;
            if (type === "dream") {
                setColor(
                    `hsl(${hue.current},${selectedSaturation.current}%,${selectedLightness.current}%)`
                );
                strokeColor = `hsl(${hue.current},${selectedSaturation.current}%,${selectedLightness.current}%)`;
                ctxRef.current.globalCompositeOperation = "source-over";

                hue.current++;

                if (hue.current >= 360) hue.current = 0;
            }
            let x = clientX - canvasRef.current.offsetLeft;
            let y = clientY - canvasRef.current.offsetTop;
            ctxRef.current.beginPath();
            ctxRef.current.moveTo(
                clientX - canvasRef.current.offsetLeft,
                clientY - canvasRef.current.offsetTop
            );
            setPath((prev) => [
                ...prev,
                { x, y, isDraw: drawing, strokeColor, size: brushSize },
            ]);
            e.preventDefault();
        }
    };

    const setCurrentSaturation = (e) => {
        setColor(
            `hsl(${hue.current},${e.currentTarget.value}%,${selectedLightness.current}%)`
        );
        selectedSaturation.current = e.currentTarget.value;
    };

    const setCurrentLightness = (e) => {
        setColor(
            `hsl(${hue.current},${selectedSaturation.current}%,${e.currentTarget.value}%)`
        );
        selectedLightness.current = e.currentTarget.value;
    };

    const handleMouseMove = (e) => {
        if (!drawing) return;
        const { clientX, clientY } = e;
        if (type === "line" || type === "rect") {
            const index = elements.length - 1;
            const { x1, y1 } = elements[index];
            const updatedElement = createElement(
                x1,
                y1,
                clientX,
                clientY,
                `rgba(${color.r},${color.g} , ${color.b},${color.a})`,
                type,
                brushSize
            );

            const elementCopy = [...elements];
            elementCopy[index] = updatedElement;
            setElements(elementCopy);
        } else {
            let strokeColor = `rgba(${color.r},${color.g} , ${color.b},${color.a})`;
            if (type === "dream") {
                setColor(
                    `hsl(${hue.current},${selectedSaturation.current}%,${selectedLightness.current}%)`
                );
                strokeColor = `hsl(${hue.current},${selectedSaturation.current}%,${selectedLightness.current}%)`;
                ctxRef.current.globalCompositeOperation = "source-over";

                hue.current++;

                if (hue.current >= 360) hue.current = 0;
            }
            let x = clientX - canvasRef.current.offsetLeft;
            let y = clientY - canvasRef.current.offsetTop;
            ctxRef.current.lineTo(x, y);
            ctxRef.current.strokeStyle = strokeColor;
            ctxRef.current.lineWidth = brushSize;
            ctxRef.current.lineCap = "round";
            ctxRef.current.lineJoin = "round";
            ctxRef.current.stroke();
            setPath((prev) => [
                ...prev,
                { x, y, isDraw: drawing, strokeColor, size: brushSize },
            ]);
            e.preventDefault();
        }
    };

    const handleMouseUp = (e) => {
        setDrawing(false);
        let isDraw = drawing;
        let i=path.length-1;
        const pathCopy = [...path];
        pathCopy[i] = { ...pathCopy[i], isDraw };
        setPath([...pathCopy]);
        e.preventDefault()
    };

    return (
        <section className="w-full h-full flex relative">
            <aside
                className="w-2/12 h-full p-5 absolute z-50"
                style={{ backgroundColor: "#f1f1f1" }}
            >
                <div>
                    <div className="tool-section tool-section--lrg flex justify-center flex-col items-center">
                        <small>
                            <strong className="text-black">
                                Brush Preview
                            </strong>
                        </small>
                        <div className="preview border-2 border-dashed border-black rounded">
                            <div
                                className="preview__brush"
                                style={{
                                    backgroundColor: `${type==='dream'? color: `rgba(${color.r},${color.g} , ${color.b},${color.a})`}`,
                                    width: `${brushSize}px`,
                                    height: `${brushSize}px`,
                                }}
                            />
                        </div>
                    </div>
                    <div className="tool-section tool-section--lrg">
                        <div className="tool-section">
                            <small>
                                <strong className="text-black">
                                    Brush color
                                </strong>
                            </small>
                        </div>
                        <div className="relative bg-white">
                            <button
                                className="absolute top-0 left-0 rounded-r-none btn bg-transparent border-none hover:bg-transparent"
                                onClick={handleClick}
                            >
                                <span
                                    className="flex w-5 h-5 rounded"
                                    style={{
                                        backgroundColor: `${type==='dream'? color: `rgba(${color.r},${color.g} , ${color.b},${color.a})`}`,
                                    }}
                                ></span>
                            </button>
                            <input
                                type="text"
                                placeholder="#fffff"
                                className="w-full pl-16 input input-primary input-bordered bg-transparent text-black"
                                onChange={onHandleColorInputChange}
                            />
                            {displayColorPicker ? (
                                <div style={styles.popover} className="mt-3">
                                    <div
                                        style={styles.cover}
                                        onClick={handleClose}
                                    />
                                    <SketchPicker
                                        color={color}
                                        onChange={handleChange}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="tool-section">
                        <small>
                            <strong className="text-black">Tools</strong>
                        </small>
                    </div>
                    <div className="tool-grid tool-section tool-section--lrg">
                        <div>
                            <button
                                className={`btn btn--tool ${
                                    type === "line" && "tool--active"
                                }`}
                                onClick={(e) => {
                                    setType("line");
                                }}
                            >
                                <img src="../../../images/paint/line.png"></img>
                            </button>
                        </div>
                        <div>
                            <button
                                className={`btn btn--tool ${
                                    type === "rect" && "tool--active"
                                }`}
                                onClick={(e) => {
                                    setType("rect");
                                }}
                            >
                                <img src="../../../images/paint/rectangle.png"></img>
                            </button>
                        </div>
                        <div>
                            <button
                                className={`btn btn--tool ${
                                    type === "brush" && "tool--active"
                                }`}
                                onClick={(e) => {
                                    setType("brush");
                                }}
                            >
                                <img src="../../../images/paint/art-and-design.png"></img>
                            </button>
                        </div>
                        <div>
                            <button
                                className={`btn btn--tool ${
                                    type === "dream" && "btn--dream-active"
                                }`}
                                onClick={(e) => {
                                    setType("dream");
                                }}
                            >
                                <img src="../../../images/paint/brush.png"></img>
                            </button>
                        </div>
                        <div>
                            <button className="btn btn--tool ">
                                <img src="../../../images/paint/eraser.png"></img>
                            </button>
                        </div>
                        <div>
                            <input
                                id="tool-autowidth"
                                type="checkbox"
                                title="Dynamic brush size"
                            />{" "}
                            <label
                                htmlFor="tool-autowidth"
                                className="btn btn--tool "
                            >
                                <img src="../../../images/paint/growth.png"></img>
                            </label>
                        </div>
                        <div>
                            <label className="btn btn--tool ">
                                <img src="../../../images/paint/laser.png"></img>
                            </label>
                        </div>
                    </div>
                    <div className="tool-section tool-section--lrg">
                        <div className="tool-section">
                            <small>
                                <strong className="text-black">
                                    Brush size
                                </strong>
                            </small>
                        </div>
                        <div className="tool-section">
                            <input
                                type="range"
                                min={1}
                                max={50}
                                defaultValue={brushSize}
                                className="w-full"
                                onChange={(e) => {
                                    setBrushSize(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="tool-section tool-section--lrg">
                        <div className="tool-section">
                            <small>
                                <strong className="text-black">
                                    Magic brush
                                </strong>
                            </small>
                        </div>
                        <div className="tool-section flex items-center w-full">
                            <label className="mr-2">
                                <small className="text-black">Saturation</small>
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                defaultValue={100}
                                onChange={setCurrentSaturation}
                            />
                        </div>
                        <div className="tool-section flex items-center w-full">
                            <label className="mr-2">
                                <small className="text-black">Lightness</small>
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                defaultValue={50}
                                onChange={setCurrentLightness}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <a
                        className="btn btn--main btn--block"
                        download="image.png"
                        href="#"
                    >
                        Save Image
                    </a>
                    <button className="btn btn--block" onClick={handleClear}>
                        Clear
                    </button>
                </div>
            </aside>
            <TransformWrapper
                doubleClick={{ disabled: true }}
                panning={{ disabled: true }}
            >
                {({ zoomIn, zoomOut, resetTransform, centerView, ...rest }) => (
                    <>
                        <TransformComponent>
                            <canvas
                                id="canvas"
                                ref={canvasRef}
                                className="h-full bg-white z-30"
                                width={window.innerWidth}
                                height={window.innerHeight}
                                style={{ cursor: cursor }}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                            ></canvas>
                        </TransformComponent>
                        <div
                            className="absolute flex z-50 bottom-3 right-44 w-20 h-10 rounded justify-around items-center"
                            style={{ backgroundColor: "#f1f1f1" }}
                        >
                            <button className="w-8 h-8 bg-white flex justify-center items-center rounded-md">
                                <i className="fas fa-undo w-4 h-4 text-black"></i>
                            </button>
                            <button className="w-8 h-8 bg-white flex justify-center items-center rounded-md">
                                <i className="fas fa-redo w-4 h-4 text-black"></i>
                            </button>
                        </div>
                        <div
                            className="absolute flex z-50 bottom-3 right-3 w-40 h-10 rounded justify-around items-center"
                            style={{ backgroundColor: "#f1f1f1" }}
                        >
                            <button
                                className="w-8 h-8 bg-white flex justify-center items-center rounded-md"
                                onClick={() => zoomIn()}
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    role="img"
                                    viewBox="0 0 448 512"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fill="#000"
                                        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                    />
                                </svg>
                            </button>
                            <button
                                className="w-8 h-8 bg-white flex justify-center items-center rounded-md"
                                onClick={() => zoomOut()}
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    role="img"
                                    viewBox="0 0 448 512"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fill="#000"
                                        d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                    />
                                </svg>
                            </button>
                            <button
                                className="w-8 h-8 bg-white flex justify-center items-center rounded-md"
                                onClick={() => resetTransform()}
                            >
                                <i className="fas fa-sync-alt w-4 h-4 text-black"></i>
                            </button>
                            <button
                                className="w-8 h-8 bg-white flex justify-center items-center rounded-md"
                                onClick={() => centerView()}
                            >
                                <i className="fas fa-compress-arrows-alt w-4 h-4 text-black"></i>
                            </button>
                        </div>
                    </>
                )}
            </TransformWrapper>
        </section>
    );
}
