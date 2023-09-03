// App.jsx
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Loading from './components/Loading'

function App() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState(null)
  const [id, setId] = useState(null)
  const [status, setStatus] = useState(false)


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

  getUser()


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={status ? <Home user={user} email={email} id={id} status={status} /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App
