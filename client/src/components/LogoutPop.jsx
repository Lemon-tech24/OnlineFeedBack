import React from 'react'

function LogoutPop({ isOpen, confirmLogout, closeLogout }) {
    return (
        <>
            {isOpen && (
                <div className="logout-overlay">
                    <div className="logout-box">
                        <h2>Logout Confirmation</h2>
                        <p>Are you sure you want to logout?</p>
                        <div className="logout-btn">
                            <button onClick={confirmLogout}>Yes</button>
                            <button onClick={closeLogout}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LogoutPop