import React from 'react';
import HomeWrapper from './HomeWrapper';
import { Navigate } from 'react-router-dom';

function Home({ id, user, email, status }) {


  return (
    <div className='Home'>

      {status ? (
        <HomeWrapper id={id} user={user} email={email} />
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}

export default Home;
