import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";


const MyAccount = () => {

    // eslint-disable-next-line
    const [cookies2, setCookie, removeCookie] = useCookies(['token']);


    const [isAdmin, setIsAdmin] = useState(false);
    const [isFaculty, setIsFaculty] = useState(false);
    const [isStudent, setIsStudent] = useState(false);

    useEffect(() => {
        if (cookies2.token) {
            const token = cookies2.token;
            const decoded = jwt_decode(token);
            if (decoded.role === "ADMIN") {
                setIsAdmin(true)
            }
            if (decoded.role === "F") {
                setIsFaculty(true);
            }
            if (decoded.role === "S") {
                setIsStudent(true)
            }
        }
    }, [cookies2])

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [cookies] = useCookies([]);

    const loadMyAccount = async () => {
        try {
            const res = await fetch('/myaccount', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            if (res.status !== 200) {
                throw new Error(res.error)
            }

            const data = await res.json();
            // console.log(data);
            setUserData(data);
            // console.log(userData);

        } catch (err) {
            console.log(err)
            navigate("/signin")
        }
    }


    useEffect(() => {
        if (!cookies.token) {
            navigate("/signin");
        } else {
            loadMyAccount()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 text-center">
                        {isAdmin &&
                            <h1>Hello There BOSS!!</h1>
                        }
                        {isStudent &&
                            <h1>Student Info</h1>
                        }
                        {isFaculty &&
                            <h1>Faculty Info</h1>
                        }
                        <div className="my-account-details">
                            <div className="row">
                                <div className="col">
                                    <h2 className="mb-5">Welcome {userData.name} </h2>
                                </div>
                            </div>
                            <div className="row text-start my-account-detail">
                                <div className="col ">Email </div>
                                <div className="col text-end">{userData.email}</div>
                            </div>
                            {isStudent &&
                                <div className="row text-start my-account-detail">
                                    <div className="col ">Rollno.</div>
                                    <div className="col text-end ">{userData.rollno}</div>
                                </div>
                            }
                            <div className="row text-start my-account-detail">
                                <div className="col ">Id</div>
                                <div className="col text-end">{userData._id}</div>
                            </div>
                            <div className="row text-start my-account-detail">
                                <div className="col ">Department</div>
                                <div className="col text-end">CSE</div>
                            </div>
                            <div className="row text-start my-account-detail">
                                <div className="col ">Address</div>
                                <div className="col text-end">Ghar</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        </>
    )
}

export default MyAccount
