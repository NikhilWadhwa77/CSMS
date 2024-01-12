import React, { useState } from 'react'
import authenticate from '../images/authenticate.png'
import { useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({ name: '', email: '', rollno: '', password: '', cpassword: '' })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault()


        const { name, email, rollno, password, cpassword } = userData;

        const res = await fetch("/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, rollno, password, cpassword })
        })

        // console.log(res.status)

        const data = await res.json()

        // console.log(data)

        if (res.status === 422 || !data) {
            window.alert("FAILED to Register")
            console.log("FAILED to Register")
        } else {
            window.alert("SUCCESSFUL Registration")
            console.log("SUCCESSFUL Registration")

            navigate('/signin')
        }

    }

    return (
        <>
            <div className="container-fluid outer-signup-container">
                <div className="row align-items-center">
                    <div className="col-lg-5">
                        <div className="signup-form-container">
                            <h1 className="mb-5">Add Student</h1>
                            <form method='POST'>
                                <div className="signup-input-fields  user-signup-roll">
                                    <input type="text" placeholder="Name" name='name' value={userData.name} onChange={handleInputChange}></input>
                                </div>
                                <div className="signup-input-fields  user-signup-roll">
                                    <input type="email" placeholder="E Mail" name='email' value={userData.email} onChange={handleInputChange}></input>
                                </div>
                                <div className="signup-input-fields  user-signup-roll">
                                    <input type="text" placeholder="Roll No." name='rollno' value={userData.rollno} onChange={handleInputChange}></input>
                                </div>
                                <div className="signup-input-fields  user-signup-password">
                                    <input type="password" placeholder="Password" name='password' value={userData.password} onChange={handleInputChange}></input>
                                </div>
                                <div className="signup-input-fields  user-signup-roll">
                                    <input type="password" placeholder="Confirm Password" name='cpassword' value={userData.cpassword} onChange={handleInputChange}></input>
                                </div>
                                <div>
                                    <button className="btn btn-outline-dark" type="submit" onClick={submitHandler}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-7 text-center">
                        <img className='signup-img' src={authenticate} alt="" height='80%' width='100%' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
