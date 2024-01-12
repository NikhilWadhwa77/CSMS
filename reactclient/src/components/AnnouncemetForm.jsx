import React, { useState } from 'react'

const AnnouncemetForm = (props) => {

    const [desc, setDesc] = useState("");
    const [localKey, setLocalKey] = useState(Number(localStorage.getItem("objectkey")))

    localStorage.setItem("objectkey", localKey)

    const handleSubmit = (e) => {
        e.preventDefault();
        props.create(desc)
        localStorage.setItem(localKey, JSON.stringify(desc))
        setLocalKey(localKey + 1)
        localStorage.setItem("objectkey", localKey)
        setDesc("")
    }

    const close = () => {
        props.close(false)
    }

    return (
        <div>
            <input type='text' placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)}></input>
            <br></br>
            <input type='file'></input>
            <br></br>
            <button type='submit' onClick={handleSubmit}>Post</button>
            <button onClick={close}>Close</button>
        </div>
    )
}

export default AnnouncemetForm
