import React from "react";

const SuccessMessage = ({ message, onClose }) => (
    message && (
        <div className="notification is-primary">
            <button className="delete" onClick={onClose}></button>
            <p className="has-text-centered">{message}</p>
        </div>
    )
);

export default SuccessMessage;
