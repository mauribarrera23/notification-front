import React, { useEffect, useState } from "react";

const NotificationModal = ({ active, handleModal, token, id, setErrorMessage }) => {
    const [message, setMessage] = useState("");
    const [tag, setTag] = useState("");
    const [tagList, setTagList] = useState([]);
    const [users, setUsers] = useState([]);
    const [recipientId, setRecipientId] = useState(null);

    useEffect( () =>{
        const getNotification = async () =>{
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };
    
            const response = await fetch(`/notification/detail/${id}`, requestOptions);
            if (!response.ok) {
                setErrorMessage("Something went wrong on update notification.");
            } else  {
                const data = await response.json();
                setMessage(data.data.message);
                setTag(data.data.tag);
            }
        };

        const getTags = async () => {
            const tagsRequestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };
            
            const responseTag = await fetch(`/channel/list`, tagsRequestOptions);
                if (!responseTag.ok) {
                    setErrorMessage("Something went wrong on get channels.");
                } else {
                    const data = await responseTag.json();
                    setTagList(data);
                }
        }

        const getUsers = async () => {
            const tagsRequestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };
            
            const responseTag = await fetch(`/user/`, tagsRequestOptions);
                if (!responseTag.ok) {
                    setErrorMessage("Something went wrong on get users.");
                } else {
                    const data = await responseTag.json();
                    setUsers(data);
                }
        }

        if (id){
            getNotification();
        } else {
            getTags();
            getUsers();
        }
    }, [id, token]);

    const cleanFormData = () => {
        setMessage("");
        setTag("");
    }

    const handleCreateNotification = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                message: message,
                channel: {
                    tag: "tag",
                    id: parseInt(tag)
                },
                recipient_id: recipientId
            
            }),
        };

        const response = await fetch("/notification/create", requestOptions);
        if (!response.ok) {
            setErrorMessage("Something went wrong on notification sent");
        } else {
            cleanFormData();
            handleModal();
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                message: message,
                tag: tag,
                recipient_id: null
            
            }),
        };

        const response = await fetch(`/notification/update/${id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Something went wrong on notification update");
        } else {
            cleanFormData();
            handleModal();
        }
    }

    return(
        <div className={`modal ${active && "is-active"}`}>
            <div className="modal-background" onClick={handleModal}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-primary-light">
                    <h1 className="modal-card-title" style={{color: "black"}}>
                        {id ? "Update Notification" : "Send Notification"}
                    </h1>
                </header>
                <section className="modal-card-body">
                    <form action="">
                        <div className="field">
                            <label className="label">Message</label>
                            <div className="control">
                                <input 
                                type="text"
                                placeholder="Enter the message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="input"
                                required
                            />
                            </div>
                            <br />
                            <label className="label">Channel</label>
                            <div className="control">
                                <div className="select">
                                    <select
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                        className="input"
                                        required
                                    >
                                        <option value="">Select a channel</option>
                                        {tagList.map(element => (
                                            <option key={element.id} value={element.id}>{element.tag}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <br />
                            <label className="label">Send message to</label>
                            <div className="control">
                                <div className="select">
                                    <select
                                        value={recipientId}
                                        onChange={(e) => setRecipientId(e.target.value)}
                                        className="input"
                                        required
                                    >
                                        <option value="">Select a username</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>{user.username}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <br />
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot has-background-primary-light">
                    {id ? (
                        <button className="button is-info" onClick={handleUpdate}>Update</button>
                    ) : (
                        <button className="button is-primary" onClick={handleCreateNotification}>Create</button>
                    )}
                    <button className="button is-danger" onClick={handleModal}>Cancel</button>
                </footer>
            </div>
        </div>
    )

};

export default NotificationModal;
