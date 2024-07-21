import React, {useState, useEffect}from 'react'
import api from './api'

function Roles() {
    const [roles, setRoles] =useState([])
    const [addNewRoleFlag, setAddNewRoleFlag] = useState('')
    const [roleName, setRoleName] = useState('')
    
    useEffect(() =>{
        fetchRoles()
    },[addNewRoleFlag])
    const fetchRoles= async()=>{
        try{
            const response=  await api.get('/roles')
            console.log(response)
            setRoles(response.data)
        }catch(err){
            console.log(err.message, 'Error while fetching departments')
        }
    }

    const handleAddRole = async() =>{
        console.log('data', roleName)
        try{
            const userDetails = JSON.parse(localStorage.getItem('userDetails'))
            console.log(userDetails, 'usr details')
            await api.post('roles/post', {roleName,roleData:userDetails.roleName})
            setAddNewRoleFlag(!addNewRoleFlag)
        }
        catch(err){
            console.log(err.message, 'Error while add new Department')
        }
    }   
  return (
    <>
        <div className='sections'>Roles</div>
        <label htmlFor='deparmentName'>Role Name: 
                <input
                    type='text'
                    placeholder='roleName'
                    value={roleName}
                    onChange={(e)=>{setRoleName(e.target.value) }
                    }
                />
            </label>
    
        <button onClick={()=>handleAddRole()}> Add Role</button>
    
        <table>
            <thead>
            <tr>
            <th>RoleID</th>
            <th>Role Name</th>
            </tr>
           </thead>
           <tbody>
            {roles.map((role)=>(
                <tr key = {role.RoleId}>
                    <td>{role.RoleId}</td>
                    <td>{role.RoleName}</td>
                </tr>
            ))}
            </tbody>
        </table>
   
    </>
  )
}

export default Roles