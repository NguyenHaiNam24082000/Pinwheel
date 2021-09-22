import React, { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import socialMediaAuth from "../context/Auth";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
    const facebookAuth = new FacebookAuthProvider();
    const googleAuth = new GoogleAuthProvider();
    const [checkReCAPTCHA, setCheckReCAPTCHA] = useState(false);

    const history = useHistory();
    const handleOnClick = async (provider) => {
        const res = await socialMediaAuth(provider);
        console.log(res);
        if (res) {
            history.push("/");
        }
    };

    function onChangeReCAPTCHA(value) {
        console.log("Captcha value:", value);
        setCheckReCAPTCHA(true);
    }

    return (
        <main className="flex flex-col h-screen bg-black">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="md:row-start-1 md:col-start-2 md:col-end-2 px-12 py-3">
                    <div className="flex flex-col justify-center h-full">
                        {/* <img
                            src="../../images/logo.svg"
                            className="w-24 mb-14"
                        /> */}
                        <img
                            src="../../images/logo.svg"
                            alt="logo"
                            className="cursor-pointer  w-20 h-20 mb-2 mask mask-squircle"
                        />
                        <h1 className="text-3xl font-bold mb-2">
                            IMAGINE A PLACE...
                        </h1>
                        <h2 className="text-xl font-bold mb-2">
                            … A place that makes it easy for you to have daily
                            conversations and meet more often.
                        </h2>
                        <form className="flex flex-col">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Username/Email:
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Username/Email"
                                    className="input input-bordered"
                                />
                                <label className="label">
                                    <span className="label-text">
                                        Password:
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                />
                                <label className="label p-0 mt-3">
                                    <label className="label p-0">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm border-white mr-3"
                                        />
                                        <span className="label-text">
                                            Remember me
                                        </span>
                                    </label>
                                    <a href="#" className="label-text">
                                        Forgot password ?
                                    </a>
                                </label>
                                <ReCAPTCHA
                                    sitekey={`6Ldx2oAcAAAAAFjXik09xjzL1CeOlE8QfBl06dmX`}
                                    onChange={onChangeReCAPTCHA}
                                    className="mt-3"
                                    theme="dark"
                                />
                            </div>
                            <div className="divider">OR</div>
                            <div className="flex mb-5 justify-center">
                                <FaFacebook
                                    className="w-8 h-8 mr-3 cursor-pointer"
                                    onClick={() => handleOnClick(facebookAuth)}
                                />
                                <FaGoogle
                                    className="w-8 h-8 cursor-pointer"
                                    onClick={() => handleOnClick(googleAuth)}
                                />
                            </div>
                            <div className="flex justify-around">
                                <button
                                    className=" p-4 mb-4 border font-bold rounded-full text-sm lg:w-2/5 border-white"
                                    disabled={!checkReCAPTCHA}
                                    type="submit"
                                >
                                    Sign in
                                </button>
                                <button
                                    className="
                  p-4
                  mb-4
                  font-bold
                  rounded-full
                  text-sm
                  lg:w-2/5
                  text-black
                  bg-white
                "
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    className="md:row-start-1 md:col-start-1 md:col-end-1"
                    style={{ height: "95vh" }}
                >
                    <div
                        className="bg-cover bg-no-repeat h-full bg-center"
                        style={{
                            backgroundImage:
                                // "url(../../images/plannet.gif)",
                                "url(../../images/logo.gif)",
                            // "url(https://source.unsplash.com/random)",
                        }}
                    >
                        {/* <video src={`../../images/background/bg_video_${Math.floor(Math.random()*12)}.mp4`} autoPlay muted loop className="w-full h-full"></video> */}
                        {/* <div className="flex justify-center items-center h-full">
                            <img src="../../images/logo.svg" />
                        </div> */}
                    </div>
                </div>
            </div>
            <nav className="p-2">
                <ul className="flex flex-wrap justify-center">
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="https://www.freepik.com/vectors/design"
                        >
                            Design vector created by coolvector -
                            www.freepik.com
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Privacy
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Rules
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            License
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Advertisement
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Advertisement Selection
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Cookies
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Discord
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Facebook
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Google
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Github
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Dribbble
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Pinwheel © 2021
                        </a>
                    </li>
                    {/* <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Twitter para empresas
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Desarrolladores
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Guía
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Configuración
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            © 2021 Twitter, Inc.
                        </a>
                    </li> */}
                </ul>
            </nav>
        </main>
    );
}
