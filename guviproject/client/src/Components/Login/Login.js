import { useContext, useState } from "react"
import axios from 'axios';  
import { hostAddress } from "../hostAddress";
import AuthContext from "../AuthContext";
import { Navigate } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword ] = useState("")
  const [error ,setError] = useState("")
  const {auth} = useContext(AuthContext)
  const {setAuth} = useContext(AuthContext)
  
  const login = () => {
    axios.post(hostAddress +"/login", {
      email,
      password
    }).then(e => {
      if (e.data.length > 0){
        setError("")
        setAuth(true)
      }
      else{
        setError(e.data.message)
      }
    })
  }
  if (auth == true) return <Navigate to ="/profile"/>
    return(
        <div mt-3 className='m-auto col-11 col-lg-3 mt-3'>
      <h2 className='text-center'>LOGIN</h2>
      <div className='m-1 p-2'>
        <input type="text" placeholder='Email Address' className='w-100 w-lg-50 p-2' onChange={e => {setEmail(e.target.value)}}/>
      </div>
      <div className='m-1 p-2'>
        <input type="password" placeholder='Password' className='w-100 w-lg-50 p-2' onChange={e => {setPassword(e.target.value)}} />
      </div>
      <div className='m-1 p-2'>
      <button className='btn btn-dark w-100 p-2' onClick={() => login()}>LOGIN</button>
      <small className="m-auto  text-danger">{error}</small>
      </div>
    </div>
    )
}


