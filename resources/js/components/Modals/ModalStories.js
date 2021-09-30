import React from "react";
import Modal, {
    useModalState,
    modalAnimation,
} from "react-simple-modal-provider";
import Stories from "react-insta-stories";

export default function ModalStories({ children }) {
    const [isOpen, setOpen] = useModalState();
    return (
        <Modal
            id={"ModalStories"}
            consumer={children}
            isOpen={isOpen}
            setOpen={setOpen}
            duration={250}
            animation={modalAnimation.scaleUp}
            draggable={true}
        >
            <Stories
                stories={[
                    'https://st.quantrimang.com/photos/image/2016/10/12/toan-tap-su-sung-paint-650.jpg',
                ]}
                defaultInterval={1500}
                width={432}
                height={768}
            />
        </Modal>
    );
}
