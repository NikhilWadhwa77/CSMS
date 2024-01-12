import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AddFaculty = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({ name: '', email: '', facultyID: '', password: '' })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        const { name, email, facultyID, password } = userData;

        const res = await fetch("/addfaculty", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, facultyID, password })
        })

        console.log(res.status + "server sent response while adding faculty")

        const data = await res.json()

        console.log(data)

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
        <div className='row'>
            <div className='col-4'></div>
            <div className='col-4'>
                <div className="signup-form-container">
                    <h1 className="signup-form-heading">Add Faculty</h1>
                    <form method='POST'>
                        <div className="signup-input-fields  user-signup-roll">
                            <input type="text" placeholder="Name" name='name' value={userData.name} onChange={handleInputChange}></input>
                        </div>
                        <div className="signup-input-fields  user-signup-roll">
                            <input type="email" placeholder="E Mail" name='email' value={userData.email} onChange={handleInputChange}></input>
                        </div>
                        <div className="signup-input-fields  user-signup-roll">
                            <input type="text" placeholder="facultyID" name='facultyID' value={userData.facultyID} onChange={handleInputChange}></input>
                        </div>
                        <div className="signup-input-fields  user-signup-password">
                            <input type="password" placeholder="Password" name='password' value={userData.password} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <button className="btn btn-outline-dark" type="submit" onClick={submitHandler}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='col-4'></div>
        </div>
    )
}

export default AddFaculty
