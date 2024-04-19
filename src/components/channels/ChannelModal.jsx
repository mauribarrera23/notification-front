import React, { useEffect, useState } from "react";

const ChannelModal = ({ active, handleModal, token, id, setErrorMessage }) => {
    const [tag, setTag] = useState("");
    const [tagList, setTagList] = useState([]);
    const [channelError, setChannelError] = useState(false);


    const cleanFormData = () => {
        setTag("");
    }

    const handleCreateChannel = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({tag: tag})
        };
        if(tag){
            const response = await fetch(`/channel/create`, requestOptions);
            if (!response.ok) {
                setChannelError(true);
            } else {
                cleanFormData();
                handleModal();
                setChannelError(false);
            }
        }else{
            setChannelError(true);
        }
    }

    return(
        <div className={`modal ${active && "is-active"}`}>
            <div className="modal-background" onClick={handleModal}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-primary-light">
                    <h1 className="modal-card-title" style={{color: "black"}}>
                        {id ? "Update Notification" : "Create channel"}
                    </h1>
                </header>
                <section className="modal-card-body">
                    <form action="">
                        <div className="field">
                            <label className="label">Channel name</label>
                            <div className="control">
                                <input 
                                type="text"
                                placeholder="Enter the message"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                className="input"
                                required
                            />
                            </div>
                            <br />
                        </div>
                    </form>
                </section>

                { channelError && (
                    <div className="notification is-danger">
                        <button className="delete" onClick={() => setChannelError(false)}></button>
                        <p>Something went wrong! Validate the "Channel name" field, is mandatory</p>
                    </div>
                )}

                <footer className="modal-card-foot has-background-primary-light">
                    <button className="button is-primary" onClick={handleCreateChannel}>Create</button>
                    <button className="button is-danger" onClick={handleModal}>Cancel</button>
                </footer>
            </div>
        </div>
    )

};

export default ChannelModal;
