/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import chitkara from '../images/chitkara.png'
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";



const Navbar = () => {

    const navigate = useNavigate()

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isFaculty, setIsFaculty] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const logout = () => {
        removeCookie('token')
        navigate("/")
    }

    useEffect(() => {
        if (cookies.token) {
            const token = cookies.token;
            const decoded = jwt_decode(token);
            if (decoded.role === "F") {
                setIsFaculty(true);
            }
            if (decoded.role === "ADMIN") {
                setIsAdmin(true)
            }
        }
    }, [setIsFaculty, cookies])

    // const printToken = () => {
    //     const decoded = jwt_decode(cookies.token);
    //     console.log(decoded)
    // }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img className='me-2' src={chitkara} alt="" height='40px' width='40px' />
                        CSMS
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto me-5 ">
                            <li className="nav-item ms-3">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item ms-3">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            {!isAdmin &&
                                <li className="nav-item ms-3">
                                    <Link className="nav-link" to="/myaccount">My Account</Link>
                                </li>
                            }
                            {!cookies.token && <>
                                <li className="nav-item ms-3">
                                    <Link className="nav-link" to="/signin">Student LogIn</Link>
                                </li>
                                <li className="nav-item ms-3">
                                    <Link className="nav-link" to="/facultySignin">Faculty LogIn</Link>
                                </li>
                                <li className="nav-item ms-3">
                                    <Link className="nav-link" to="/adminsignin">Admin Login</Link>
                                </li>
                            </>}
                            {isFaculty &&
                                <>
                                    <li className="nav-item ms-3">
                                        <Link className="nav-link" to="/signup">Add Student</Link>
                                    </li>
                                    <li className="nav-item ms-3">
                                        <Link className="nav-link" to="/studentlist">All Students</Link>
                                    </li>
                                </>

                            }
                            {isAdmin &&
                                <>
                                    <li className="nav-item ms-3">
                                        <Link className="nav-link" to="/addFaculty">Add Faculty</Link>
                                    </li>
                                    <li className="nav-item ms-3">
                                        <Link className="nav-link" to="/studentlist">All Students</Link>
                                    </li>
                                    <li className="nav-item ms-3">
                                        <Link className="nav-link" to="/allfaculty">All Faculty</Link>
                                    </li>
                                </>
                            }
                            {cookies.token && <>
                                <li className="nav-item ms-3">
                                    <a className="nav-link" onClick={logout} href=''>Logout</a>
                                </li>
                            </>}

                        </ul>
                        {/* <a onClick={printToken}>click me</a> */}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
