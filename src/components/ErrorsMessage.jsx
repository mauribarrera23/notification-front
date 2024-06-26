import React from "react";

const ErrorMessage = ({ message, onClose }) => (
    message && (
        <div className="notification is-danger">
            <button className="delete" onClick={onClose}></button>
            <p className="has-text-centered">{message}</p>
        </div>
    )
);

export default ErrorMessage;
