import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

    const navigate = useNavigate();

    const [rollno, setRollno] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (event) => {
        event.preventDefault()

        const res = await fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rollno, password })
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
                    <h1 className="login-form-heading">Student Log In</h1>
                </div>
                <form>
                    <div className="login-input-fields  user-login-roll">
                        <input type="text" value={rollno} onChange={(e) => setRollno(e.target.value)} placeholder="Roll No." ></input>
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

export default Signin
