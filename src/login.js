import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleOnClick = async() =>{
        try{
            const response = await axios.post('http://localhost:3000/users/login', {userName, password})
            localStorage.setItem('userDetails',JSON.stringify({token:response.data.token, roleName : response.data.roleName}))
            navigate('/dashboard')

        }catch(err){
            console.log(err.message, 'Error while log into the application')
        }
    }
    const handleRegisterClick = ()=>{
        navigate('/register')
    }
    return(
        <>
        <div className='add-new-emp-container'> 
        <div className='add-new-employee'>
            <h3>welcome to HRMS</h3>
            <label for ='htmlFor'>User Name :
                <input
                    type='text'
                    placeholder="Enter userName"
                    value= {userName}
                    onChange={(e)=>{setUserName(e.target.value)}}
                />
                </label>
                <label for ='htmlFor'>User Name :
                  <input
                    type='password'
                    placeholder="Enter password"
                    value= {password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                </label>
                <button onClick={handleOnClick}>
                    Login
                </button>
                <h5>Don't have an account</h5>
                <button onClick={handleRegisterClick}> Register</button>
            </div>

        </div>
        </>
    )
}
export default Login