import { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';



function App() {
 const [login_user, setLoginUser] = useState(null)


  const firebaseConfig = {
    apiKey: "AIzaSyCKDiW2m2KdmSYo80ZYiNOo81Y4oq32FdU",
    authDomain: "online-feedback-396605.firebaseapp.com",
    projectId: "online-feedback-396605",
    storageBucket: "online-feedback-396605.appspot.com",
    messagingSenderId: "789154740481",
    appId: "1:789154740481:web:6414a503727779f5758300",
    measurementId: "G-NSJZN198XH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = ()=>{
    const user = auth.currentUser;
    if(user){
      console.log('User already Login: ', user.displayName)
      setLoginUser(user.displayName)
    }else{
      signInWithPopup(auth, provider)
        .then((result)=>{
          if(result.user.email.endsWith('@rtu.edu.ph')){
            console.log('Logged in Successfuly: ', result.user.displayName)
            setLoginUser(result.user.displayName)
       
          }else{
            auth.signOut()
              .then((error)=>{
                console.error('Sign In failed. Email is not from RTU domain');
                setLoginUser(null)
              });
          }
        })
        .catch((error)=>{
          if(error.code === 'auth/cancelled-popup-request'){
            console.log('Popup was closed by user.')
            setLoginUser(null)
          }else{
            console.log('An error occured during sign in ', error);
            setLoginUser(null)
          }
        })
    }
  }

  const Logout = ()=>{
    auth.signOut()
      .then(()=>{
        console.log('User signed out Successfully');
      })
      .catch((error)=>{
        console.error('An error occured sign out', error)
      })
  }


  return (
    <>
     <div className="App">
        <button onClick={signInWithGoogle}>Sign In With RTU ACCOUNT</button>
        <button onClick={Logout}>Logout</button>
        
     
     </div>
    </>
  )
}

export default App
