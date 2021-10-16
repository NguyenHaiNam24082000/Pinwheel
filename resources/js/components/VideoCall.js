import React,{useRef} from 'react'

export default function VideoCall() {
    const Scenary=useRef();
    const Cameras=useRef();
    // Area:
    function Area(Increment, Count, Width, Height, Margin = 10) {
        let i = w = 0;
        let h = Increment * 0.75 + (Margin * 2);
        while (i < (Count)) {
            if ((w + Increment) > Width) {
                w = 0;
                h = h + (Increment * 0.75) + (Margin * 2);
            }
            w = w + Increment + (Margin * 2);
            i++;
        }
        if (h > Height) return false;
        else return Increment;
    }
// Dish:
    function Dish() {

        // variables:
            let Margin = 2;
            let Width = Scenary.current.offsetWidth - (Margin * 2);
            let Height = Scenary.current.offsetHeight - (Margin * 2);
            let Cameras = document.getElementsByClassName('Camera');
            let max = 0;
        
        // loop (i recommend you optimize this)
            let i = 1;
            while (i < 5000) {
                let w = Area(i, Cameras.length, Width, Height, Margin);
                if (w === false) {
                    max =  i - 1;
                    break;
                }
                i++;
            }
        
        // set styles
            max = max - (Margin * 2);
            setWidth(max, Margin);
    }

// Set Width and Margin 
    function setWidth(width, margin) {
        let Cameras = document.getElementsByClassName('Camera');
        for (var s = 0; s < Cameras.length; s++) {
            Cameras[s].style.width = width + "px";
            Cameras[s].style.margin = margin + "px";
            Cameras[s].style.height = (width * 0.75) + "px";
        }
    }
    function add() {
        let Camera = document.createElement('div');
        Camera.className = 'Camera';
        Scenary.current.appendChild(Camera);
        Dish();
    }
    return (
        <div className="flex p-3 h-screen w-screen overflow-hidden bg-white" onLoad={Dish}>
            <div className="w-8/12 bg-black" id="dish" ref={Scenary}>
            <div className="Camera"></div>
            <div className="Camera"></div>
            <div className="Camera"></div>
            <div className="Camera"></div>
            <div className="Camera"></div>
                {/* <video src="https://webcoban.vn/file/bunny.mp4" autoplay></video> */}
            </div>
            <div className="flex flex-col w-4/12 bg-red-700">

            </div>
        </div>
    )
}
