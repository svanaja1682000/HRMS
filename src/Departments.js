import React, {useEffect, useState} from 'react'
import api from './api'

function Departments() {
    const [departments, setDepartments] =useState([])
    const [addNewDepartmentFlag, setAddNewDepartmentFlag] = useState('')
    const [departmentName, setDepartmentName] = useState('')
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    useEffect(() =>{
        fetchDepartments()
         
    },[addNewDepartmentFlag])
    const fetchDepartments = async()=>{
        try{
            const response=  await api.get('/departments',
            )
            console.log(response)
            setDepartments(response.data)
        }catch(err){
            console.log(err.message, 'Error while fetching departments')
        }
    }

    const handleAddDepartment = async() =>{
        try{
            await api.post('departments/post', {departmentName,roleData:userDetails.roleName})
            setAddNewDepartmentFlag(!addNewDepartmentFlag)
        }
        catch(err){
            console.log(err.message, 'Error while add new Department')
        }
    }   
  return (
    <>
        <div className='sections'>Departments</div>
        
        
        
            <label htmlFor='deparmentName'>Department Name: 
                <input
                    type='text'
                    placeholder='deparmentName'
                    value={departmentName}
                    onChange={(e)=>{setDepartmentName(e.target.value) }
                    }
                />
            </label>
    
        <button onClick={()=>handleAddDepartment()}> Add Department</button>
    
        <table>
            <thead>
            <tr>
            <th>DepartmentID</th>
            <th>Department Name</th>
            </tr>
           </thead>
           <tbody>
            {departments.map((department)=>(
                <tr key = {department.DepartmentId}>
                    <td>{department.DepartmentId}</td>
                    <td>{department.DepartmentName}</td>
                </tr>
            ))}
            </tbody>
        </table>
   
    </>
  )
}

export default Departments