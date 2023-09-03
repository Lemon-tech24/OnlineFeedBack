import React from 'react'
import { Navigate } from 'react-router-dom'

function Loading({ status }) {

    return (
        <div className="loading">
            LOADING.....
            {status ? <Navigate to="/home" /> : <Navigate to="/login" />}
        </div>
    )
}

export default Loading