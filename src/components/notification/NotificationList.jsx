import React, { useContext, useEffect, useState, componentDidMount } from "react";
import moment from "moment";
import ErrorMessage from "../ErrorsMessage";
import { UserContext } from "../../context/UserContext";
import NotificationModal from "./NotificationModal";
import { useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from 'react-use-websocket';


const NotificationList = () =>{

    const [token] = useContext(UserContext);
    const [notifications, setNotifications] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [id, setId] = useState(null);
    const navigate = useNavigate();
    const [socketUrl, setSocketUrl] = useState('ws://localhost:8000/ws');

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        if (lastMessage !== null) {
          getNotifications()
        }
      }, [lastMessage]);

    
    const getNotifications = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch(`/notification/received`, requestOptions);

        if (!response.ok) {
            setErrorMessage("Something went wrong on notification load.");
        } else  {
            const data = await response.json();
            setNotifications(data);
            setLoading(true);
        }
    };
    
    useEffect(() => {
        getNotifications();
    }, []);

    const handleModal = () => {
        setActiveModal(!activeModal);
        getNotifications();
        setId(null);
    };

    const handleDelete = async (notification_id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch(`/notification/delete/${notification_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Something went wrong on delete notification.");
        } else  {
            getNotifications();
        }
    };

    const handleUpdate = async (notification_id) => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch(`/notification/update/${notification_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Something went wrong on update notification.");
        } else  {
            getNotifications();
        }
    };

    return (
        <>
            <NotificationModal active={activeModal} handleModal={handleModal} token={token} id={id} setErrorMessage={setErrorMessage} />
            <button 
                className="button is-fullwidth mb-5 is-primary"
                onClick={() => setActiveModal(true)}
            >
                Send notification
            </button>
            <button 
                className="button is-fullwidth mb-5 is-primary"
                onClick={() => navigate("/notifications/sent")}
            >
                Sent notifications
            </button>
            <button 
                className="button is-fullwidth mb-5 is-primary"
                onClick={() => navigate("/channels")}
            >
                Channels
            </button>
            <ErrorMessage message={errorMessage} />
            {loading && notifications ? (
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Sent at</th>
                            <th>Tag</th>
                            <th>Read</th>
                            <th>From</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { notifications.map((notification) => (
                            <tr key={notification.id}>
                                <td style={{width: "20rem"}}>{notification.message}</td>
                                <td>{moment(notification.created_at).format(" DD/MM/YYYY HH:mm:ss")}</td>
                                <td>{notification.channels[0].tag}</td>
                                <td>{notification.read ? (<p style={{color: "green"}}>&#10004;</p>) : (<p style={{color: "red"}}>&#x2716;</p>) }</td>
                                <td>{notification.created_by.username}</td>
                                <td>
                                    <button 
                                    className="button mr-2 is-info is-ligth"
                                    onClick={() => handleUpdate(notification.id)}
                                    >
                                    Read
                                    </button>
                                    <button 
                                        className="button mr-2 is-info is-danger"
                                        onClick={() => handleDelete(notification.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ): (
                <p>Loading...</p>
            )}
        </>
    );
};

export default NotificationList;
