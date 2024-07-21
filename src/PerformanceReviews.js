import React, {useEffect, useState} from 'react'
import api from './api'

function PerformanceReviews() {
    const [performances, setPerformances] =useState([])
    // const [addNewRoleFlag, setAddNewRoleFlag] = useState('')
    // const [roleName, setRoleName] = useState('')
    useEffect(() =>{
        fetchPerformances()
    },[])
    const fetchPerformances= async()=>{
        try{
            const response=  await api.get('/performances')
            console.log(response)
            setPerformances(response.data)
        }catch(err){
            console.log(err.message, 'Error while fetching departments')
        }
    }

    // const handleAddRole = async() =>{
    //     console.log('data', roleName)
    //     try{
    //         await axios.post('http://localhost:3000/roles/post', {roleName})
    //         setAddNewRoleFlag(!addNewRoleFlag)
    //     }
    //     catch(err){
    //         console.log(err.message, 'Error while add new Department')
    //     }
    // }   
  return (
    <>
        <div className='sections'>Performance and Reviews</div>

        {/* <label htmlFor='deparmentName'>Role Name: 
                <input
                    type='text'
                    placeholder='roleName'
                    value={roleName}
                    onChange={(e)=>{setRoleName(e.target.value) }
                    }
                />
            </label>
    
        <button onClick={()=>handleAddRole()}> Add Role</button> */}
    
        <table>
            <thead>
            <tr>
            <th>Employee Name</th>
            <th>Review Date</th>
            <th>Reviewer</th>
            <th>Comments</th>
            </tr>
           </thead>
           <tbody>
            {performances.map((performance)=>(
                <tr key = {performance.ReviewID}>
                    <td>{performance.EmployeeName}</td>
                    <td>{performance.ReviewDate}</td>
                    <td>{performance.Reviewer}</td>
                    <td>{performance.Comments}</td>
                </tr>
            ))}
            </tbody>
        </table>
   
    </>
  )
}

export default PerformanceReviews