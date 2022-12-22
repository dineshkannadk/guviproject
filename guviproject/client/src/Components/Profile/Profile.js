import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../AuthContext"
import { hostAddress } from "../hostAddress"
 
export const Profile = () => {
    const [name, setName] = useState("")
    const [email,setEmail] = useState("pradeep@gmail.com")
    const [gender, setGender] = useState("")
    const [dob, setDob] = useState("")
    const [age,setAge] = useState(0)
    const [mobile, setMobile] = useState("")

    const {auth} = useContext(AuthContext)

    const updateData = () => {
        axios.post(hostAddress+"/update", {name,email,gender, mobile,dob,age}).then(e => alert(e.data))
    }
    useEffect(() => {
      axios.post(hostAddress+"/select",{
        email
      }).then(e => {
        var userData = e.data[0]
        // console.log(userData)
        setName(userData.name)
        setGender(userData.gender)
        setAge(userData.age)
        setMobile(userData.mobile)
        setDob(userData.dob)
    })
    }, [])
    if (auth == false) return <Navigate to ="/login"/>
    return(
        <div className='m-auto col-11 col-lg-3 mt-3'>
            <h2 className="text-center">PROFILE</h2>
            <div className='m-1 p-2'>
                <input type="text" placeholder='Name' className='w-100 w-lg-50 p-2' onChange={e=> setName(e.target.value)} value = {name}/>
            </div>    
            <div className='m-1 p-2'>
                <input type="email" placeholder='Email Address' className='w-100 w-lg-50 p-2' disabled onChange={e=>setEmail(e.target.value)} value = {email}/>
            </div>    
            <div className='m-1 p-2'>
            <label className="m-1">Gender</label><br/>
                <select className="w-100 p-1" onChange={e=>setGender(e.target.value)} value = {gender}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>    
            <div className='m-1 p-2'>
                <label className="m-1">Date of Birth</label>
                <input type="date" placeholder='' className='w-100 w-lg-50 p-2' onChange={e=>setDob(e.target.value)} value={dob}/>
            </div>    
            <div className='m-1 p-2'>
                <label className="m-1">Age</label>
                <input type="number" placeholder='0' className='w-100 w-lg-50 p-2' onChange={e=>setAge(e.target.value)} value ={age}/>
            </div>    
            <div className='m-1 p-2'>
                <input type="text" placeholder='Mobile Number' className='w-100 w-lg-50 p-2' onChange={e=>setMobile(e.target.value)} value = {mobile}/>
            </div>    
            <div className='m-1 p-2'>
                <button className="btn btn-dark w-100" onClick={() => updateData()}>Update</button>
            </div>    
            
        </div>
    )
}