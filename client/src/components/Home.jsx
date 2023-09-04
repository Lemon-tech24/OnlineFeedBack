import React, { useState, useEffect } from 'react';
import { getUser } from './getData/GetUser'
import { logout } from './fetch/Logout'
import Post from './Post';

function Home() {

  const [user, setUser] = useState(null)
  const [email, setEmail] = useState(null)
  const [id, setId] = useState(null)
  const [status, setStatus] = useState(null)
  const [given, setGiven] = useState(null)
  const [family, setFamily] = useState(null)
  const [isOpen, setOpen] = useState(false)
  const [addfeed, setAddFeed] = useState(false)


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resObject = await getUser(); // Call the getUser function
        setUser(resObject.user);
        setEmail(resObject.email);
        setId(resObject.id);
        setStatus(resObject.success);
        setGiven(resObject.given);
        setFamily(resObject.family);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, []);


  const handleLogout = () => {
    setOpen(true)
  }

  const confirmLogout = () => {
    setOpen(false)
    logout()
  }

  const closeLogout = () => {
    setOpen(false)
  }

  const handleAddFeedback = () => {

  }

  return (
    <div className='Home'>
      <div className="home-nav">
        <div className="currentUser">Hello, {given ? given : 'Loading...'}</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="add-post">
        <button>Add Feedback</button>
      </div>

      <div className="home-canvas">
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

        {addfeed && (
          <div className="post-overlay">
            <div className="post-box">

              <div className="post-close">
                <button>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
