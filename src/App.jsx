import React, { useContext, useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";
import Login from "./components/Login";
import NotificationList from "./components/notification/NotificationList";
import NotificationSentList from "./components/notification/NotificationSentList";
import ChannelList from "./components/channels/ChannelList";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`/root`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setMessage("Connection refused.");
    } else {
      setMessage(data);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <div>
      <Header title={message} />
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          <Router>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notifications" element={token ? <NotificationList /> : <Navigate to="/login" />} />
              <Route path="/notifications/sent" element={token ? <NotificationSentList /> : <Navigate to="/login" />} />
              <Route path="/channels" element={token ? <ChannelList /> : <Navigate to="/login" />} />
              <Route path="/" element={token ? <Navigate to="/notifications" /> : <Navigate to="/login" />} />
            </Routes>
          </Router>
        </div>
        <div className="column"></div>
      </div>
    </div>
  );
};

export default App;


