import React from 'react'
import { useState, useEffect } from 'react'
import AnnouncemetForm from './AnnouncemetForm'
import Announcement from './Announcement'
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

const Dashboard = () => {

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['token']);


    const [isAdmin, setIsAdmin] = useState(false);
    const [isFaculty, setIsFaculty] = useState(false);
    const [isStudent, setIsStudent] = useState(false);

    useEffect(() => {
        if (cookies.token) {
            const token = cookies.token;
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
    }, [cookies])


    const [announcements, setAnnouncements] = useState([]);

    const [createAnnouncementForm, setCreateAnnouncementForm] = useState(false)

    const createAnnouncement = () => {
        setCreateAnnouncementForm(true);
    }

    const closeCreateAnnouncement = (val) => {
        setCreateAnnouncementForm(val)
    }

    const create = (newAnnounce) => {
        setAnnouncements(prev => {
            return [...prev, newAnnounce]
        })
    }



    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-6 notice'>
                        <div className='notice-body'>
                            <div className='notice-header'>
                                <div className='row'>
                                    <div className='col-10'>
                                        <h3>Notice and Announcements</h3>
                                    </div>
                                    {isAdmin &&
                                        <div className='col'>
                                            <button className='btn btn-primary' onClick={createAnnouncement} >Add</button>
                                        </div>
                                    }
                                </div>
                            </div>
                            {createAnnouncementForm && <AnnouncemetForm close={closeCreateAnnouncement} create={create} />}
                            <Announcement
                                desc="# CSE-5 Frontend Engineering End term evaluation cancelled"
                            />
                            {announcements.map(item => {
                                return (
                                    <Announcement
                                        desc={item}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className='col dashboard-right-panel'>
                        <div className="row">
                            <div className="col">
                                {isStudent &&
                                    <div className="container-fluid marks-table text-center">

                                        <h1 className='mb-4'>My Marks</h1>

                                        <div className="row">
                                            <div className="col h4">Subject</div>
                                            <div className="col h4">Marks</div>
                                        </div>
                                        <div className="row">
                                            <div className="col">PA</div>
                                            <div className="col">36</div>
                                        </div>
                                        <div className="row">
                                            <div className="col">FEE</div>
                                            <div className="col">39</div>
                                        </div>
                                        <div className="row">
                                            <div className="col">NALR</div>
                                            <div className="col">33</div>
                                        </div>
                                    </div>
                                }
                                {isFaculty &&
                                    <div className='upload-marks'>
                                        <form >
                                            <div className="row">
                                                <div className="col">
                                                    <input type="text" required placeholder='Student Roll Number' />
                                                </div>
                                                <div className="col">
                                                    <input type="text" placeholder='PA Marks' />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col"></div>
                                                <div className="col">
                                                    <input type="text" placeholder='FEE Marks' />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col"></div>
                                                <div className="col">
                                                    <input type="text" placeholder='NALR Marks' />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col"></div>
                                                <div className="col">
                                                    <button className='mt-5 btn btn-outline-success'>Upload</button>
                                                </div>
                                                <div className="col"></div>
                                            </div>
                                        </form>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col">
                                {isStudent &&
                                    <div className="container-fluid marks-table text-center">

                                        <h1 className='mb-4'>My Attendence</h1>

                                        <div className="row">
                                            <div className="col h4">Subject</div>
                                            <div className="col h4">Attendence</div>
                                        </div>
                                        <div className="row">
                                            <div className="col">PA</div>
                                            <div className="col">77.3%</div>
                                        </div>
                                        <div className="row">
                                            <div className="col">FEE</div>
                                            <div className="col">100%</div>
                                        </div>
                                        <div className="row">
                                            <div className="col">NALR</div>
                                            <div className="col">70%</div>
                                        </div>
                                    </div>
                                }
                                {isFaculty &&
                                    <div className='upload-marks'>
                                        <form >
                                            <div className="row">
                                                <div className="col">
                                                    <input type="text" required placeholder='Student Roll Number' />
                                                </div>
                                                <div className="col">
                                                    <input type="text" placeholder='PA Attendence' />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col"></div>
                                                <div className="col">
                                                    <input type="text" placeholder='FEE Attendence' />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col"></div>
                                                <div className="col">
                                                    <input type="text" placeholder='NALR Attendence' />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col"></div>
                                                <div className="col">
                                                    <button className='mt-5 btn btn-outline-success'>Upload</button>
                                                </div>
                                                <div className="col"></div>
                                            </div>
                                        </form>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
