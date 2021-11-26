import React, { useState,useRef } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { socialMediaAuth } from "../context/Auth";
import { postNewUser } from "../context/UserProvider";
import ReCAPTCHA from "react-google-recaptcha";
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useHistory } from "react-router-dom";
import { CheckIcon, Cross1Icon } from "@modulz/radix-icons";
import { MailIcon, LockIcon  } from "@primer/octicons-react";
import { PasswordInput, Progress, Text, Popover,TextInput } from "@mantine/core";

function PasswordRequirement({ meets, label }) {
    return (
        <Text
            color={meets ? "teal" : "red"}
            style={{ display: "flex", alignItems: "center", marginTop: 7 }}
            size="sm"
        >
            {meets ? <CheckIcon /> : <Cross1Icon />}{" "}
            <span style={{ marginLeft: 10 }}>{label}</span>
        </Text>
    );
}

function EmailRequirement({ meets, label }) {
    return (
        <Text
            color={meets ? "teal" : "red"}
            style={{ display: "flex", alignItems: "center", marginTop: 7 }}
            size="sm"
        >
            {meets ? <CheckIcon /> : <Cross1Icon />}{" "}
            <span style={{ marginLeft: 10 }}>{label}</span>
        </Text>
    );
}

const requirementsPassword = [
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

const requirementsEmail = [
    { re: /^\S+@\S+$/, label: "Must be email" },
];


function getStrengthPassword(password) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirementsPassword.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirementsPassword.length + 1)) * multiplier, 10);
}

function getStrengthEmail(email) {
    let multiplier = email.length > 5 ? 0 : 1;

    requirementsEmail.forEach((requirement) => {
        if (!requirement.re.test(email)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirementsEmail.length + 1)) * multiplier, 10);
}

const randomBG=()=>{
    return Math.floor(
        Math.random() * 12
    )
};

export default function Login() {
    const history = useHistory();
    const facebookAuth = new FacebookAuthProvider();
    const googleAuth = new GoogleAuthProvider();
    const [checkReCAPTCHA, setCheckReCAPTCHA] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [popoverOpenedPassword, setPopoverOpenedPassword] = useState(false);
    const [popoverOpenedEmail, setPopoverOpenedEmail] = useState(false);
    const randomRef=useRef(randomBG());
    const checksPassword = requirementsPassword.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(password)}
        />
    ));
    const checksEmail = requirementsEmail.map((requirement, index) => (
        <EmailRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(email)}
        />
    ));

    const strengthPassword = getStrengthPassword(password);
    const strengthEmail = getStrengthEmail(email);
    const colorPassword = strengthPassword === 100 ? "teal" : strengthPassword > 50 ? "yellow" : "red";
    const colorEmail = strengthEmail === 100 ? "teal" : strengthEmail > 50 ? "yellow" : "red";

    const handleOnClick = async (provider) => {
        const { additionalUserInfo, result } = await socialMediaAuth(provider);
        if (additionalUserInfo.isNewUser) {
            postNewUser({
                username: result.user.email,
                email: result.user.email,
                name: result.user.displayName,
                avatar: result.user.photoURL,
                password: "",
                phone: result.user.phoneNumber,
            });
        } else {
            console.log("old user", result);
        }
        history.push("/");
    };

    const onHandleSubmit = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(user);
        } catch (errors) {
            console.log(errors.message);
        }
    };

    const onHandleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onHandleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    function onChangeReCAPTCHA(value) {
        console.log("Captcha value:", value);
        setCheckReCAPTCHA(true);
    }

    return (
        <main className="flex flex-col h-screen bg-black text-white">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="md:row-start-1 md:col-start-2 md:col-end-2 px-12 py-3">
                    <div className="flex flex-col justify-center h-full">
                        {/* <img
                            src="../../images/logo.svg"
                            className="w-24 mb-14"
                        /> */}
                        {/* <img
                            src="../../images/logo.svg"
                            alt="logo"
                            className="cursor-pointer  w-20 h-20 mb-2 mask mask-squircle"
                        /> */}
                        <h1 className="text-3xl font-bold mb-2">
                            IMAGINE A PLACE...
                        </h1>
                        <h2 className="text-xl font-bold mb-2">
                            … A place that makes it easy for you to have daily
                            conversations and meet more often.
                        </h2>
                        <div className="flex mb-5 mt-5 justify-center">
                            <button
                                className="btn btn-outline mr-5"
                                onClick={() => handleOnClick(facebookAuth)}
                            >
                                <FaFacebook className="w-8 h-8 mr-3 cursor-pointer text-blue-500" />
                                Login with Facebook
                            </button>
                            <button
                                className="btn btn-outline"
                                onClick={() => handleOnClick(googleAuth)}
                            >
                                <FcGoogle className="w-8 h-8 mr-3 cursor-pointer" />
                                Login with Google
                            </button>
                        </div>
                        <div className="divider">OR</div>
                        <form
                            className="flex flex-col"
                            onSubmit={onHandleSubmit}
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Username/Email:
                                    </span>
                                </label>
                                <Popover
                                    opened={popoverOpenedEmail}
                                    position="bottom"
                                    placement="start"
                                    withArrow
                                    styles={{ popover: { width: "300px" } }}
                                    noFocusTrap
                                    transition="pop-top-left"
                                    onFocusCapture={() =>
                                        setPopoverOpenedEmail(true)
                                    }
                                    onBlurCapture={() =>
                                        setPopoverOpenedEmail(false)
                                    }
                                    target={
                                        <TextInput
                                            required
                                            placeholder="Your Email"
                                            icon={<MailIcon />}
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(
                                                    event.currentTarget.value
                                                )
                                            }
                                        />
                                    }
                                >
                                    <Progress
                                        color={colorEmail}
                                        value={strengthEmail}
                                        size={5}
                                        style={{ marginBottom: 10 }}
                                    />
                                    <EmailRequirement
                                        label="Includes at least 6 characters"
                                        meets={email.length > 5}
                                    />
                                    {checksEmail}
                                </Popover>
                                {/* <input
                                    type="text"
                                    placeholder="Username/Email"
                                    className="input input-bordered"
                                    onChange={onHandleChangeEmail}
                                    value={email}
                                /> */}
                                <label className="label">
                                    <span className="label-text">
                                        Password:
                                    </span>
                                </label>
                                {/* <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                    onChange={onHandleChangePassword}
                                    value={password}
                                /> */}
                                <Popover
                                    opened={popoverOpenedPassword}
                                    position="bottom"
                                    placement="start"
                                    withArrow
                                    styles={{ popover: { width: "300px" } }}
                                    noFocusTrap
                                    transition="pop-top-left"
                                    onFocusCapture={() =>
                                        setPopoverOpenedPassword(true)
                                    }
                                    onBlurCapture={() =>
                                        setPopoverOpenedPassword(false)
                                    }
                                    target={
                                        <PasswordInput
                                            required
                                            icon={<LockIcon />}
                                            placeholder="Your password"
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(
                                                    event.currentTarget.value
                                                )
                                            }
                                        />
                                    }
                                >
                                    <Progress
                                        color={colorPassword}
                                        value={strengthPassword}
                                        size={5}
                                        style={{ marginBottom: 10 }}
                                    />
                                    <PasswordRequirement
                                        label="Includes at least 6 characters"
                                        meets={password.length > 5}
                                    />
                                    {checksPassword}
                                </Popover>
                                <label className="label p-0 mt-3">
                                    <label className="label p-0">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm border-white mr-3"
                                            style={{ display: "inline-block" }}
                                        />
                                        <span className="label-text">
                                            Remember me
                                        </span>
                                    </label>
                                    <a href="#" className="label-text">
                                        Forgot password ?
                                    </a>
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
                                    className=" p-4 mb-4 border font-bold rounded-full text-sm lg:w-2/5 border-white"
                                    disabled={!checkReCAPTCHA}
                                    type="submit"
                                    // onClick={()=>login()}
                                >
                                    Sign in
                                </button>
                                <button
                                    className=" p-4 mb-4 font-bold rounded-full text-sm lg:w-2/5 text-black bg-white"
                                    onClick={() => history.push("/register")}
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
                        // style={{
                        //     backgroundImage:
                        //         // "url(../../images/plannet.gif)",
                        //         "url(../../images/logo.gif)",
                        //     // "url(https://source.unsplash.com/random)",
                        // }}
                    >
                        <video src={`../../images/background/bg_video_${randomRef.current}.mp4`} autoPlay muted loop className="w-full h-full"></video>
                        {/* <div className="flex justify-center items-center h-full">
                            <img src="../../images/logo.svg" />
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="p-2 w-full">
                <ul className="flex flex-wrap justify-around">
                    {/* <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="https://www.freepik.com/vectors/design"
                        >
                            Design vector created by coolvector -
                            www.freepik.com
                        </a>
                    </li> */}
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
            </div>
        </main>
    );
}
