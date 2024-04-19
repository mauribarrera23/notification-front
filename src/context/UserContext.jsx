import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("notificationToken"));

    useEffect(() => {
        const fetchUser = async () => {
            if(localStorage.getItem("notificationToken", token)){
                const requestOptions = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                };

                const response = await fetch(`/user/me`, requestOptions);

                if (!response.ok){
                    setToken(null);
                }
                localStorage.setItem("notificationToken", token);
            };
        };
        if (token){
            fetchUser();
        }
    }, [token]);

    return (
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    )
};
