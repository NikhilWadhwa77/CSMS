import React from 'react'

const StudentCard = (props) => {


    return (
        <div className='container-fluid student-card'>
            <div className="row">
                <div className="col">{props.name}</div>
                <div className="col">{props.roll}</div>
                <div className="col-4">{props.email}</div>
            </div>
        </div>
    )
}

export default StudentCard
