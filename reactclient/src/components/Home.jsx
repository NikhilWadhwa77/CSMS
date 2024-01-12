import React, { useState, useEffect } from 'react'
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";


function Home() {

    const [userData, setUserData] = useState({});
    const [cookies] = useCookies([]);

    const loadMyAccount = async () => {
        try {
            const res = await fetch('/getData', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            // console.log(data);
            setUserData(data);
            // console.log(userData);


        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        loadMyAccount()
        // eslint-disable-next-line
    }, [])

    // eslint-disable-next-line
    const [cookies2, setCookie2, removeCookie2] = useCookies(['token']);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (cookies2.token) {
            const token = cookies2.token;
            const decoded = jwt_decode(token);
            if (decoded.role === "ADMIN") {
                setIsAdmin(true)
            }
        }
    }, [cookies2])

    return (
        <>
            <div className="home-div">
                <p>Welcome</p>
                <h1>{isAdmin && "Hello BOSS!!"}</h1>
                <h1>{cookies.token ? userData.name : `Explore your Potential`}</h1>
                <h2>{cookies.token && "How are you today?"}</h2>
            </div>
        </>
    )
}

export default Home
