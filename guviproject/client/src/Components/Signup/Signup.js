import axios from "axios"
import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../AuthContext"
import { hostAddress } from "../hostAddress"
 
export const Signup = () => {
  const [name ,setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword ] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const registerUser = () => {
    axios.post(hostAddress+"/register",{
      name,
      email,
      password
    }).then(e => {
      // console.log()
      if (e.data.code){
        setError("User already exists")
        
      }
      else{
        setError("")
        console.log("Logged In")
      }
    })
  }
  const validateData = () => {
    if (name == "" || email == "" || password == "" || confirmpassword == "")
    {
      setError("All fields are mandatory")
    }
    else if (password.length < 8){
      setError("Password must be greater than 8 characters")
    }
    else if (password !== confirmpassword){
      setError("Passwords do not match")
    }
    else{
      setError("")
      registerUser()
    }
  }
  const {auth} = useContext(AuthContext)
  console.log(auth)
  if (auth == true) return <Navigate to ="/profile"/>
      return(
        <div className='m-auto col-11 col-lg-3 mt-3'>
      <h2 className='text-center'>REGISTER</h2>
      <div className='m-1 p-2'>
        <input type="text" placeholder='Name' className='w-100 w-lg-50 p-2' onChange={e => {setName(e.target.value)}}/>
      </div>
      <div className='m-1 p-2'>
        <input type="email" placeholder='Email Address' className='w-100 w-lg-50 p-2' onChange={e => {setEmail(e.target.value)}} />
      </div>
      <div className='m-1 p-2'>
        <input type="password" placeholder='Password' className='w-100 w-lg-50 p-2' onChange={e => {setPassword(e.target.value)}} />
      </div>
      <div className='m-1 p-2'>
        <input type="password" placeholder='Confirm Password' className='w-100 w-lg-50 p-2' onChange={e => {setConfirmPassword(e.target.value)}} />
      </div>
      <div className='m-1 p-2'>
      <button className='btn btn-dark w-100 p-2' onClick={() => validateData()}>REGISTER</button>
      <small className="text-danger">{error}</small>
      </div>
    </div>
    )
}


