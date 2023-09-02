import React, {useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Home(props) {
  const navigate = useNavigate();

  const logout = () => {
      window.open("http://localhost:5000/auth/logout", "_self");
  };
  
  return (
    <div className='Home'>

      {props.status ? (

       <div className="home-wrapper">
          This is home
          {props.id}
          {props.user}
          {props.email}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}

export default Home;
