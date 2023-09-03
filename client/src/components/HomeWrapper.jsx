import React from 'react'

function HomeWrapper({ id, user, email }) {

    const logout = () => {
        window.open("http://localhost:5000/auth/logout", "_self");
    };

    return (
        <div className="home-wrapper">
            {user}
            <button onClick={logout}>dasdsad</button>
        </div>
    )
}

export default HomeWrapper