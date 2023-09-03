import React from 'react'

function Loading({ success, setLoading }) {

    const delay = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }
    return (
        <div className="loading">
            LOADING.....
            {delay()}
        </div>
    )
}

export default Loading