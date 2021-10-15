import React from "react";
import styled from "styled-components";
// import { motion } from "framer-motion";

const ModalDiv = styled.div`
    display: ${(p) => p.block && p.block};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
`;

const ContentDiv = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    height: auto;
    padding: 2rem;
    transform: translate(-50%, -50%);
    background: white;
`;

export default function Modal({ handleClose, show, children }) {
    return (
        <ModalDiv block={show ? "block" : "none"}>
            <ContentDiv className="modal-box">
                <button className="btn btn-primary mask mask-squircle absolute -top-6 -right-6"                     onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current" >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" ></path>
                    </svg>
                </button>
                {children}
            </ContentDiv>
            {/* 
            <ContentDiv>
                {children}
                <button onClick={handleClose}>Close</button>
            </ContentDiv> */}
        </ModalDiv>
    );
}
