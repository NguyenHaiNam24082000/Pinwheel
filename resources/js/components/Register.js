import React, { useState } from "react";
import socialMediaAuth from "../context/Auth";
import ReCAPTCHA from "react-google-recaptcha";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useHistory } from "react-router-dom";
import "react-focus-rings/src/styles.css";
const axios = require("axios").default;
import * as Yup from "yup";

export default function Register() {
    const history = useHistory();
    const [checkReCAPTCHA, setCheckReCAPTCHA] = useState(false);
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError]= useState({})
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email is invalid").required("This field is required"),
        password: Yup.string().min(8,"Must be 8 characters or more").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,"Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number").required("This field is required"),
        username: Yup.string().min(6,"Must be 6 characters or more").required("This field is required"),
        name: Yup.string().min(8).max(50).required("This field is required")
    })
    const onChangeReCAPTCHA = (value) => {
        console.log(value)
        setCheckReCAPTCHA(true);

    };
    const onHandleSubmit = async (event) => {
        event.preventDefault();
        const initialsValue={
            name: name,
            email: email,
            username: username,
            password: password,
        };
        const isValid=await validationSchema.isValid(initialsValue);
        if(isValid) {
            await axios
            .post("/api/user/post",initialsValue)
            .then(function (response) {
                // handle success
                
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        }
    };
    const onHandleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onHandleChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const onHandleChangePassword = (e) => {
        setPassword(e.target.value)
    };
    const onHandleChangeName = (e) => {
        setName(e.target.value)
    };
    const onHandleLogin = ()=>{
        history.push("/login");
    }
    return (
        <main className="flex flex-col h-screen bg-black w-full">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="md:row-start-1 md:col-start-2 md:col-end-2 px-12 py-3">
                    <div
                        className="flex flex-col justify-center h-full"

                    >
                        <h1 className="text-3xl font-bold mb-2">Register</h1>
                        <form
                            className="flex flex-col"
                            onSubmit={onHandleSubmit}
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email:</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered focus:ring-2 focus:ring-blue-600"
                                    onChange={onHandleChangeEmail}
                                    value={email}
                                />
                                <label className="label">
                                    <span className="label-text">
                                        Username:
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="input input-bordered focus:ring-2 focus:ring-blue-600"
                                    onChange={onHandleChangeUsername}
                                    value={username}
                                />
                                <label className="label">
                                    <span className="label-text">
                                        Name:
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="input input-bordered focus:ring-2 focus:ring-blue-600"
                                    onChange={onHandleChangeName}
                                    value={name}
                                />
                                <label className="label">
                                    <span className="label-text">
                                        Password:
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered focus:ring-2 focus:ring-blue-600"
                                    onChange={onHandleChangePassword}
                                    value={password}
                                />
                                <label className="label">
                                    <span className="label-text">
                                        Birthday:
                                    </span>
                                </label>
                                <div className="flex justify-between">
                                    <select className="select select-bordered w-3/12 focus:ring-2 focus:ring-blue-600">
                                        <option disabled="disabled" selected>
                                            Choose
                                        </option>
                                        {(() => {
                                            let date = [];
                                            for (let i = 1; i <= 31; ++i)
                                                date.push(i);
                                            return date.map((value, index) => (
                                                <option key={index + value}>
                                                    {value}
                                                </option>
                                            ));
                                        })()}
                                    </select>
                                    <select className="select select-bordered w-5/12 focus:ring-2 focus:ring-blue-600">
                                        <option disabled="disabled" selected>
                                            Choose
                                        </option>
                                        {(() => {
                                            let month = [
                                                "January",
                                                "February",
                                                "March",
                                                "April",
                                                "May",
                                                "June",
                                                "July",
                                                "August",
                                                "September",
                                                "October",
                                                "November",
                                                "December",
                                            ];
                                            return month.map((value, index) => (
                                                <option key={index + value}>
                                                    {value}
                                                </option>
                                            ));
                                        })()}
                                    </select>
                                    <select className="select select-bordered w-3/12 focus:ring-2 focus:ring-blue-600">
                                        <option disabled="disabled" selected>
                                            Choose
                                        </option>
                                        {(() => {
                                            let year = [];
                                            let fullYear =
                                                new Date().getFullYear();
                                            for (
                                                let i = fullYear - 120;
                                                i <= fullYear;
                                                ++i
                                            )
                                                year.push(i);
                                            year.reverse();
                                            return year.map((value, index) => (
                                                <option
                                                    key={
                                                        index.toString() + value
                                                    }
                                                >
                                                    {value}
                                                </option>
                                            ));
                                        })()}
                                    </select>
                                </div>
                                <label className="cursor-pointer flex items-center mt-3 mb-3">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-white border-white mr-3"
                                    />
                                    <span className="label-text">
                                        I have read and agree to Pinwheel's {" "}
                                        <a className="text-info">
                                            Terms of Service
                                        </a>
                                        {" "} and {" "}
                                        <a className="text-info">
                                            Privacy Policy
                                        </a>
                                        .
                                    </span>
                                </label>
                                <div className="flex justify-center items-center mt-3 mb-5">
                                    <ReCAPTCHA
                                        sitekey={`6Ldx2oAcAAAAAFjXik09xjzL1CeOlE8QfBl06dmX`}
                                        onChange={onChangeReCAPTCHA}
                                        theme="dark"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-around">
                                <button
                                    className=" p-4 mb-4 font-bold rounded-full text-sm lg:w-2/5 text-black bg-white"
                                    disabled={!checkReCAPTCHA}
                                    type="submit"
                                >
                                    Sign up
                                </button>
                                <button className=" p-4 mb-4 border font-bold rounded-full text-sm lg:w-2/5 border-white" onClick={onHandleLogin}>
                                    Sign in
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
                </ul>
            </nav>
        </main>
    );
}
