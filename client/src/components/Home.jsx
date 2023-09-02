import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';

function Home(props) {
  const navigate = useNavigate();

  const Logout = () => {
    fetch("http://localhost:5000/auth/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        console.log('Logout successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='Home'>

      {props.status ? (

       <div className="home-wrapper">
          This is home
          {props.id}
          {props.user}
          {props.email}
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
