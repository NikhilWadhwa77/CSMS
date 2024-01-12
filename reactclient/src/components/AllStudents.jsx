import React, { useState, useEffect } from 'react'
import StudentCard from './StudentCard';
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";


const AllStudents = () => {

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const [isFaculty, setIsFaculty] = useState(false);

    useEffect(() => {
        if (cookies.token) {
            const token = cookies.token;
            const decoded = jwt_decode(token);
            if (decoded.role === "F") {
                setIsFaculty(true);
            }
        }
    }, [cookies])

    const [list, setList] = useState([]);


    const loadAllStudents = async () => {
        const res = await fetch('/getlist', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        // console.log(res)
        const data = await res.json();
        // console.log(data)
        setList(data)
        setFilteredUsers(data)
    }

    useEffect(() => {
        loadAllStudents();
    }, [])

    const createStudentCard = obj => {
        return <StudentCard
            key={obj.rollno}
            name={obj.name}
            roll={obj.rollno}
            email={obj.email}
        />
    }
    const [searchItem, setSearchItem] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = list.filter((user) => {
            const roll = user.rollno.toString()
            return roll.includes(searchTerm)
        }
        );
        setFilteredUsers(filteredItems);
    }

    const [deleteItem, setDeleteItem] = useState('');

    const handleDeleteItemChange = (e) => {
        setDeleteItem(e.target.value)
    }

    const handleDeleteFaculty = async (e) => {
        e.preventDefault()
        console.log(deleteItem)
        const res = await fetch('/deletestudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ deleteItem })
        })

        const data = res.json();

        if (res.status !== 200 || !data) {
            window.alert("FAILED to Delete")
            console.log("FAILED to Delete")
        } else {
            window.alert("SUCCESSFUL Deletion")
            console.log("SUCCESSFUL Deletion")
        }

    }

    return (
        <>
            <div className='container-fluid all-faculty-header'>
                <div className="row">
                    <div className="col"><h1>All Students </h1></div>
                    <div className="col">
                        <input
                            type="text"
                            value={searchItem}
                            onChange={handleInputChange}
                            placeholder='Search By Roll Number'
                        />
                    </div>
                    <div className="col">
                        {isFaculty &&
                            <form>
                                <input type='text' value={deleteItem} onChange={handleDeleteItemChange} placeholder='Enter Roll No. to remove'></input>
                                <button className='btn btn-sm btn-danger' onClick={handleDeleteFaculty}>Remove</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
            <div className='all-students-container'>
                <div className="row student-list-headings">
                    <div className="col display-6">Name</div>
                    <div className="col display-6">Roll Number</div>
                    <div className="col display-6">E.Mail</div>
                </div>
                {filteredUsers.map(createStudentCard)}
            </div>

        </>
    )
}

export default AllStudents
