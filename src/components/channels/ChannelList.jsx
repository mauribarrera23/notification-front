import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import ErrorMessage from "../ErrorsMessage";
import { UserContext } from "../../context/UserContext";
import ChannelModal from "./ChannelModal";
import { useNavigate } from "react-router-dom";

const ChannelList = () =>{
    const [token] = useContext(UserContext);
    const [channels, setChannels] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [id, setId] = useState(null);
    const navigate = useNavigate();

    const getChannels = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch(`/channel/list`, requestOptions);

        if (!response.ok) {
            setErrorMessage("Something went wrong on channels load.");
        } else  {
            const data = await response.json();
            setChannels(data);
            setLoading(true);
            setErrorMessage("");
        }
    };

    useEffect(() => {
        getChannels();
    }, []);

    const handleModal = () => {
        setActiveModal(!activeModal);
        getChannels();
        setId(null);
    };

    const handleUnsubscribe = async (channel_id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch(`/channel/unsubscribe/${channel_id}`, requestOptions);
        if (!response.ok) {
            const data = await response.json();
            setErrorMessage(data.detail);
        } else  {
            getChannels();
        }
    };

    const handleSubscribe = async (channel_id) => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch(`/channel/subscribe/${channel_id}`, requestOptions);
        if (!response.ok) {
            const data = await response.json();
            setErrorMessage(data.detail);
        } else  {
            getChannels();
        }
    };


    return (
        <>
            <ChannelModal active={activeModal} handleModal={handleModal} token={token} id={id} setErrorMessage={setErrorMessage} />
            <button 
                className="button is-fullwidth mb-5 is-primary"
                onClick={() => setActiveModal(true)}
            >
                Create channel
            </button>
            <button 
                className="button is-fullwidth mb-5 is-primary"
                onClick={() => navigate("/notifications")}
            >
                Return to notifications
            </button>
            <ErrorMessage message={errorMessage} />
            {loading && channels ? (
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Channel Tag</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { channels.map((channel) => (
                            <tr key={channel.id}>
                                <td style={{width: "20rem"}}>{channel.tag}</td>
                                <td>
                                    <button 
                                    className="button mr-2 is-info is-ligth"
                                    onClick={() => handleSubscribe(channel.id)}
                                    >
                                    Subscribe
                                    </button>
                                    <button 
                                        className="button mr-2 is-info is-danger"
                                        onClick={() => handleUnsubscribe(channel.id)}
                                    >
                                        Unsubscribe
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

export default ChannelList;
