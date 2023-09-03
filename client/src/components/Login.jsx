import React, { useEffect } from 'react'
import { BiLogoGmail } from 'react-icons/bi'


function Login() {

  useEffect(() => {

  })
  const GoogleLogin = () => {
    window.open('http://localhost:5000/auth/google', "_self")
  }

  const iconStyle = {
    backgroundColor: 'white',
    color: 'blue',
    borderRadius: '5px'
  }

  return (
    <div className="login">
      <div className="login-title">
        Life@RTU
      </div>
      <div className="login-wrapper">
        <button onClick={GoogleLogin}><BiLogoGmail style={iconStyle} />Login with RTU account</button>
      </div>
    </div>
  )
}

export default Login