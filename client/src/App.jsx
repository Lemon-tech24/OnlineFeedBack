// App.jsx
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

function App() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState(null)
  const [id, setId] = useState(null)
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json()
          throw new Error('Unauthorized')
        })
        .then((resObject) => {
          if (resObject) {
            setUser(resObject.user)
            setEmail(resObject.email)
            setId(resObject.id)
            setStatus(resObject.success)
          } else {
            throw new Error('Response object is missing expected properties')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }

    getUser()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={user ? <Home user={user} email={email} id={id} status={status} />: <Navigate to="/login"/>} />
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
