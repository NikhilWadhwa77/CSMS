import React from 'react'

const Announcement = (props) => {
    return (
        <>
            <div className='container-fluid announcement'>
                <div className='row'>
                    <div className='col-8'>
                        <p className='announcement-desc'>{props.desc}</p>
                    </div>
                    <div className='col-4'>
                        <button className='btn btn-sm btn-success'>
                            <i className="fa-solid fa-download"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Announcement
