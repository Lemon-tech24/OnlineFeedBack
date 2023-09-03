import React, { useState, useEffect } from 'react';

function Home() {

  const [user, setUser] = useState(null)
  const [email, setEmail] = useState(null)
  const [id, setId] = useState(null)
  const [status, setStatus] = useState(null)


  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
        if (response.status === 200) {
          const resObject = await response.json();

          if (resObject) {
            setUser(resObject.user);
            setEmail(resObject.email);
            setId(resObject.id);
            setStatus(resObject.success);

          } else {
            throw new Error('Response object is missing expected properties');
          }
        } else {
          throw new Error('Unauthorized');
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, []);
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <div className='Home'>
      <div className="home-wrapper">
        {id}
        {user}
        <button onClick={logout}>dasdsad</button>
      </div>
    </div>
  );
}

export default Home;
