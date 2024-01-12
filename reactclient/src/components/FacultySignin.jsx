import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const FacultySignin = () => {
    const navigate = useNavigate();

    const [facultyID, setfacultyID] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (event) => {
        event.preventDefault()

        const res = await fetch('/facultySignin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ facultyID, password })
        })

        const data = res.json()

        if (res.status === 400 || !data) {
            window.alert("Login FAILED")
        } else {
            window.alert("Welcome You are LOGGED in")
            navigate('/')
        }

    }

    return (
        <>
            <div className="login-form-container">
                <div>
                    <h1 className="login-form-heading">Faculty Log In</h1>
                </div>
                <form>
                    <div className="login-input-fields  user-login-roll">
                        <input type="text" value={facultyID} onChange={(e) => setfacultyID(e.target.value)} placeholder="Faculty ID" ></input>
                    </div>
                    <div className="login-input-fields  user-login-password">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" ></input>
                    </div>
                    <div>
                        <button className="btn btn-outline-dark" type="submit" onClick={loginUser}>Submit</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default FacultySignin
