import React from 'react'

export default function VideoCall() {
    return (
        <div className="flex p-3 h-screen w-screen overflow-hidden bg-white">
            <div className="flex flex-col w-8/12 bg-black">
                <video src="https://webcoban.vn/file/bunny.mp4" autoplay></video>
            </div>
            <div className="flex flex-col w-4/12 bg-red-700">

            </div>
        </div>
    )
}
