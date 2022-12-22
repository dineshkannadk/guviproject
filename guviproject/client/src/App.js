import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import authContext from './Components/AuthContext';
import { Login } from './Components/Login/Login';
import { Profile } from './Components/Profile/Profile';
import { Signup } from './Components/Signup/Signup';

function App() {
  
  return (
    <Routes>
      <Route path='/login' element = {<Login/>}/>
      <Route path = "/register" element = {<Signup/>}/>
      <Route path='/profile' element = {<Profile/>}/>
    </Routes>
  );
}

export default App;
