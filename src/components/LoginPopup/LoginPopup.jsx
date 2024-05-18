import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const LoginPopup = ({ setShowLogin }) => {
  const { url,setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Sign Up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));

  }
  const onLogin = async (e) => {

    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    } 
    const response = await axios.post(newUrl,data)
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false);
      
    }
    else
    {
      alert(response.data.message)
    }

  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input onChange={onChangeHandler} name="name" value={data.name} type="text" placeholder='Your name' required />}

          <input onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder='Your email' required />
          <input onChange={onChangeHandler} name="password" value={data.passwod} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>

        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")} >Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")} >Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup