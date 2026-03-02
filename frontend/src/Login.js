import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
//import  Validation from './LoginValidation';


function Login() {
const [values,setValues] = useState( { email:'', password: '' })
const navigate = useNavigate();
const [errors,setErrors]= useState({})
const handleInput = (event) =>{
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
}

const handleSubmit = (event) =>{
   event.preventDefault();
   axios.post('http://localhost:3002/login', values)
    .then(res => {
     if(res.data === "Success"){
       /* alert("Success")*/
        navigate('/home');
     }else{
        console.log(res)
        alert("Please check the password or email address as they are incorrect")
     }
    })
    .catch(err => console.log(err));


         
}
return(
<div style={{height:"100vh"}} className='d-flex justify-content-center align-items-center  w-100'>
<div className='bg-white p-3 rounded w-25'>

    <h2>Sign In</h2>
<form onSubmit = {handleSubmit}>
    <div className='mb-3'>
         <label htmlFor="email"><strong>Email </strong></label>
         <input type = "email" placeholder='Enter Email' name='email' required 
         onChange={handleInput} className='form-control rounded-0'/>
         {errors.email && <span className='text-danger'> {errors.email}</span>}
         </div>
   
    <div className='mb-3'>
         <label htmlFor="password"><strong>Password</strong></label>
         <input type = "password" placeholder='Enter Password' name='password' required 
          onChange={handleInput} className='form-control rounded-0'/>
           {errors.password && <span className='text-danger'> {errors.password}</span>}
    </div>
    <button type='submit' className='btn btn-success w-100 rounden-0'>Log in </button>
    <p></p>
    <Link to="/signup"  className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
</form>

</div>
</div>
   )
    
}
export default Login

