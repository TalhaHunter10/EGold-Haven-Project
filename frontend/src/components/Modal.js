import React from "react";
 
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
 
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    height: 'auto',
                    width: 420,
                    margin: "auto",
                    padding: 20,
                    border: "4px solid #ca8a04",
                    borderRadius: 10,
                    boxShadow: "4px solid black",
                }}
            >
                {children}
            </div>
        </div>
    );
};
 
export default Modal;