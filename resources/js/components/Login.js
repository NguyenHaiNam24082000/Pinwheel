import React from "react";
import "../../css/Login.css";
import QRCode from 'qrcode.react';

export default function Login() {
    const loadLogin = () => {
        const email = document.getElementById("logemail");
        const password = document.getElementById("logpass");
        const login = document.querySelector(".btn");
        const ptxt = document.getElementById("pword-txt");
        const etxt = document.getElementById("email-txt");
        const Eerror = document.getElementById("email-error");
        const perror = document.getElementById("password-error");
        const input = document.querySelector(".form-style");
        const container = document.querySelector(".container");
        const esearch = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        const psearch = /[a-z]{8,32}/g;

        login.addEventListener("click", (e) => {
            if (!password.value.match(psearch)) {
                password.focus();
                e.preventDefault();
                password.style.borderColor = "#ec4846";
                ptxt.style.color = "#ec4846";
                perror.innerText =
                    " - Password should be between 8 and 32 characters";
            } else if (email.value === "" || !email.value.match(esearch)) {
                email.focus();
                e.preventDefault();
                email.style.borderColor = "#ec4846";
                etxt.style.color = "#ec4846";
                Eerror.innerText = " - This is not a valid email address";
            } else {
                email.value = "";
                password.value = "";
                container.style.animation = "jump .3s linear";
                container.addEventListener("animationend", () => {
                    container.style.display = "none";
                    canvas.style.transform = "translate(0vw)";
                    // setTimeout(() => {
                    user.login = true;
                    //}, 1000)
                });
            }
            setTimeout(() => {
                ptxt.style.color = "#919296";
                etxt.style.color = "#919296";
                perror.innerText = "";
                Eerror.innerText = "";
                email.style.borderColor = "";
                password.style.borderColor = "";
            }, 2500);
        });

        const canvas = document.getElementById("svgBlob");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let numParticles = 20;
        let particles = [];

        const colors = ["#1d1e22", "#7d8087", "#5f6988"];

        const mouse = {
            x: null,
        };

        let user = {
            login: false,
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 200;
                this.radius = Math.random() * 2 + 2;
                this.speedX = Math.random() * 2;
                this.moveRight = this.x + this.speedX;
                this.moveLeft = this.x - this.speedX;
                this.speedY = Math.random() * 0.5;
                this.color = colors[Math.floor(Math.random() * 3)];
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }
            update() {
                this.draw();
                if (!user.login) {
                    this.y -= this.speedY;
                } else {
                    this.y -= 10;
                }
                if (this.y <= canvas.height) {
                    if (mouse.x > canvas.width / 2) {
                        this.x = this.moveRight;
                    } else {
                        this.x = this.moveLeft;
                    }
                }
            }
        }

        function setup() {
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.x;
        });

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle, index) => {
                particle.update();
                if (particle.y + particle.radius < 0) {
                    setTimeout(() => {
                        particles.splice(index, 1);
                    }, 0);
                    if (!user.login) {
                        particles.push(new Particle());
                    }
                }
            });
        }
        setup();
        animate();

        window.addEventListener("resize", function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    };
    return (
        <div className="login" onLoad={loadLogin}>
            <canvas id="svgBlob" />
            <div className="position">
                <form className="container">
                    <div className="centering-wrapper">
                        <div className="section1 text-center">
                            <div className="primary-header">Welcome back!</div>
                            <div className="secondary-header">
                                We're so excited to see you again!
                            </div>
                            <div className="input-position">
                                <div className="form-group">
                                    <h5
                                        className="input-placeholder"
                                        id="email-txt"
                                    >
                                        Email
                                        <span
                                            className="error-message"
                                            id="email-error"
                                        />
                                    </h5>
                                    <input
                                        type="email"
                                        required="true"
                                        name="logemail"
                                        className="form-style"
                                        id="logemail"
                                        autoComplete="off"
                                        style={{ marginBottom: "20px" }}
                                    />
                                    <i className="input-icon uil uil-at" />
                                </div>
                                <div className="form-group">
                                    <h5
                                        className="input-placeholder"
                                        id="pword-txt"
                                    >
                                        Password
                                        <span
                                            className="error-message"
                                            id="password-error"
                                        />
                                    </h5>
                                    <input
                                        type="password"
                                        required="true"
                                        name="logpass"
                                        className="form-style"
                                        id="logpass"
                                        autoComplete="on"
                                    />
                                    <i className="input-icon uil uil-lock-alt" />
                                </div>
                            </div>
                            <div className="password-container">
                                <a href="#" className="link">
                                    Forgot your password?
                                </a>
                            </div>
                            <div className="btn-position">
                                <a href="#" className="btn">
                                    login
                                </a>
                            </div>
                        </div>
                        <div className="horizontalSeparator" />
                        <div className="qr-login">
                            <div className="qr-container">
                                {/* <img
                                    className="logo w-24 h-24 mask mask-squircle bg-white"
                                    src="../images/logo.svg"
                                /> */}
                                {/* <canvas id="qr-code" /> */}
                                <QRCode
                                    value="http://facebook.github.io/react/"
                                    id="qr-code"
                                    size={170}
                                />
                            </div>
                            <div className="qr-pheader">
                                Log in with QR Code
                            </div>
                            <div className="qr-sheader">
                                Scan this with the <strong>scanner app </strong>
                                to log in instantly.
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
