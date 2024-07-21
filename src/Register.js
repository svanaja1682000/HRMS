import React ,{useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [userName, setUserName] =useState('')
    const [password, setPassword] = useState('')
    const [roleId, setRoleId] = useState('')
    const navigate = useNavigate('/login')

    const onChangeHandler = async() =>{
        try{ 
            console.log('username')   
            await axios.post('http://localhost:3000/users/register',{userName,password,roleId})
            console.log('username','sdfsd') 
            navigate('/')
        }catch(err) {
            console.log(err.message, 'Error while registering')
        }
    }
  return (
    <>
    <div className='add-new-emp-container'>
    <div className='add-new-employee'>
        <h3>Register</h3>
        <label for ='htmlFor'>User Name :
        <input 
            type='text' 
            placeholder="userName"
            value={userName}
            autoComplete="off"
            onChange={(e)=>{setUserName(e.target.value)}}
        />
        </label>
        <label for='htmlFor'>
            Password:
        <input 
            type='password' 
            placeholder="password"
            value={password}
            autoComplete="off"
            onChange={(e)=>{setPassword(e.target.value)}}
        />
        </label>
        <label for='htmlFor'>RoleID:
        <input 
            type='text' 
            placeholder="roleId"
            value={roleId}
            onChange={(e)=>{setRoleId(e.target.value)}}
        />
        </label>
        <button onClick={onChangeHandler}>Submit details</button>
    </div>
    </div>
    </>
  )
}
