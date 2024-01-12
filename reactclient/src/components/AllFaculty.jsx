import React, { useState, useEffect } from 'react'
import StudentCard from './StudentCard';


const Allfaculty = () => {

    const [list, setList] = useState([]);

    const loadAllStudents = async () => {
        const res = await fetch('/getfacultylist', {
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
            key={obj.facultyID}
            name={obj.name}
            roll={obj.facultyID}
            email={obj.email}
        />
    }
    const [searchItem, setSearchItem] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = list.filter((user) => {
            const id = user.facultyID.toString()
            return id.includes(searchTerm)
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
        const res = await fetch('/deletefaculty', {
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
            <div className="container-fluid all-faculty-header">
                <div className="row">
                    <div className="col">
                        <h1>All Faculty</h1>
                    </div>
                    <div className="col">
                        <input type="text" value={searchItem} onChange={handleInputChange} placeholder='Search By Faculty ID' />
                    </div>
                    <div className="col">
                        <form>
                            <input type='text' value={deleteItem} onChange={handleDeleteItemChange} placeholder='Enter Faculity ID to remove'></input>
                            <button className='btn btn-sm btn-danger' onClick={handleDeleteFaculty}>Remove </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='all-students-container'>
                <div className="row student-list-headings">
                    <div className="col display-6">Name</div>
                    <div className="col display-6">Faculty ID</div>
                    <div className="col-4 display-6">E.Mail</div>
                </div>
                {filteredUsers.map(createStudentCard)}
            </div>

        </>
    )
}

export default Allfaculty
