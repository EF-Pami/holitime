import React, { useEffect} from "react";
import ReactDom from "react-dom";
import PropTypes  from "prop-types";
import { useLocation } from "react-router-dom";

const Modal = ({ children, isOpen, onClose, isSuccess }) => {
    const location = useLocation();

    useEffect(() => {
        if (!isOpen) return;

        const isBookingPath = /\/booking\/\d+/.test(location.pathname);
        if (
            isSuccess &&
            !isBookingPath &&
            location.pathname !== "registration" &&
            location.pathname !== "login"
        ) {
            const timer = setTimeout(() => {
                window.location.reload();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isSuccess]);

    if (!isOpen) return null;

    return ReactDom.createPortal(
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[999]">
            <div className="bg-background p-10 rounded-25 flex flex-col gap-5">
                <div className={`circle-loader ${isSuccess ? "load-complete" : ""}`}>
                    <div className={`checkmark ${isSuccess ? "draw" : ""}`}></div>
                </div>
                {children}
                <button className="btn m-auto mt-4" onClick={() => {
                    onClose();
                }}
                aria-label="Close Modal">Close</button>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isSuccess: PropTypes.bool,
};

export default Modal;