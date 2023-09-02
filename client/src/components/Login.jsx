import React from 'react'

const GoogleLogin = ()=>{
  window.open('http://localhost:5000/auth/google', "_self")
}


function Login() {
  return (
    <div className="Login">

      
        <button onClick={GoogleLogin}>Login with RTU account</button>
    </div>
  )
}

export default Login