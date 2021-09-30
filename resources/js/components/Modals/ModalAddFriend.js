import React from "react";
import Modal, {   useModalState, modalAnimation } from "react-simple-modal-provider";

export default function ModalAddFriend({children}) {
    const [isOpen, setOpen] = useModalState();
    return (
        <Modal
            id={"ModalAddFriend"}
            consumer={children}
            isOpen={isOpen}
            setOpen={setOpen}
            duration={250}
            animation={modalAnimation.scaleUp}
            draggable={true}
        >
            <div className="flex flex-col w-64 h-16 bg-white ">😆</div>
        </Modal>
    );
}
