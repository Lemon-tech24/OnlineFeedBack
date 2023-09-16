import React, { useState, useEffect } from 'react';
import { getUser } from './getData/GetUser';
import { logout } from './fetch/Logout';
import Post from './Post';
import LogoutPop from './LogoutPop';
import PostsDisplay from './PostsDisplay';

function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [id, setId] = useState(null);
  const [status, setStatus] = useState(null);
  const [given, setGiven] = useState(null);
  const [family, setFamily] = useState(null)
  const [isOpen, setOpen] = useState(false);
  const [isOpenPost, setOpenPost] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resObject = await getUser();
        setUser(resObject.user);
        setEmail(resObject.email);
        setId(resObject.id);
        setStatus(resObject.success);
        setGiven(resObject.given);
        setFamily(resObject.family)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    setOpen(true);
  };

  const confirmLogout = () => {
    setOpen(false);
    logout();
  };

  const closeLogout = () => {
    setOpen(false);
  };

  const handlePostClick = () => {
    setOpenPost(true);
  };

  const handlePostClose = () => {
    setOpenPost(false);
  };


  return (
    <div className="Home">
      <div className="home-nav">
        <div className="currentUser">Hello, {given ? given : 'Loading...'}</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="add-post">
        <button onClick={handlePostClick}>Add Feedback</button>
      </div>

      <div className="home-canvas">
        <LogoutPop isOpen={isOpen} confirmLogout={confirmLogout} closeLogout={closeLogout} />
        <Post isOpenPost={isOpenPost} handlePostClose={handlePostClose} given={given} family={family} id={id} />
        <PostsDisplay />
      </div>



    </div>
  );
}

export default Home;
